import React from "react";
import IrsToolbar from "ihr360-web-ui/packages/base-toolbar/irs-toolbar";
import IrsDynamicHeader from "ihr360-web-ui/packages/display/irs-dynamic-header";
import IrsTab from "ihr360-web-ui/packages/tabbar";
import IrsFormGroup, { IrsSub, IrsSubSection } from "ihr360-web-ui/packages/display/irs-section-form";
import IrsText from "ihr360-web-ui/packages/display/irs-text";
import "./style.less";

// mock数据
import { headers, formGroupList1, formGroupList2 } from './mockData';
// tab mock数据
const tabList = [
  {
    tab: "绩效",
    key: "0",
    render: (index: number) => {
      return <IrsSub title="绩效" showAction={false}>
        <IrsSubSection title="绩效一">
            <IrsFormGroup list={formGroupList2} />
        </IrsSubSection>
        <IrsSubSection title="绩效二">
            <IrsFormGroup list={formGroupList1} />
        </IrsSubSection>
      </IrsSub>
    }
  }, {
    tab: "操作日志",
    key: "1",
    render: (index: number) => {
      return <IrsSub title="操作日志">
          <IrsFormGroup list={formGroupList1} />
      </IrsSub>
    }
  }
]


/**
 * 模板页：Object Page
 * headerToolbar + plainText + Tab + Content
 */
class ObjectPageB extends React.Component<any, any> {
  headerRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      headerOptions: headers,     // headerToolbar demo数据
      tabData: tabList,           // tab demo数据
    }
    this.headerRef = React.createRef();
  }

  // header toolbar 全局点击事件，用于打开折叠
  onToolbarClick = () => {
    this.headerRef.current.onFold();
  }

  render() {
    const { headerOptions, tabData } = this.state;
    return (
      <div className="object-page">

        {/* Header Area */}
        <IrsDynamicHeader
          ref={this.headerRef}
          showSticky={true}
          header={
            <IrsToolbar
                title="张三"
                toolbarType="header"
                blankClickStyle={true}
                onClick={this.onToolbarClick}
                actionOptions={headerOptions}
            />
          }
        >
          <div className='object-page-header-text'>
            <IrsText level='H1'>这里是文本这里是文本这里是文本这里是文本这里是文本这里是文本这里是文本这里是文本这里是文本这里是文本</IrsText>
            <br/>
            <IrsText level='H1'>这里是文本这里是文本</IrsText>
          </div>
        </IrsDynamicHeader>

        {/* Tab + Content */}
        <IrsTab 
          className="object-page-tab"
          tabData={tabData}
        />

      </div>
    )
  }
}

export default ObjectPageB;