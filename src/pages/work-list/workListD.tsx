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
import IrsTab from "ihr360-web-ui/packages/tabbar";
import IrsGenericAction from "ihr360-web-ui/packages/action/irs-generic-action";
import IrsTitle from "ihr360-web-ui/packages/display/irs-title";
import IrsText from "ihr360-web-ui/packages/display/irs-text";
import { IrsTableScreen } from "ihr360-web-ui/packages/business-component/irs-composite-tables";
import { IrsFullScreen } from "ihr360-web-ui/packages/base-table";
import IrsMessagePopover from "ihr360-web-ui/packages/message/irs-message-popover";
import IrsButton from "ihr360-web-ui/packages/action/irs-button";
import IrsBaseIcon, { ICON_TYPE } from "ihr360-web-ui/packages/base/irs-base-icon";
import "./style.less";

// mock数据
import { tabDataB, errorList } from "./mockData";

/**
 * 模板页：Work List
 * headerToolbar + Tab(图标) + Content + footerToolbar
 */
class WorkListD extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      headerOptions: [    // headertoolbar demo数据
        {
          name: "share",
          component: () => <IrsGenericAction type="share" />
        }
      ],
      tabData: tabDataB,  // tab组件 demo数据
      screen: false,      // 全屏展示状态

      tablebarOptions: [  // 表格toolbar demo数据
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
      },

      footerOptions: [    // footertoolbar demo数据
        {
          name: "popover",
          component: () => (
            <IrsMessagePopover
              title="校验信息"
              list={errorList}
            >
              <IrsButton type="tertiary" context="negative" paddingSize="compact" style={{marginRight: '16px'}}>
                <IrsBaseIcon type={ICON_TYPE.MESSAGE} /> {errorList.length}
              </IrsButton>
            </IrsMessagePopover>
          ),
        },
        {
          name: "cancel",
          component: "button",
          componentProp: {
            children: "取消",
            type: "tertiary",
          },
        },
        {
          name: "save",
          component: "button",
          componentProp: {
            children: "保存",
            type: "primary",
          },
        },
      ]
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
  onExpand = (expand: boolean) => {
    this.setState({
      screen: expand
    });
  }

  render() {
    const { headerOptions, tabData, screen, tablebarOptions, tableCode, compositeTableConfig, footerOptions } = this.state;
    return (
      <div className="work-list-page work-list-page-footer">
        <div className="work-list-header">
          <IrsToolbar
            title={
              <>
                <IrsTitle level="H1" bold={true} className="header-toolbar-title">签约记录</IrsTitle>
                <IrsText level="H2" className="header-toolbar-subtitle">这是一段副标题说明文字</IrsText>
              </>
            }
            toolbarType="header"
            actionOptions={headerOptions}
          />
          <IrsTab
            tabData={tabData}
            tabPaneType='icon'
            flow={true}
          />
        </div>

        <div className="work-list-content">
          <IrsCompositeTableProvider
            tableCode={tableCode}
            multiplePlan={false}
            compositeTableConfig={compositeTableConfig}
            paginationConfigure={this.state.paginationConfigure}
          >
            <IrsFullScreen isFullScreen={screen}>
              <IrsToolbar
                title={<span style={{fontWeight: 'bold'}}><IrsTitleConsumer /><IrsCheckNumConsumer /></span>}
                actionOptions={tablebarOptions}
              />
              <IrsComplexTableConsumer />
              <IrsPaginationConsumer />
            </IrsFullScreen>
          </IrsCompositeTableProvider>
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

export default WorkListD;