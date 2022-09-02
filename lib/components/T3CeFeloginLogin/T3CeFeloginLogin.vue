<template>
  <div class="fe-login">
    <!-- eslint-disable vue/no-v-html -->
    <p v-html="message.header" />
    <p v-html="message.message" />
    <!-- eslint-enable vue/no-v-html -->

    <T3Form ref="form" :elements="elements" @submit="onSubmit">
      <template #cta>
        <button type="submit">
          {{ loginType === 'login' ? 'Log in' : 'Log out' }}
        </button>
      </template>
    </T3Form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import T3Form from '../../components/T3Form/T3Form'
import baseCe from '../../mixins/component/baseCe'

export default {
  name: 'T3CeFeloginLogin',
  components: {
    T3Form
  },
  extends: baseCe,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      message: this.data.message
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.typo3?.initial?.user?.logged || false
    }),
    elements () {
      return this.compileFormElements(this.data.form.elements || this.data.form.fields)
    },
    loginType () {
      return (this.data.form.elements || this.data.form.fields)?.find(el => el.name === 'logintype')?.value
    }
  },
  methods: {
    compileFormElements (elements) {
      return elements
        .filter(element => element.type !== 'submit')
        .map(element => ({
          value: element.value || '',
          type: element.type || '',
          identifier: element.name,
          label: element.label || '',
          placeholder: element.placeholder || '',
          name: element.name || '',
          validators: element.validators
        }))
    },
    async onSubmit ({ validator, formRef }) {
      const { flags } = validator
      const data = new FormData(formRef)
      data.append('responseElementId', this.id.toString())
      data.append('responseElementRecursive', '1')

      if (flags.valid) {
        try {
          const response = await this.$typo3.api.$http.$post(this.data.form.action, data)
          const { redirectUrl, status } = response.content.data

          if (status === 'success') {
            try {
              await this.$store.dispatch('typo3/getInitialData', { path: redirectUrl === '/' ? '' : redirectUrl || this.$route.path })
            } finally {
              this.onSuccess(response, this.loginType)
            }
          } else {
            throw response
          }
        } catch (error) {
          this.onFailure(error)
        }
      }
    },
    onSuccess (response, loginType = this.loginType) {
      const { redirectUrl } = response.content.data

      if (redirectUrl) {
        this.$router.push(redirectUrl)
      } else if (loginType === 'logout') {
        this.$router.push('/')
      }
    },
    onFailure (response) {
      if (!response?.content?.data) {
        return
      }

      const { message } = response.content.data

      if (message) {
        this.message = message
      }
    }
  }
}
</script>
