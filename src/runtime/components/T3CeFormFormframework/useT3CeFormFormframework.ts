import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import {
  alpha,
  integer,
  required,
  email,
  regex,
  length,
  max,
  min
} from '@vee-validate/rules'
import { defineRule } from 'vee-validate'
import { navigateTo } from 'nuxt/app'
import type { T3CeFormFormframeworkOptions, T3CeFormFormframeworkProps, Form, T3CeFormResponse, FormElement, T3FormElement, T3FormSubmitPayload, FormErrors } from '../../../types'
import { useT3Api } from '../../composables/useT3Api'

export function useT3CeFormFormframework (
  { uid, form, link }: T3CeFormFormframeworkProps,
  t3form: Ref<Form | null>,
  options?: T3CeFormFormframeworkOptions
) {
  const responseMessage = ref<string | null>(null)

  const rulesMap: Record<string, any> = {
    Alphanumeric: alpha,
    Integer: integer,
    NotEmpty: required,
    EmailAddress: email,
    RegularExpression: regex,
    StringLength: length,
    ...options?.rules ?? {}
  } as const

  const getValidationObject = (validators: FormElement['validators']) => {
    const validationObj: Record<string, unknown> = {}
    if (!validators) {
      return validationObj
    }
    validators
      .forEach((validator) => {
        const name: string = validator.identifier
        if (name in rulesMap) {
          defineRule(name, rulesMap[name as keyof typeof rulesMap])
        }

        let value: unknown = true
        if (name === 'RegularExpression' && validator.options) {
          value = new RegExp(validator.options.regularExpression)
        }
        if (name === 'StringLength' && validator.options) {
          if (validator.options.minimum) {
            defineRule('minLength', min)
            validationObj.minLength = validator.options.minimum
          }
          if (validator.options.maximum) {
            defineRule('maxLength', max)
            validationObj.maxLength = validator.options.maximum
          }
          value = false
        }
        validationObj[name] = value
      })
    return validationObj
  }

  const prepareT3FormElements = (elements = form.elements ?? []): T3FormElement[] => {
    return elements.map(element => ({
      properties: element.properties,
      label: element.label,
      identifier: element.identifier,
      type: element.type.toLowerCase(),
      name: element.name,
      validators: getValidationObject(element.validators),
      value: element.defaultValue ?? '',
      fieldlist: element.type === 'Fieldset',
      elements: element.elements
        ? prepareT3FormElements(element.elements)
        : undefined
    }))
  }
  const baseElementName = computed(() => {
    const element = form.elements[0].name

    if (typeof element === 'string') {
      // eslint-disable-next-line no-useless-escape
      const match = element.match(/^([^\[\]]+\[[^\[\]]+\])/)

      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  })

  const onSubmit = async (payload: T3FormSubmitPayload) => {
    if (!t3form.value) {
      return
    }
    responseMessage.value = null
    const formData = new FormData(payload.formRef.value)

    if (uid) {
      formData.append('responseElementId', uid.toString())
      formData.append('responseElementRecursive', '1')
    }

    const { $fetch } = useT3Api()
    const { meta, resetForm, setErrors, i18n } = t3form.value
    if (!meta?.valid) { return }
    try {
      const response = await $fetch(link.href, {
        method: 'POST',
        body: formData
      }) as T3CeFormResponse

      const formResponse = response?.content?.form?.api

      if (formResponse?.status === 'success') {
        responseMessage.value = i18n?.serverSuccess ?? null
        resetForm()
        const redirectUrl = formResponse.actionAfterSuccess?.redirectUrl

        if (!redirectUrl) { return }
        return navigateTo(redirectUrl, { external: redirectUrl.includes('http') })
      }

      if (formResponse?.status === 'failure') {
        responseMessage.value = i18n?.validationErrors ?? null
        const errors: FormErrors = {}
        for (const [key, value] of Object.entries(formResponse.errors)) {
          const obKey = `${baseElementName.value}[${key}]`
          errors[obKey] = value as string
        }
        setErrors(errors)
      }
    } catch (err: any) {
      responseMessage.value = i18n?.serverError ?? null
    }
  }

  return {
    elements: prepareT3FormElements(),
    onSubmit,
    responseMessage
  }
}
