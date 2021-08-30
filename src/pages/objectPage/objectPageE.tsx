import React from "react";
import IrsToolbar from "ihr360-web-ui/packages/base-toolbar/irs-toolbar";
import IrsDynamicHeader from "ihr360-web-ui/packages/display/irs-dynamic-header";
import IrsTab from "ihr360-web-ui/packages/tabbar";
import IrsFormGroup, { IrsSub } from "ihr360-web-ui/packages/display/irs-section-form";
import "./style.less";

// mock数据
import { headersE, formGroupList1, formGroupList2 } from './mockData';
// tab mock数据
const tabList = [
  {
    tab: "官网设置",
    key: "0",
    render: () => {
      return <IrsSub title="官网设置" className='sub-style-test'>
          <IrsFormGroup list={formGroupList1} />
      </IrsSub>
    }
  }, {
    tab: "职位清单",
    key: "1",
    render: () => {
      return <IrsSub title="职位清单" showAction={false}>
          <IrsFormGroup list={formGroupList2} />
      </IrsSub>
    }
  }
]


/**
 * 模板页：Object Page
 * headerToolbar + Tab + Content
 */
class ObjectPageE extends React.Component<any, any> {
  headerRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      headerOptions: headersE,     // headerToolbar demo数据
      tabData: tabList,           // tab demo数据
    }
    this.headerRef = React.createRef();
  }

  render() {
    const { headerOptions, tabData } = this.state;
    return (
      <div className="object-page">

        {/* Header Area */}
        <IrsDynamicHeader
          ref={this.headerRef}
          header={
            <IrsToolbar
                title="招聘官网"
                toolbarType="header"
                actionOptions={headerOptions}
            />
          }
        />

        {/* Tab + Content */}
        <IrsTab 
          className="object-page-tab"
          tabData={tabData}
        />

      </div>
    )
  }
}

export default ObjectPageE;