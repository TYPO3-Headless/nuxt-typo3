import type { InjectionKey } from 'vue'
import { computed, provide } from 'vue'
import { useForm } from 'vee-validate'
import { T3FormCustomComponents, T3FormElement, T3FormProps } from '../../../types'

export const T3FormCustomComponentsKey: InjectionKey<T3FormCustomComponents> = Symbol('CustomComponents')

export function useT3Form ({
  elements,
  i18n,
  customComponents
}: T3FormProps) {
  provide(T3FormCustomComponentsKey, {
    honeypot: 'T3FormFieldHidden',
    ...customComponents ?? {}
  })

  const flattenedElements = computed(() => {
    const flatten = (parsedElements: T3FormElement[]) => {
      return parsedElements.reduce((reduced: Array<T3FormElement>, element) => {
        const array = element.name
          ? [...reduced, element]
          : reduced

        if (element.elements) {
          array.push(...flatten(element.elements))
        }

        return array
      }, [])
    }

    return flatten(elements)
  })

  const getValidationSchema = () => {
    const entries = flattenedElements.value.map(element => [element.name, element.validators])
    return Object.fromEntries(entries)
  }

  const getInitialValues = () => {
    const entries = flattenedElements.value
      .map(element => [element.name, element.value || null])
    return Object.fromEntries(entries)
  }

  const validationSchema = getValidationSchema()

  const initialValues = getInitialValues()
  const {
    errors,
    handleSubmit,
    meta,
    values,
    resetForm,
    setErrors,
    submitForm,
    isSubmitting
  } = useForm({
    validationSchema, initialValues, initialErrors: {}
  })

  return {
    i18n: {
      submitButton: 'Submit',
      sendingLabel: 'Sending',
      resetButton: 'Reset form',
      serverSuccess: 'The form was sent, thank you.',
      serverError: 'We can not process form right now, please try again later.',
      validationErrors: 'There were some errors, review the form',
      ...i18n
    },
    validationSchema,
    initialValues,
    errors,
    values,
    resetForm,
    submitForm,
    handleSubmit,
    setErrors,
    meta,
    isSubmitting
  }
}
