<template>
  <div
      v-loading.fullscreen.lock="loading"
      :class="[comName]"
      element-loading-text="拼命加载中"
  >
    <div class="content-box">
      <div style="height: 10px"/>
      <y-form
          ref="form"
          :form-data="questions"
          :init-data="initData"
      />
      <div class="confirm" @click="confirm">
        <img src="../../assets/button.png" alt="提交"/>
      </div>
    </div>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
    >
      <span>提交成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import YForm from "@/components/form/form";
import {const2list} from "@/utils";
import {ajaxJg} from "@/api";
import {
  Dialog,
  Loading,
  Button
} from "element-ui";

export default {
  name: "jgQuestion",
  components: {
    YForm,
    ElDialog: Dialog,
    ElButton: Button
  },
  data() {
    const list = {A: "满意", B: "较满意", C: '一般', D: '不太满意', E: '很不满意'};
    const getResult = ( ctx, v) => {
      return {
        question: ctx.label.replace(/^\d+、/, ''),
        resultContent: list[v]
      };
    };
    return {
      comName: "jgQuestion",
      loading: false,
      tk: "",
      initData: {},
      dialogVisible: false,
      questions: [
        {
          name: "a",
          label: "1、工作人员的服务态度：",
          required: true,
          type: "select-list",
          value: "",
          message: '请选择',
          range: const2list(list),
          getResult(v) {
            return getResult(this, v)
          }
        },
        {
          name: "b",
          label: "2、工作人员是否遵循公司各项规章制度（包括工作作息制度）：",
          required: true,
          type: "select-list",
          value: "",
          range: const2list(list),
          getResult(v) {
            return getResult(this, v)
          },
          message: '请选择'
        },
        {
          name: "c",
          label: "3、工作人员是否遵循相关操作流程和操作时间的规定：",
          required: true,
          type: "select-list",
          value: "",
          range: const2list(list),
          getResult(v) {
            return getResult(this, v)
          },
          message: '请选择',
        },
        {
          name: "d",
          label: "4、工作人员响应是否及时：",
          required: true,
          type: "select-list",
          value: "",
          range: const2list(list),
          getResult(v) {
            return getResult(this, v)
          },
          message: '请选择',
        },
        {
          name: "e",
          label: "5、工作人员的技术水平：",
          required: true,
          type: "select-list",
          value: "",
          range: const2list(list),
          getResult(v) {
            return getResult(this, v)
          },
          message: '请选择',
        },
        {
          name: "f",
          label: "6、沟通与协作配合是否良好：",
          required: true,
          type: "select-list",
          value: "",
          range: const2list(list),
          getResult(v) {
            return getResult(this, v)
          },
          message: '请选择',
        },
        {
          name: "g",
          label: "7、您认为目前工作需改善的方面有哪些：",
          required: true,
          type: "input",
          oType: 'textarea',
          value: "",
          range: const2list(list),
          getResult(v) {
            return {
              question: this.label.replace(/^\d+、/, ''),
              resultContent: v,
            }
          },
          message: '请输入',
        },
        {
          name: "h",
          label: "8、请您为本次调查做个评分：",
          required: true,
          type: "select-list",
          value: "",
          range: const2list(list),
          getResult(v) {
            return getResult(this, v)
          },
          message: '请选择',
        },
      ],
    };
  },
  mounted() {
    document.title = "调查问卷";
    const {tk} = this.$route.query
    this.tk = tk
  },
  methods: {
    confirm() {
      let flag = true;
      this.$refs.form.validate((v) => {
        if (!v) {
          flag = false;
        }
      });

      if (!flag) return;
      const params = Object.entries(this.$refs.form.getParams()).map(son => son[1])
      const loading = Loading.service({
        text: "上传中",
      });
      ajaxJg.questionAdd({
        data: {
          detailVoList: params
        },
        tk: this.tk
      })
      .then(() => {
        this.dialogVisible = true
      })
      .finally(() => {
        loading.close();
      });
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  .y-select-list {
    padding: 0 10px 10px;
    font-size: 16px;

    .label {
      margin-bottom: 0;
    }

    .list {
      //.list-item {
      //  height: 40px;
      //  line-height: 40px;
      //}
    }
  }
}

.jgQuestion {
  min-height: 100%;
  background: #1570E4;

  .banner {
    width: 100%;
    font-size: 0;

    img {
      width: 100%;
    }
  }

  .content-box {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 10px;

    .description {
      //background-image: url("../../assets/border.png");
      background-size: 100% 100%;
      color: #004CB1;
      padding: 30px 20px;
    }
  }

  .confirm {
    padding: 20px 0;
  }

  .confirm {
    img {
      width: 100%;
    }
  }

  .category {
    font-size: 18px;
    font-weight: bold;
    color: red;
    padding: 6px;
  }
}
</style>
