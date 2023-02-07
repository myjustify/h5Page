import request from "@/utils/request";
export const ajaxBf = {
  questionAdd({ data, tk }) {
    return request({
      headers: {
        tk: tk
      },
      url: `/pro/question/result/save`,
      method: "post",
      data: data
    });
  }
};
