# Form handling

TYPO3 Headless supports [Form Framework](https://docs.typo3.org/m/typo3/tutorial-editors/master/en-us/ContentElements/ContactForm/Index.html) and nuxt-typo3 supports form handling.

### TYPO3 Headless Limitations
Please note, that currently we are experiencing following limitations on API level:
1. TYPO3 Headless supports only one step forms (however, you are still able to build multistep forms on frontend side - guide soon). 
2. You have to enable specific [headless.elementBodyResponse feature flag](https://docs.typo3.org/p/friendsoftypo3/headless/master/en-us/Configuration/Index.html#feature-flags) to handle POST requests more easily. 
3. You have to add custom finishers to handle `success` state and [redirects (headless.redirectMiddlewares
)](https://docs.typo3.org/p/friendsoftypo3/headless/master/en-us/Configuration/Index.html#feature-flags) in a more sophisticated way.

[Look at code example](https://github.com/TYPO3-Initiatives/pwa-demo/pull/42/files#diff-1c8ca1c7886f3608fd047be7f1c39e558cc84dd76b2f9f183e0be8624b927bebR71)

## Component data flow
To handle [Form Framework](https://docs.typo3.org/m/typo3/tutorial-editors/master/en-us/ContentElements/ContactForm/Index.html) we have implemented [FormFramework Content Element](https://github.com/TYPO3-Initiatives/nuxt-typo3/blob/master/lib/components/T3CeFormFormframework/T3CeFormFormframework.vue) which uses [T3Form component](https://github.com/TYPO3-Initiatives/nuxt-typo3/blob/master/lib/components/T3Form/T3Form.vue). This is good example of distribution UI components and Content elements where UI is responsible for displaying interface based on delivered props. In that specific case FormFramework Content Element is responsible for delivering props to UI and submiting form data to API.
You can use [T3Form component](https://github.com/TYPO3-Initiatives/nuxt-typo3/blob/master/lib/components/T3Form/T3Form.vue) for more specific cases, not only for T3FormFramework - you can build your own forms, not related with FormFramework ContentElement. You may also override whole T3Form component to implement complicated scenarios. However, before you decide to do so, please read this documentation. We have provided a lot of ways of customising forms.

For model validation we have used [VeeValidate](https://vee-validate.logaretm.com/v3) plugin which in our opinion is the best way to validate forms in Vue.js applications. 

## FormFramework Content Element
Entry point for form handling is [`T3CeFormFormframework`](https://github.com/TYPO3-Initiatives/nuxt-typo3/blob/master/lib/components/T3CeFormFormframework/T3CeFormFormframework.vue) and this component is responsible for wraping `T3Form` and exchaning information between them. At this level you can override form template or default I18n labels. 

### Customize T3CeFormFormframework
To customize `T3CeFormFormframework` you have to register a new one with the same name. This is common solution to [override global components](https://typo3-initiatives.github.io/nuxt-typo3/from-scratch/3-customization.html#_2-2-register-your-component). 

To do this please create a new file `components/T3CeFormFormframework.vue`:
```vue
<template>
  <div>form markup</div>
</template>
<script>
import T3CeFormFormframework from '~typo3/components/T3CeFormFormframework/T3CeFormFormframework.vue'
export default {
  extends: T3CeFormFormframework
}
</script>
```
Please notice it extends logic from `T3CeFormFormframework`

Now register it as global component in `plugins/components.js` file
```js
import Vue from 'vue'
import T3CeFormFormframework from '~/components/T3CeFormFormframework.vue'
Vue.component('T3CeFormFormframework', T3CeFormFormframework)
```

Please remember to add `components.js` file to [nuxt plugins](https://nuxtjs.org/docs/configuration-glossary/configuration-plugins/).
After that you should be able to see your new component.

### Customize markup and logic

This FormFramewor Content element is mainly responsible for the logic of form submiting. If it comes to markup, it wraps the `T3Form` in order to pass formData elements and init methods to form events.
Please remember that whole form is generated based on `elements` prop which is delivered by API.
To override T3Form template on this level you can use slots (Take a look at the snippet below):
+ **before** - inside `<form>` tag - before field list render
+ **after** - inside `<form>` tag - after field list render
+ **cta** - submit/reset button template
+ **fields** - template for fields rendering - not recommended to override here, there is easier way to customize form fields - [read it](#customize-field-templates).

If it comes to logic, you may want to handle your forms in more complex scenario. For example currently we support redirect as a finisher of the form (if the finisher exist), but you can add more ways to handle it. You can override `onSuccess` method.

At this level you can also provide custom css classes for your fields.
`components/T3CeFormFormframework.vue`:
```vue
<template>
  <T3Form
    ref="form"
    :elements="form.elements"
    :classes="css"
    @submit="onSubmit"
  >
    <template #before="{model}">
      {{ model }}
    </template>

    <template #cta>
      <button type="submit">
        Send form
      </button>
    </template>

    <template #after="{state}">
      <p v-if="state.error || state.failture">
        {{ i18n.serverError }}
      </p>
      <p v-if="state.success">
        {{ i18n.serverSuccess }}
      </p>
    </template>
  </T3Form>
</template>
<script>
import T3CeFormFormframework from '~typo3/components/T3CeFormFormframework/T3CeFormFormframework.vue'
export default {
  extends: T3CeFormFormframework,
   data () {
    return {
      css: Object.freeze({
        // field.identifier : class name
        name: 'wrap-my-name-field'
      })
    }
  },
  methods: {
    onSuccess (actionAfterSuccess) {
      if (actionAfterSuccess?.redirectUri) {
        this.$router.push(actionAfterSuccess.redirectUri)
      } else {
        // do something else
      }
    },
  }
}
</script>
```

## Customize field templates

Each form field uses [`T3FormField`](https://github.com/TYPO3-Initiatives/nuxt-typo3/blob/master/lib/components/T3Form/T3FormField/T3FormField.vue) component as the base template. You can override this template:

Create and register global components `components/T3FormField.vue`:
```vue
<template>
  <ValidationProvider
    v-slot="state"
    :vid="field.identifier"
    :name="field.label"
    :rules="rules"
    slim
  >
    <div class="field-row">
      <label :for="field.identifier"> {{ field.label }} </label>
      <slot :state="state">
        <input
          :id="field.identifier"
          v-model="innerValue"
          :type="field.type"
          :label="field.label"
          :name="field.name || field.identifier"
          :class="state.classes"
          :placeholder="placeholder"
          :required="required"
          @input="(event) => $emit('input', event.target.value)"
        >
      </slot>
      <ul v-if="state.errors.length" class="t3-form-field__errors">
        <li v-for="(error, key) in state.errors" :key="key">
          {{ error }}
        </li>
      </ul>
    </div>
  </ValidationProvider>
</template>
<script>
import { T3FormField } from '~typo3/components/T3Form'
export default {
  name: 'T3FormField',
  extends: T3FormField
}
</script>
<style scoped>
.field-row {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

ul {
  margin: 0;
  color: red;
}
</style>
```
This component uses [`<ValidationProvider/>`](https://vee-validate.logaretm.com/v3/api/validation-provider.html) for field validation.
This template will be suitable for most regular input elements. You can use this template to provide more form types like textarea, checkbox, etc.

## Field list rendering

::: tip To be able to easily customize template fields, it's important to understand how we generate field list. <br/>
<br/>
:::

All fields are generated in the loop, based on form response `elements` field. This is the part of the form response:


```json
  "elements": [
              {
                "type": "Fieldset",
                "identifier": "fieldset-1",
                "label": "Fieldset",
                "defaultValue": null,
                "properties": [],
                "elements": [
                  {
                    "type": "Fieldset",
                    "identifier": "fieldset-2",
                    "label": "Fieldset",
                    "defaultValue": null,
                    "properties": [],
                    "elements": [
                      {
                        "defaultValue": "",
                        "identifier": "name",
                        "label": "Name",
                        "type": "Text",
                        "properties": {
                          "fluidAdditionalAttributes": {
                            "placeholder": "Name",
                            "required": "required"
                          }
                        },
                        "validators": [{ "identifier": "NotEmpty" }],
                        "name": "tx_form_formframework[name]"
                      }
                    ]
                  },
                  {
                    "defaultValue": "",
                    "identifier": "subject",
                    "label": "Subject",
                    "type": "Text",
                    "properties": {
                      "fluidAdditionalAttributes": {
                        "placeholder": "Subject",
                        "required": "required"
                      }
                    },
                    "validators": [{ "identifier": "NotEmpty" }],
                    "name": "tx_form_formframework[subject]"
                  },
                  
                ]
              },
            ]
```

You may have noticed that `name` and `subject` fields are nested in `Fieldset-2` which is nested in `Fieldset-1`. It means we have to render component fields in recursion. 
[`T3FormFieldList` component](https://github.com/TYPO3-Initiatives/nuxt-typo3/blob/master/lib/components/T3Form/T3FormFieldList/T3FormFieldList.vue) is responsible for rendering this list.

This part of the template is responsible for matching frontend component with `field.type` or `field.identifier`. 

```vue
<component
  :is="getComponentField(field)"
  v-model="model[field.name]"
  :field="field"
/>
```


For example: to display and render `input type="hidden"` we had to register `T3FormFieldHidden`.

If you want to add custom textarea field with type "Textarea" then you have to register `T3FormFieldTextarea`

You can also register custom field component for specific field - `T3FormFieldName` if your `field.identifier === 'name'`

Default one is `T3FormField`

## Add new field type

At this moment we support

1. regular input fields like text, email, number and single
2. single select
3. fieldset
4. honeypot == hidden

But you can easliy add new field type.

For example we can add `FormFieldCheckbox`. In that case add new global component `components/T3FormFieldCheckbox.vue`:
```vue
<template>
  <T3FormField v-bind="$props">
    <template #default="{state}">
      <input
        :id="field.identifier"
        v-model="innerValue"
        type="checkbox"
        :label="field.label"
        :name="field.name || field.identifier"
        :class="state.classes"
        :required="required"
        :true-value="true"
        false-value=""
        @input="(event) => $emit('input', event.target.value)"
      >
    </template>
  </T3FormField>
</template>
<script>
import { T3FormField } from '~typo3/components/T3Form'
export default {
  name: 'T3FormFieldCheckbox',
  components: {
    T3FormField
  },
  extends: T3FormField
}
</script>
```

:::tip
Notice that we have used default `T3FormField` as the base template for new form field type. Thanks to that we can create multiple form types with the same template. On the other hand you can put all input types in one FormField component and match them by v-if.
:::


## Add new validation rule

For model validation we use `vee-validate`. 
By default we have setup following rules:

1. required as **NotEmpty**
2. email as **EmailAddress**
3. regex as **RegularExpression**


All additional rules are available [here](https://vee-validate.logaretm.com/v3/guide/rules.html#rules). Remember to use the same rules name as in TYPO3.

### Add new rule 
[Instruction here](https://vee-validate.logaretm.com/v3/guide/rules.html#importing-the-rules)
