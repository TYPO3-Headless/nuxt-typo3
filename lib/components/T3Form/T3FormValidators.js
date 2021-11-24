import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules.js'
extend('required', required)
export * from 'vee-validate/dist/rules.js'
