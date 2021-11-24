<template>
  <ValidationObserver
    v-slot="validator"
    ref="validator"
    slim
  >
    <form
      ref="form"
      class="t3-form"
      novalidate
      @submit.prevent="onSubmit"
      @reset="resetForm"
    >
      <slot
        name="before"
        :model="model"
        :validator="validator"
        :state="state"
      />
      <slot name="fields">
        <T3FormFieldList
          ref="fieldlist"
          v-model="model"
          :elements="elements"
          :components="components"
          :classes="classes"
          :i18n="i18n"
        />
      </slot>

      <slot name="cta">
        <T3FormCta
          :state="state"
          :i18n="i18n"
        />
      </slot>

      <slot
        name="after"
        :model="model"
        :validator="validator"
        :state="state"
      />
    </form>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import extendableComponents from '../../mixins/component/extendableComponents'
import T3FormFieldList from './T3FormFieldList/T3FormFieldList.vue'
import T3FormCta from './T3FormCta/T3FormCta.vue'

const defaultState = {
  sending: null,
  error: null,
  failure: null,
  success: null
}

export default {
  name: 'T3Form',
  components: {
    ValidationObserver,
    T3FormFieldList,
    T3FormCta
  },
  mixins: [extendableComponents],
  props: {
    elements: {
      type: Array,
      required: true
    },
    components: {
      type: [Object, Boolean],
      default: false
    },
    classes: {
      type: [Object, Boolean],
      default: false
    },
    labels: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      model: {},
      state: { ...defaultState },
      // fallback labels, it will be merged with labels from API
      i18n: {
        submitButton: 'Submit',
        sendingLabel: 'Sending',
        resetButton: 'Reset form',
        serverSuccess: 'The form was sent, thank you.',
        serverError: 'We can not process form right now, please try again later.',
        validationErrors: 'There were some errors, review the form'
      }
    }
  },
  computed: {
    validatorRef () {
      return this.$refs.validator
    },
    fieldListRef () {
      return this.$refs.fieldlist
    }
  },
  created () {
    this.i18n = Object.freeze(Object.assign(this.i18n, this.labels))
  },
  methods: {
    focusOnErrors () {
      const errors = Object.entries(this.validatorRef.refs)
        .map(([key, value]) => ({
          key,
          value
        }))
        .filter((error) => {
          return (!error || !error.value || !error.value.failedRules) ? false : Object.keys(error.value.failedRules).length > 0
        })
      if (errors && errors.length > 0) {
        this.validatorRef.refs[errors[0].key].$el.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    },
    setState (state) {
      this.state = { ...defaultState, [state]: true }
    },
    resetForm () {
      this.fieldListRef.restoreModel()
      this.validatorRef.reset()
    },
    async onSubmit () {
      const success = await this.validatorRef.validate()

      if (!success) {
        this.focusOnErrors()
      }

      this.$emit('submit', {
        form: this,
        formRef: this.$refs.form,
        validator: this.validatorRef
      })
    }

  }
}
</script>
