// stepsbar mock数据
const stepsList = [
  {
    title: "基本配置"
  },
  {
    title: "模板配置"
  },
  {
    title: "印章配置"
  }
];

// headerToolbar demo数据
const headers = [
  {
    name: "operatioOne",
    component: "button",
    priority: "M",
    componentProp: {
      children: "操作一",
      onClick: () => console.log("操作一"),
    }
  },
  {
    name: "operatioTwo",
    component: "button",
    componentProp: {
      children: "操作二",
      onClick: () => console.log("操作二"),
    }
  }
]

// footerToolbar demo数据
const footers = [
  {
    name: "cancel",
    component: "button",
    componentProp: {
      children: "取消",
      type: "tertiary",
      onClick: () => console.log("取消"),
    }
  },
  {
    name: "next",
    component: "button",
    componentProp: {
      children: "下一步",
      type: "primary",
      onClick: () => console.log("下一步"),
    }
  },
]

// form表单 demo数据
const formData = [
  {
    name: "name",
    component: "input",
    label: "模板名称",
    rules: [{ required: true, message: "请输入模板名称" }],
  },
  {
    name: "textarea",
    component: "textArea",
    label: "模板说明",
    componentProps: {
      showCount: true,
      maxLength: 100,
      rows: 4
    }
  },
  {
    name: "input",
    component: "time",
    label: "模板类型",
    componentProps: {
      suffix: "天"
    },
    rules: [{ required: true }],
  },
  {
    name: "select",
    component: "select",
    label: "公司主体",
    rules: [{ required: true }],
    options: [
      { label: "选择1", key: "1" },
      { label: "选择2", key: "2" },
      { label: "选择3", key: "3" },
    ],
  }
]

export {
  stepsList,
  headers,
  footers,
  formData
}