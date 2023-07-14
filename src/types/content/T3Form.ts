import type { Ref } from 'vue'

export type FormElementProperties = {
  elementDescription?: string;
  options?: Record<string, string>;
  fluidAdditionalAttributes?: {
    placeholder?: string;
  }
};

export type FormElementValidator = {
  identifier: string
  options?: {
    regularExpression: string,
    minimum: string,
    maximum: string,
  }
}

export type T3FormCustomComponents = Record<string, string>

export interface FormElement {
  type: string;
  name?: string;
  identifier: string;
  label: string;
  defaultValue?: unknown;
  properties?: FormElementProperties;

  validators?: Array<FormElementValidator>;
  elements?: Array<FormElement>;
}

export interface T3FormI18n {
  submitButton: string
  sendingLabel: string
  resetButton: string
  serverSuccess: string
  serverError: string
  validationErrors: string
}

export interface T3FormElement<ValueType = unknown> {
  identifier: string;
  type: string;
  name?: string;
  label?: string;
  validators: string | Record<string, unknown>;
  value: ValueType;
  fieldlist: boolean;
  properties?: FormElementProperties;
  elements?: Array<T3FormElement>;
  placeholder?: string;
  required?: boolean;
}

export interface T3FormSubmitPayload {
  values: any,
  formRef: Ref<HTMLFormElement>,
}

export interface T3FormProps {
  elements: Array<T3FormElement>
  i18n: Partial<T3FormI18n>
  customComponents?: T3FormCustomComponents
}

export interface T3FormFieldListProps {
  elements: Array<T3FormElement>
  customComponents?: T3FormCustomComponents
}

export type T3FormField = {
  name: string,
  field: T3FormElement,
  type?: string,
}

export type FormErrors = Record<string, string>
