import { FieldMeta, FormState } from 'vee-validate'
import { T3Link } from '../T3Link'
import { T3PageAppearance } from '../../types'
import { T3CeBaseProps } from './T3CeBase'
import { FormElement, T3FormI18n } from './T3Form'

export interface FormAPI {
  status: string | null;
  errors: { [s: string]: string; } | ArrayLike<string>;
  actionAfterSuccess: {
    redirectUrl?: string;
    statusCode?: number;
    message?: string;
  };
  page: {
    current: number;
    nextPage: number | null;
    pages: number;
  }
}

export interface Form {
  id: string;
  api: FormAPI;
  elements: Array<FormElement>;
  meta: FieldMeta<unknown>;
  resetForm: (state?: Partial<FormState<unknown>>) => void;
  setErrors: (fields: Record<string, string>) => void,
  i18n: Partial<T3FormI18n>
}

export interface T3CeFormFormframeworkProps extends T3CeBaseProps {
  link: T3Link;
  form: Form;
}

export interface T3CeFormFormframeworkOptions {
  rules: Record<string, (value?: any) => boolean>;
}

export interface T3CeFormResponse {
  id: number
  categories: string
  appearance: T3PageAppearance
  content: T3CeFormFormframeworkProps
}
