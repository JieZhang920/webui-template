import React from "react";
import IrsCompositeTableProvider, {
  IrsTitleConsumer,
  IrsCheckNumConsumer,
  IrsGroupDialogConsumer,
  IrsFilterDialogConsumer,
  IrsTableColumnSetConsumer,
  IrsComplexTableConsumer,
  IrsPaginationConsumer
} from "ihr360-web-ui/packages/business-component/irs-composite-table-provider";
import IrsToolbar from "ihr360-web-ui/packages/base-toolbar/irs-toolbar";
import { IrsTableScreen } from "ihr360-web-ui/packages/business-component/irs-composite-tables";
import { IrsFullScreen } from "ihr360-web-ui/packages/base-table";
import "./style.less";

// mock数据
import { actionOptions } from "./mockData";

/**
 * 模板页：List Report
 * Content（三级菜单）
 */
class ListReportA extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      headerOptions: actionOptions,  // headertoolbar demo数据
      screen: false,                 // 全屏展示状态

      tablebarOptions: [             // 表格toolbar demo数据
        {
          name: "filterDialog",
          component: () => <IrsFilterDialogConsumer initialHeight={800} />,
          stoppropagation: false,  
        },
        {
          name: "groupDialog",
          component: () => <IrsGroupDialogConsumer />,
          stoppropagation: false,  // 可设置为允许事件传播，当按钮折叠隐藏后，点击操作不会影响dropdown的正常收起
        },
        {
          name: "tableColumnSet",
          component: () => <IrsTableColumnSetConsumer />,
          stoppropagation: false,
        },
        {
          name: "divider",
          component: "divider",
        },
        {
          name: "tableScreen",
          component: () => <IrsTableScreen onExpand={this.onExpand} />,
          stoppropagation: false,
        }
      ],  

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
  onExpand = (screen: boolean) => {
    this.setState({ screen });
  }

  render() {
    const { screen, tablebarOptions, compositeTableConfig, tableCode } = this.state;
    return (
      <div className="list-report-page list-report-page-margintop">
        <IrsCompositeTableProvider
          tableCode={tableCode}
          multiplePlan={false}
          compositeTableConfig={compositeTableConfig}
          paginationConfigure={this.state.paginationConfigure}
        >
          <IrsFullScreen className="list-report-page-screen" isFullScreen={screen}>
            <IrsToolbar
              title={<span style={{fontWeight: 'bold'}}><IrsTitleConsumer /><IrsCheckNumConsumer /></span>}
              actionOptions={tablebarOptions}
            />
            <IrsComplexTableConsumer />
            <IrsPaginationConsumer />
          </IrsFullScreen>
        </IrsCompositeTableProvider>
      </div>
    )
  }
}

export default ListReportA;