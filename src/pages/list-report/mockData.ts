// headertoolbar demo数据
const actionOptions = [
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

export {
    actionOptions
}