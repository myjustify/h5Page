<template>
  <div class="y-select-list" :style="[customStyle]">
    <div class="label flex-row" :style="[labelStyle]">
      <span v-if="required">*</span> <span>{{ label }}</span>
    </div>
    <div v-for="(item, index) in range" :key="index" class="list">
      <div
        class="list-item"
        :class="{ active: isActive(item) }"
        @click="itemClick(item, index)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "y-select-list",
  props: {
    name: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
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
      type: [String, Number, Array],
      default: "",
    },
    range: {
      type: Array,
      default: () => [],
    },
    rangeKey: {
      type: String,
      default: "label",
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clickStatus: false,
    };
  },
  computed: {
    isActive() {
      return (item) => {
        let { value } = this;
        if (this.multiple) {
          value = value || [];
          return value.includes(item.value);
        } else {
          return value === item.value;
        }
      };
    },
  },
  methods: {
    itemClick({ value }) {
      let currentValue = this.value;

      if (!this.multiple) {
        currentValue = value;
      } else {
        currentValue = currentValue || [];
        if (!currentValue.includes(value)) {
          currentValue.push(value);
        } else {
          const vIndex = currentValue.findIndex((v) => v == value);
          currentValue.splice(vIndex, 1);
        }
        currentValue = [...currentValue];
      }
      this.$emit("update:value", currentValue);
      this.$emit("change", { value: currentValue, name: this.name });
    },
  },
};
</script>
<style scoped lang="scss">
.y-select-list {
  background: #4E94EC;
  padding: 10px;
  .label {
    align-items: center;
    color: #FFFFFF;
    margin-bottom: 6px;
  }
  .list {
    .list-item {
      box-sizing: border-box;
      width: 100%;
      background: #FFFFFF;
      padding: 6px 16px;
      margin-bottom: 2px;
      line-height: 1.25em;
      word-break: break-all;
      &.active {
        background: #FBC408;
        color: #FFFFFF;
      }
    }
  }
}
</style>
