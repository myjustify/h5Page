export function const2list(data, type = "string", addALL = false) {
  const ret = Object.keys(data).map((key) => {
    if (type === "string") {
      return { label: data[key], value: key };
    } else {
      return { label: data[key], value: +key };
    }
  });
  if (addALL === true) {
    ret.unshift({ label: "全部", value: "" });
  } else if (typeof addALL === "object") {
    ret.unshift(addALL);
  }
  return ret;
}
