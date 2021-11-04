import { extend } from 'vee-validate'
import { StringLengthValidate } from './stringLength'

const StringLength = {
  params: ['minimum', 'maximum'],
  validate: StringLengthValidate
}

extend('StringLength', StringLength)
export { StringLength }
