<template>
  <div class="y-input" :style="[customStyle]">
    <div class="label flex-row" :style="[labelStyle]">
      <span v-if="required">*</span> <span>{{ label }}</span>
    </div>
    <div class="input">
      <el-input
        :type="oType"
        :placeholder="placeholder"
        :name="name"
        :value="value"
        @input="bindInput"
      />
    </div>
  </div>
</template>
<script>
import { ElInput } from "element-ui";
export default {
  name: "y-input",
  components: {
    ElInput,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    oType: {
      type: String,
      default: "text",
    },
    labelStyle: {
      type: Object,
      default: () => ({}),
    },
    label: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  methods: {
    bindInput(e) {
      this.$emit("update:value", e);
      this.$emit("change", { value: e, name: this.name });
    },
  },
};
</script>
<style scoped>
.y-input {
  background: #4E94EC;
  padding: 10px;
}
.label {
  align-items: center;
  color: #FFFFFF;
  margin-bottom: 6px;
}
.input ::v-deep .el-input__inner {
  height: 48px;
  border-radius: 0;
  font-size: 19px;
}
</style>
