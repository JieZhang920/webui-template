import React from "react";
import IrsToolbar from "ihr360-web-ui/packages/base-toolbar/irs-toolbar";
import IrsDynamicHeader from "ihr360-web-ui/packages/display/irs-dynamic-header";
import IrsAvatar from "ihr360-web-ui/packages/display/irs-avatar";
import IrsForm from "ihr360-web-ui/packages/form";
import IrsButton from "ihr360-web-ui/packages/action/irs-button";
import IrsFormGroup, { IrsSub } from "ihr360-web-ui/packages/display/irs-section-form";
import "./style.less";

// mock数据
import { headers, headerFormData, formGroupList1 } from './mockData';


/**
 * 模板页：Object Page
 * headerToolbar + headerForm + Content
 */
class ObjectPageD extends React.Component<any, any> {
  headerRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      headerOptions: headers,     // headerToolbar demo数据
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
    const { headerOptions, formList } = this.state;
    return (
      <div className="object-page object-page-d" id="object-page">

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

        {/* Content */}
        <div className="object-page-content">
          <IrsSub title="标题" customAction={<IrsButton type='primary'>编辑</IrsButton>} className='sub-style-test'>
            <IrsFormGroup list={formGroupList1}/>
          </IrsSub>
        </div>

      </div>
    )
  }
}

export default ObjectPageD;