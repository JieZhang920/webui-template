import React from "react";
import IrsToolbar from "ihr360-web-ui/packages/base-toolbar/irs-toolbar";
import IrsDynamicHeader from "ihr360-web-ui/packages/display/irs-dynamic-header";
// import IrsAvatar from "ihr360-web-ui/packages/display/irs-avatar";
// import IrsForm from "ihr360-web-ui/packages/form";
import IrsFormGroup, { IrsSub } from "ihr360-web-ui/packages/display/irs-section-form";
import "./style.less";

// mock数据
import { headers, formGroupList1 } from './mockData';


/**
 * 模板页：Object Page
 * headerToolbar + Content
 */
class ObjectPageF extends React.Component<any, any> {
  headerRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      headerOptions: headers,     // headerToolbar demo数据
    }
    this.headerRef = React.createRef();
  }

  // 设置 Affix 需要监听其滚动事件的元素，默认为window    必须！！！ 
  getTargetContainer = () => document.querySelector("#object-page")

  render() {
    const { headerOptions } = this.state;
    return (
      <div className="object-page object-page-f" id="object-page">

        {/* Header Area */}
        <IrsDynamicHeader
          ref={this.headerRef}
          getTargetContainer={this.getTargetContainer}
          header={
            <IrsToolbar
                title="上海利唐信息科技有限公司"
                toolbarType="header"
                actionOptions={headerOptions}
            />
          }
        />

        {/* Content */}
        <div className="object-page-content">
          <IrsSub title="标题" className='sub-style-test'>
            <IrsFormGroup list={formGroupList1}/>
          </IrsSub>
        </div>

      </div>
    )
  }
}

export default ObjectPageF;