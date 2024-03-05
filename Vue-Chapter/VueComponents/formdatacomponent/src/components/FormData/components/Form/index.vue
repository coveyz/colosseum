<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "Elform",
  componentName: "Elform",
  props: {
    model: {
      type: Object,
      required: true,
      default: () => {},
    },
    rules: {
      type: Object,
    },
  },
  provide() {
    return {
      form: this,
    };
  },
  data() {
    return {
      fields: [],
    };
  },
  created() {
    this.$on("el.form.addField", (field) => {
      if (field) {
        this.fields.push(field);
        // console.log('fields=>', this.fields)
      }
    });
  },
  methods: {
    validate(cb) {
      if (this.fields.length === 0 && cb) {
        cb(true);
      }
      let valid = true,
        invalidFields = {},
        count = 0;
      this.fields.forEach((field) => {
        field.validate("", (message, field) => {
          if (message) {
            valid = false;
          }
          invalidFields = Object.assign({}, invalidFields, field);

          if (typeof cb === "function" && ++count === this.fields.length) {
            cb(valid, invalidFields);
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
