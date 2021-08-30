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
import { IrsTableScreen } from "ihr360-web-ui/packages/business-component/irs-composite-tables";
import { IrsFullScreen } from "ihr360-web-ui/packages/base-table";
import IrsToolbar from "ihr360-web-ui/packages/base-toolbar/irs-toolbar";
import IrsDynamicHeader from "ihr360-web-ui/packages/display/irs-dynamic-header";
import IrsText from "ihr360-web-ui/packages/display/irs-text";
import IrsTab from "ihr360-web-ui/packages/tabbar";
import "./style.less";

// mock数据
import { headers } from './mockData';

const TableDemo = (props: any) => {
  const { key, tableCode, compositeTableConfig, paginationConfigure, screen, tablebarOptions } = props;
  return <IrsCompositeTableProvider
    tableCode={tableCode}
    multiplePlan={false}
    compositeTableConfig={compositeTableConfig}
    paginationConfigure={paginationConfigure}
    key={key}
  >
    <IrsFullScreen isFullScreen={screen} className='object-page-c-full-screen'>
      <IrsToolbar
        title={<span style={{fontWeight: 'bold'}}><IrsTitleConsumer /><IrsCheckNumConsumer /></span>}
        actionOptions={tablebarOptions}
      />
      <IrsComplexTableConsumer />
      <IrsPaginationConsumer />
    </IrsFullScreen>
  </IrsCompositeTableProvider>
}


/**
 * 模板页：Object Page
 * headerToolbar + plainText + Tab + Content (为table)
 */
class ObjectPageC extends React.Component<any, any> {
  headerRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      headerOptions: headers,     // headerToolbar demo数据
      screen: false,              // 全屏展示状态

      tabData: [                  // tab demo数据
        {
          tab: "绩效",
          key: "0",
          render: () => <TableDemo {...this.state} key='key01' />
        }, {
          tab: "操作日志",
          key: "1",
          render: () => <TableDemo {...this.state} key='key02' />
        }
      ],           

      tablebarOptions: [          // 表格toolbar demo数据
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
    this.setState({
      screen: expand
    });
  }

  // header toolbar 全局点击事件，用于打开折叠
  onToolbarClick = () => {
    this.headerRef.current.onFold();
  }

  render() {
    const { headerOptions, tabData } = this.state;
    return (
      <div className="object-page object-page-c">

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

export default ObjectPageC;