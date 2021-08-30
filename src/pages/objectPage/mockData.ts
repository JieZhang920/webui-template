// headerToolbar demo数据
const headers = [
  {
    name: "edit",
    component: "button",
    componentProp: {
      children: "编辑",
      type: "primary",
      onClick: () => console.log("编辑"),
    }
  },
  {
    name: "delete",
    component: "button",
    componentProp: {
      children: "删除",
      onClick: () => console.log("删除"),
    }
  },
  {
    name: "share",
    component: "button",
    componentProp: {
      children: "分享",
    }
  }
]

// objectPageE headerToolbar demo数据
const headersE = [
  {
    name: "delete",
    component: "button",
    componentProp: {
      children: "PC端预览"
    }
  },
  {
    name: "share",
    component: "button",
    componentProp: {
      children: "移动端预览",
    }
  }
]

// 头部form表单 demo数据
const headerFormData = [
  {
    name: "value1",
    component: "input",
    label: "工号",
    initialValue: 'GH00002'
  },
  {
    name: "value2",
    component: "input",
    label: "入职日期",
    initialValue: "2017/02/04"
  },
  {
    name: "value5",
    component: "input",
    label: "所在部门",
    initialValue: '互联网部/产品部/产品一部'
  },
  {
    name: "value4",
    component: "input",
    label: "邮箱",
    initialValue: '12219662789@QQ.com'
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

// formGroup demo数据
const formGroupList1 = [
  {
    name: "bankCardInfo",
    initialValues: {
      name1: '产品部XXXX',
      name2: '年',
      name3: '2020',
      name4: '无周期',
      name5: '2020-01-01',
      name6: '2020-12-31',
      name7: '95',
      name8: '优',
      name9: '优秀',
      name10: '1',
      name11: '1'
    },
    list: [
      {
        name: "name1",
        component: "input",
        label: "考核计划名称",
      },
      {
        name: "name2",
        component: "input",
        label: "考核类型",
      },
      {
        name: "name3",
        component: "input",
        label: "考核所属年份",
      },
      {
        name: "name4",
        component: "input",
        label: "考核周期",
      },
      {
        name: "name5",
        component: "input",
        label: "考核开始日期",
      },
      {
        name: "name6",
        component: "input",
        label: "考核结束日期",
      },
      {
        name: "name7",
        component: "input",
        label: "最终得分",
      },
      {
        name: "name8",
        component: "input",
        label: "绩效等级",
      },
      {
        name: "name9",
        component: "input",
        label: "绩效结果",
      },
      {
        name: "name10",
        component: "input",
        label: "公司排名",
      },
      {
        name: "name11",
        component: "input",
        label: "部门内排名",
      },
    ] 
  }
]

// formGroup demo数据
const formGroupList2 = [
  {
    title: "员工信息",
    ...formGroupList1[0]
  }
]


export {
  headers,
  headersE,
  footers,
  headerFormData,
  formGroupList1,
  formGroupList2
}