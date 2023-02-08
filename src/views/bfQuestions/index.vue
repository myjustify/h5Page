<template>
  <div
      v-loading.fullscreen.lock="loading"
      :class="[comName]"
      element-loading-text="拼命加载中"
  >
    <div class="content-box">
      <div style="height: 10px" />
      <template v-for="(item, index) in questions">
        <div :key="index">
          <div class="category">
            {{ calcCategory(index) }}、{{ item.category }}
          </div>
          <y-form
              ref="form"
              :key="index"
              :form-data="item.list"
              :init-data="initData[item.name]"
          />
        </div>
      </template>
      <div class="confirm" @click="confirm">
        <img src="../../assets/button.png" alt="提交" />
      </div>
    </div>
  </div>
</template>

<script>
import YForm from "@/components/form/form";
import {
  ajaxBf
} from "@/api";
import { const2list } from "@/utils";
import {
  Message,
  Loading
} from "element-ui";
export default {
  name: "bfQuestion",
  components: {
    YForm,
  },
  data() {
    const aCategory = "原料煤";
    const bCategory = "焦炭";
    const cCategory = "聚烯烃";
    const getResult = (category, ctx, v) => {
      return {
        category: category,
        question: ctx.label,
        resultContent: v,
      };
    };
    const AListA = { A: "A、有", B: "B、没有" };
    const AListB = {
      A: "A、宁东附近",
      B: "B、乌海、棋盘井",
      C: "C、吴忠",
      D: "D、中卫",
      E: "E、惠农",
      F: "F、石嘴山",
      G: "G、其他",
    };
    const AListC = {
      A: "A、煤炭、焦炭、焦粉类",
      B: "B、矿石、矿粉类",
      C: "C、钢材、建材类",
      D: "D、农产品",
      E: "E、其他",
    };
    const AListD = {
      A: "A、就地休息，继续找货",
      B: "B、空跑回去",
      C: "C、催促找车人上调运费",
      D: "D、跑更远的地方装回货",
      E: "E、其他",
    };
    const BListA = {
      A: "A、卸货地附近",
      B: "B、没有返程货",
      C: "C、其他",
    };
    const BListB = {
      A: "A、煤炭、焦炭、焦粉类",
      B: "B、矿石、矿粉类",
      C: "C、钢材、建材类",
      D: "D、农产品",
      E: "E、其他",
    };
    const BListC = {
      A: "A、就地休息，继续找货",
      B: "B、空跑回去",
      C: "C、催促找车人上调运费",
      D: "D、跑更远的地方装回货",
      E: "E、其他",
    };
    const CListA = {
      A: "A、宁夏、甘肃、陕西、内蒙",
      B: "B、新疆、青海、四川、重庆",
      C: "C、山西、河南、河北、北京、天津、山东",
      D: "D、湖南、湖北、江西、江苏、浙江",
      E: "E、其它省市",
    };
    const CListB = {
      A: "A、煤炭、焦炭、焦粉类",
      B: "B、矿石、矿粉类",
      C: "C、钢材、建材类",
      D: "D、农产品",
      E: "E、其它",
    };
    return {
      comName: "bfQuestion",
      loading: false,
      tk: "",
      initData: {
        A: {},
        B: {},
        C: {},
      },
      questions: [
        {
          name: "A",
          category: aCategory,
          list: [
            {
              name: "a",
              label: "在宝丰卸煤后，返程有回货吗？",
              required: true,
              type: "select-list",
              value: "",
              range: const2list(AListA),
              getResult(v) {
                return getResult(aCategory, this, v);
              },
            },
            {
              name: "b",
              label: "在宝丰卸煤后，一般在哪装回货?",
              required: true,
              type: "select-list",
              value: "",
              range: const2list(AListB),
              getResult(v) {
                return getResult(aCategory, this, v);
              },
            },
            {
              name: "c",
              label: "回货主要拉运什么货物？",
              required: true,
              type: "select-list",
              value: "",
              range: const2list(AListC),
              getResult(v) {
                return getResult(aCategory, this, v);
              },
            },
            {
              name: "d",
              label: "在宝丰卸煤后，如果没有回货，怎么办？？",
              required: true,
              type: "select-list",
              value: "",
              range: const2list(AListD),
              getResult(v) {
                return getResult(aCategory, this, v);
              },
            },
          ],
        },
        {
          name: "B",
          category: bCategory,
          list: [
            {
              name: "a",
              label: "把宝丰的焦炭拉到目的地后，一般在哪装回货?",
              required: true,
              type: "select-list",
              value: "",
              range: const2list(BListA),
              getResult(v) {
                return getResult(bCategory, this, v);
              },
            },
            {
              name: "b",
              label: "您装的回货主要拉运什么物资？",
              required: true,
              type: "select-list",
              value: "",
              range: const2list(BListB),
              getResult(v) {
                return getResult(bCategory, this, v);
              },
            },
            {
              name: "c",
              label: "卸完焦炭，如果没有回货，怎么办？",
              required: true,
              type: "select-list",
              value: "",
              range: const2list(BListC),
              getResult(v) {
                return getResult(bCategory, this, v);
              },
            },
          ],
        },
        {
          name: "B",
          category: cCategory,
          list: [
            {
              name: "a",
              label: "从什么地方来宁夏宝丰的？",
              required: true,
              type: "select-list",
              value: "",
              range: const2list(CListA),
              getResult(v) {
                return getResult(cCategory, this, v);
              },
            },
            {
              name: "b",
              label: "来宁夏宝丰时拉的什么货物？",
              required: true,
              type: "select-list",
              value: "",
              range: const2list(CListB),
              getResult(v) {
                return getResult(cCategory, this, v);
              },
            },
          ],
        },
      ],
    };
  },
  computed: {
    calcCategory() {
      return (i) => {
        return ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"][i];
      };
    },
  },
  mounted() {
    document.title = "宝丰问卷";
    const { tk, ownerId, vehicleId } = this.$route.query
    this.tk = tk;
    this.vehicleId = vehicleId;
    this.ownerId = ownerId;
  },
  methods: {
    confirm() {
      let flag = true;
      this.$refs.form.map((son) => {
        son.validate((v) => {
          if (!v) {
            flag = false;
          }
        });
      });

      if (!flag) return;
      const params = [];
      this.$refs.form
          .map((son) => {
            return son.getParams();
          })
          .map((son) => {
            Object.entries(son).map((s) => {
              params.push(s[1]);
            });
          });
      const loading =
          Loading.service({
            text: "上传中",
          });
      ajaxBf
          .questionAdd({
            data: {
              questionVoList: params,
              ownerId: this.ownerId,
              vehicleId: this.vehicleId
            },
            tk: this.tk
          })
          .then(() => {
            Message({
              message: "提交成功",
              type: "success",
              duration: 2000,
            });
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
.bfQuestion {
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