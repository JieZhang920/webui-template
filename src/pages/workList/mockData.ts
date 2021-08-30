// worklistA/B tabbar-mock数据
const tabDataA = [
  {
    tab: "全部(200)",
    key: "0",
    divider: true
  },
  {
    tab: "待我签(20)",
    key: "1"
  },
  {
    tab: "待他人签(20)",
    key: "2",
    badge: true
  },
  {
    tab: "签约完成(80)",
    key: "3"
  },
  {
    tab: "我发起(80)",
    key: "4"
  },
]

// worklistC/D tabbar-mock数据
const tabDataB = [
  {
    tab: '选项一(80)',
    tabPaneIcon: 'icon-approval',
    tabPaneStatus: 'highlight',
    key: "1"
  },
  {
    tab: '选项二(20)',
    tabPaneIcon: 'icon-training',
    tabPaneStatus: 'error',
    key: "2"
  },
  {
    tab: '选项三(20)',
    tabPaneIcon: 'icon-organization',
    tabPaneStatus: 'warning',
    key: "3"
  },
  {
    tab: '选项四(20)',
    tabPaneIcon: "icon-xiaoxi1",
    tabPaneStatus: 'success',
    key: "4"
  },
];

// worklistD footerbar-mock数据
const errorList = [
  { message: "请选择姓名", name: "姓名", type: "error" },
  { message: "请选择卡号", name: "卡号", type: "error" },
  { message: "请选择地区", name: "地区", type: "error" },
  { message: "最多只能输入50个字符", name: "地址", type: "warning" },
] as any;

export {
  tabDataA,
  tabDataB,
  errorList
}