<template>
  <div class="y-form">
    <el-form ref="ruleForm" :model="ruleForm">
      <template v-for="item in formData">
        <el-form-item
          :key="item.name"
          :rules="calcRules(item)"
          :prop="item.name"
        >
          <y-input
            v-if="item.type === 'input'"
            :placeholder="item.placeholder || ''"
            :name="item.name"
            :o-type="item.oType || 'text'"
            :label="item.label"
            :value.sync="item.value"
            :required="item.required || false"
            @change="bindChange"
          />
          <y-select-list
            v-if="item.type === 'select-list'"
            :name="item.name"
            :label="item.label"
            :value.sync="item.value"
            :required="item.required || false"
            :range="item.range || []"
            :range-key="item.rangeKey || ''"
            :multiple="item.multiple || false"
            @change="bindChange"
          />

          <!-- <y-date-picker
            v-if="item.type === 'date'"
            :name="item.name"
            :o-type="item.oType || 'date'"
            :label="item.label"
            :value.sync="item.value"
            :required="item.required || false"
            @change="bindChange"
          /> -->

          <template v-if="item.type === 'slot'">
            <slot-content :content="item.content" />
          </template>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script>
import YInput from "@/components/form/input";
import YSelectList from "@/components/form/selectList";
// import YDatePicker from "@/components/form/datePicker";
export default {
  name: "y-form",
  components: {
    YSelectList,
    YInput,
    SlotContent: {
      props: {
        content: {
          default: "",
          type: [String, Object],
        },
      },
      render(h) {
        return h(
          "div",
          {
            class: "form-slot",
          },
          this.content || ""
        );
      },
    },
  },
  props: {
    formData: {
      type: Array,
      default: () => [],
    },
    initData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      localFormData: [],
      ruleForm: {},
    };
  },
  computed: {
    calcRules() {
      return (item) => {
        const rules = [];
        const { type } = item;
        const prefix = type === "input" ? "请输入" : "请选择";
        if (item.required) {
          rules.push({
            required: true,
            message: item.message || prefix + item.label,
            trigger: item.trigger || "change",
          });
        }

        if (item.validator) {
          rules.push({
            validator: item.validator,
            trigger: item.trigger || "change",
          });
        }
        return rules;
      };
    },
  },
  watch: {
    initData: {
      handler() {
        const { localFormData, initData } = this;
        for (let i = 0; i < localFormData.length; i++) {
          const son = this.localFormData[i];
          const value = son.value;
          const { name } = son;
          if (initData[name]) {
            if (Array.isArray(value) && typeof initData[name] === "string") {
              this.localFormData[i].value = initData[name].split(",");
            } else {
              this.localFormData[i].value = initData[name];
            }
          }
        }
        this.initRules();
      },
      immediate: true,
    },
  },
  mounted() {
    this.localFormData = this.formData;
    this.initRules();
  },
  methods: {
    initRules() {
      const ruleForm = {};
      const localFormData = this.localFormData;
      for (let i = 0; i < localFormData.length; i++) {
        const son = localFormData[i];
        ruleForm[son.name] = son.value;
      }
      this.ruleForm = ruleForm;
    },
    getParams() {
      const localFormData = this.localFormData;
      const params = {};
      for (let i = 0; i < localFormData.length; i++) {
        const son = localFormData[i];
        if (son.name) {
          params[son.name] = son.getResult
            ? son.getResult(son.value)
            : son.value;
        }
      }
      return { ...params };
    },
    bindChange({ name, value }) {
      this.ruleForm[name] = value;
    },
    validate(cb) {
      this.$refs.ruleForm.validate((v) => {
        cb(v);
      });
    },
  },
};
</script>
<style scoped>
</style>
