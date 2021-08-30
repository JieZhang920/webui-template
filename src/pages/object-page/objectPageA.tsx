import React from "react";
import IrsToolbar from "ihr360-web-ui/packages/base-toolbar/irs-toolbar";
import IrsDynamicHeader from "ihr360-web-ui/packages/display/irs-dynamic-header";
import IrsAvatar from "ihr360-web-ui/packages/display/irs-avatar";
import IrsTab from "ihr360-web-ui/packages/tabbar";
import IrsForm from "ihr360-web-ui/packages/form";
import IrsFormGroup, { IrsSub, IrsSubSection } from "ihr360-web-ui/packages/display/irs-section-form";
import "./style.less";

// mock数据
import { headers, headerFormData, formGroupList1, formGroupList2 } from './mockData';
// tab mock数据
const tabList = [
  {
    tab: "绩效",
    key: "0",
    render: (index: number) => {
      return <IrsSub title="绩效" showAction={false} className='sub-style-test'>
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
      return <IrsSub title="操作日志" showAction={false}>
          <IrsFormGroup list={formGroupList1} />
      </IrsSub>
    }
  }
]


/**
 * 模板页：Object Page
 * headerToolbar + headerForm + Tab + Content
 */
class ObjectPageA extends React.Component<any, any> {
  headerRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      headerOptions: headers,     // headerToolbar demo数据
      tabData: tabList,           // tab demo数据
      formList: headerFormData    // form表单 demo数据
    }
    this.headerRef = React.createRef();
  }

  // header toolbar 全局点击事件，用于打开折叠
  onToolbarClick = () => {
    this.headerRef.current.onFold();
  }

  // 设置 Affix 需要监听其滚动事件的元素，默认为window    必须！！！ 
  getTargetContainer = () => document.querySelector("#object-page")

  render() {
    const { headerOptions, formList, tabData } = this.state;
    return (
      <div className="object-page" id="object-page">

        {/* Header Area */}
        <IrsDynamicHeader
          ref={this.headerRef}
          showSticky={true}
          getTargetContainer={this.getTargetContainer}
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
          <div className='object-page-header'>
            <IrsAvatar size="S">头像</IrsAvatar>
            <IrsForm 
              editable={false}
              formItemCol={{
                sm: 24, md: 12, lg: 8
              }}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              list={formList}
            />
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

export default ObjectPageA;