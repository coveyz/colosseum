<template>
  <div class="formItem">
    <div class="label">
      {{label}}
    </div>
    <div class="content">
      <slot />
      <div class="errorTip">
        {{validateMessage || ""}}
      </div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
import emitter from '@/utils/mixins/emitter'

export default {
  name: 'ElFormItem',
  componentName: 'ElFormItem',
  mixins: [emitter],
  inject: ['form'],
  provide() {
    return {
      elFormItem: this
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
    },
    required: {
      type: Boolean,
      default: undefined
    },
  },
  data() {
    return {
      validateMessage: "",
      validateState: ''
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('Elform', "el.form.addField", [this])
      // this.addValidateEvents()
    }
    // console.log('inject=<', this.form)
  },
  methods: {
    validate(trigger, callback) {
      // console.log('trigger=>', trigger, callback)
      const rules = this.getFilteredRule(trigger)
      // console.log('validate->rules', rules)
      const descriptor = {}
      // descriptor[this.prop] = rules;
      descriptor[this.prop] = rules[0][this.prop];
      // console.log('descriptor=>', descriptor)
      const validator = new AsyncValidator(descriptor)
      // console.log('validator=>', validator)
      const model = {}
      model[this.prop] = this.form.model[this.prop]
      // console.log('model=>', model)
      validator.validate(model, (errors, invalidFields) => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : ''
        // console.log('validator.validate=>', this.validateState, this.validateMessage, invalidFields)
        callback(this.validateMessage, invalidFields)
      })

    },
    getFilteredRule(trigger) {
      const rules = this.getRules()
      // console.log('getFilteredRule->', rules, trigger)
      return rules.filter(rule => {
        if (!rule.trigger || trigger === '') return true
      }).map(rule => {
        return Object.assign({}, rule)
      })
    },
    getRules() {
      let formRules = this.form.rules
      const requiredRule = this.required !== undefined ? { required: !!this.required } : [];
      // console.log('getRules->', formRules, 'requiredRule->', requiredRule)
      return [].concat(formRules).concat(requiredRule)
    },
    // addValidateEvents() {
    //   const rules = this.getRules()

    //   console.log(rules)
    // }
  },
}
</script>

<style lang="scss" scoped>
.formItem {
  display: flex;
  justify-content: center;
  align-items: center;
  .label {
    margin-right: 5px;
  }
}
.errorTip {
  color: red;
}
</style>