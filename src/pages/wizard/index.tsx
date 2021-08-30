import React from "react";
import IrsToolbar from "ihr360-web-ui/packages/base-toolbar/irs-toolbar";
import IrsStepsbar from "ihr360-web-ui/packages/stepsbar";
import IrsForm from "ihr360-web-ui/packages/form";
import Affix from "antd4/es/affix"
import "./style.less";

// mock数据
import { stepsList, headers, footers, formData } from './mockData';

/**
 * 模板页：Wizard
 * headerToolbar + Stepsbar + Content + footerToolbar
 */
class Wizard extends React.Component<any, any> {
  wizardRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      current: 0,
      headerOptions: headers,  // headerToolbar demo数据
      footerOptions: footers,  // footerToolbar demo数据
      formList: formData       // form表单 demo数据
    }
    this.wizardRef = React.createRef();
  }
  
  // 设置 Affix 需要监听其滚动事件的元素，默认为window
  getTargetContainer = () => this.wizardRef.current;

  render() {
    const { current, headerOptions, footerOptions, formList } = this.state;
    return (
      <div className="wizard-page" ref={this.wizardRef}>
        <Affix target={this.getTargetContainer} style={{ zIndex: 1 }} >
          <div className="wizard-header">
            <IrsToolbar
              title="创建模板"
              toolbarType="header"
              actionOptions={headerOptions}
            />
            <IrsStepsbar
              current={current}
              stepDataArray={stepsList}
            />
          </div>
        </Affix>

        <div className="wizard-content">
          <IrsForm
            formItemCol={{
              md: 24,
            }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            list={formList}
          />
        </div>
        
        <IrsToolbar
          toolbarType="footer"
          actionOptions={footerOptions}
          style={{position: 'absolute'}}
        />
      </div>
    )
  }
}

export default Wizard;