<template>
  <div class="y-date-picker" :style="[customStyle]">
    <div class="label flex-row" :style="[labelStyle]">
      <span v-if="required">*</span> <span>{{ label }}</span>
    </div>
    <div class="input">
      <el-date-picker
        v-model="currentValue"
        :type="oType"
        :name="name"
        :placeholder="placeholder"
        @change="bindInput"
      />
    </div>
  </div>
</template>
<script>
import { ElDatePicker } from "element-ui";
export default {
  name: "y-date-picker",
  components: {
    ElDatePicker,
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
      default: "date",
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
    return {
      types: [
        "year",
        "month",
        "date",
        "dates",
        " week",
        "datetime",
        "datetimerange",
        " daterange",
        "monthrange",
      ],
      currentValue: "",
    };
  },
  watch: {
    value: {
      handler(v) {
        this.currentValue = v;
      },
      immediate: true,
    },
  },
  methods: {
    bindInput(e) {
      this.$emit("update:value", Date.parse(e));
      this.$emit("change", { value: Date.parse(e), name: this.name });
    },
  },
};
</script>
<style scoped>
.y-date-picker {
  background: #4E94EC;
  padding: 10px;
}
.label {
  align-items: center;
  color: #FFFFFF;
  margin-bottom: 6px;
}
.input ::v-deep .el-date-editor.el-input {
  width: 100%;
}
.input ::v-deep .el-date-editor.el-input__inner {
  width: 100%;
}
.input ::v-deep .el-input__inner {
  height: 48px;
  border-radius: 0;
  font-size: 19px;
}
</style>
