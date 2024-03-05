<template>
  <div>
    <input
      :type="type"
      v-bind="$attrs"
      @input="handleInput"
      @change="handleChange"
    />
  </div>
</template>

<script>
import emitter from "@/utils/mixins/emitter";
export default {
  mixins: [emitter],
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: [String, Number],
  },
  watch: {
    // value(val) {
    // console.log('watch=>', val)
    // this.dispatch("ELformItem", "el.form.change", [val])
    // }
  },
  methods: {
    handleInput(event) {
      // console.log('handleInput=>', event)
      this.$emit("input", event.target.value);
    },
    handleChange(event) {
      console.log("handleChange->", event);
      this.$emit("change", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
