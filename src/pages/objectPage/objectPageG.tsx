import React from "react";
import IrsCompositeTableProvider, {
  IrsFilterDialogConsumer,
  IrsComplexTableConsumer,
  IrsPaginationConsumer
} from "ihr360-web-ui/packages/business-component/irs-composite-table-provider";
import { IrsTableScreen } from "ihr360-web-ui/packages/business-component/irs-composite-tables";
import { IrsFullScreen } from "ihr360-web-ui/packages/base-table";
import IrsToolbar from "ihr360-web-ui/packages/base-toolbar/irs-toolbar";
import IrsDynamicHeader from "ihr360-web-ui/packages/display/irs-dynamic-header";
import IrsAvatar from "ihr360-web-ui/packages/display/irs-avatar";
import IrsTab from "ihr360-web-ui/packages/tabbar";
import IrsForm from "ihr360-web-ui/packages/form";
import IrsFormGroup, { IrsSub, IrsSubSection } from "ihr360-web-ui/packages/display/irs-section-form";
import IrsButton from "ihr360-web-ui/packages/action/irs-button";
import "./style.less";

// mock数据
import { headers, headerFormData, formGroupList1, formGroupList2 } from './mockData';
// tab mock数据
const tabList = [
  {
    tab: "基础信息",
    key: "1",
    render: () => {
      return <IrsSub title="基础信息" showAction={false}>
          <IrsFormGroup list={formGroupList2} />
          <IrsFormGroup list={formGroupList2} />
      </IrsSub>
    }
  }, {
    tab: "福利",
    key: "2",
    render: () => {
      return <IrsSub title="福利" customAction={<IrsButton type='primary'>编辑</IrsButton>}>
          <IrsFormGroup list={formGroupList1} />
      </IrsSub>
    }
  }, {
    tab: "工作经历",
    key: "3",
    render: () => {
      return <IrsSub title="工作经历" showAction={false}>
        <IrsSubSection title="经历一">
            <IrsFormGroup list={formGroupList1} />
        </IrsSubSection>
        <IrsSubSection title="经历二">
            <IrsFormGroup list={formGroupList1} />
        </IrsSubSection>
      </IrsSub>
    }
  }
]
const tabList2 = [
  {
    tab: "其他信息",
    key: "5",
    render: () => {
      return <IrsSub title="其他信息" showAction={false} />
    }
  }, {
    tab: "公司信息",
    key: "6",
    render: () => {
      return <IrsSub title="公司信息" showAction={false}>
        <IrsSubSection title="信息一">
            <IrsFormGroup list={formGroupList2} />
        </IrsSubSection>
      </IrsSub>
    }
  }
]

// tab内为table
const TableDemo = (props: any) => {
  const { key, tableCode, compositeTableConfig, paginationConfigure, screen } = props;
  return <IrsCompositeTableProvider
    tableCode={tableCode}
    multiplePlan={false}
    compositeTableConfig={compositeTableConfig}
    paginationConfigure={paginationConfigure}
    key={key}
  >
    <IrsFullScreen isFullScreen={screen}>
      <IrsComplexTableConsumer />
      <IrsPaginationConsumer />
    </IrsFullScreen>
  </IrsCompositeTableProvider>
}


/**
 * 模板页：Object Page
 * headerToolbar + headerForm + Tab (Anchor模式) + Content
 */
class ObjectPageG extends React.Component<any, any> {
  headerRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      headerOptions: headers,     // headerToolbar demo数据
      formList: headerFormData,   // form表单 demo数据
      screen: false,              // 全屏展示状态

      tabData: [                  // tab demo数据
        ...tabList,
        {
          tab: "教育经历",
          key: "4",
          render: () => {
            return <IrsSub key={this.state.screen} title="教育经历" customAction={
                <>
                  <IrsFilterDialogConsumer initialHeight={800} />
                  <IrsTableScreen onExpand={this.onExpand} />
                </>}
              >
                <TableDemo {...this.state} />
            </IrsSub>
          }
        }, 
        ...tabList2
      ],           
      offsetTop: 131,             // tab 距离窗口顶部达到指定偏移量后触发

      tableCode: "recruit.table.talent_pool_candidate",   // 表格code
      compositeTableConfig: {                             // 表格设置
        searchUrl: "/gateway/recruit/api/candidate/list",
        dataSourceConfigure: {
          dataSource: "res.data.data",
          total: "res.data.total",
        },
        paginationConfigure: {
          firstCurrunt: 1,
          pageSizeOptions: ["10", "20", "50", "100"],
        },
        transferParamFormat: this.transferParamFormat,
        transferDataFormat: this.transferDataFormat
      }
    }
    this.headerRef = React.createRef();
  }

  // 获取表格数据=>传参设置
  transferParamFormat = (params: any) => {
    const newParams = { 
      ...params,
      resumeParams: {keywords: ""},
      talentPoolId: '2' 
    } as any;
    if (params.page !== 0) {
      newParams.lastCandidateTalentPoolId =
        this.state.dataSource[
          this.state.dataSource?.length - 1
        ].candidateTalentPoolId;
    }
    return newParams;
  }

  // 表格接口数据转换
  transferDataFormat = (data: any) => {
    const dataSource = (data||[]).map((item: any) => {
      return {
        ...item,
        ...item.resumeBasic,
        ...item.resumeJobIntention,
        ...item.resumeLastEducation,
        ...item.resumeLastEmployment,
        ...item.resumeLastJob,
        ...item.resumeTopEducation,
        id: item.candidateId,
      }
    })
    this.setState({dataSource})
    return dataSource;
  }

  // 全屏展示事件
  onExpand = (expand: boolean) => {
    console.log(expand)
    this.setState({
      screen: expand
    });
  }

  // header toolbar 全局点击事件，用于打开折叠
  onToolbarClick = () => {
    this.headerRef.current.onFold();
  }

  // IrsDynamicHeader 收起按钮 操作后的回调. 不控制收起行为
  foldCallback = (fold: boolean) => {
    this.setState({
        offsetTop: fold ? 56 : 131
    })
  }

  // 设置 Affix 需要监听其滚动事件的元素，默认为window    必须！！！ 
  getTargetContainer = () => document.querySelector("#object-page") as any;

  render() {
    const { headerOptions, formList, tabData, offsetTop } = this.state;
    return (
      <div className="object-page" id="object-page">

        {/* Header Area */}
        <IrsDynamicHeader
          ref={this.headerRef}
          showSticky={true}
          getTargetContainer={this.getTargetContainer}
          foldCallback={this.foldCallback}
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
          tabData={tabData}
          isAnchor={true}
          target={this.getTargetContainer}
          offsetTop={offsetTop}
        />

      </div>
    )
  }
}

export default ObjectPageG;