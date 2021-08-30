import * as React from 'react';
import { Link } from 'react-router-dom';
import IrsMenu from "ihr360-web-ui/packages/base/irs-menu";
import IrsBaseIcon from "ihr360-web-ui/packages/base/irs-base-icon";
import IrsLayout from 'ihr360-web-ui/packages/base/irs-layout';
import { getQueryString } from '../util/common';

export default class LeftSider extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false,
            selectedKeys: null,
            openKeys: [],
            menuList: [
                {
                    key: '0',
                    url: '/wizard',
                    icon: 'dianziqianyue',
                    name: 'Wizard',
                    description: 'headerToolbar + Stepsbar + Content + footerToolbar',
                    fileLinkUrl: 'kthver'
                },
                {
                    key: 'sub1',
                    icon: '30_icon_bar_table',
                    name: 'Work List',
                    fileLinkUrl: 'bsx6oo',
                    subMenuList: [
                        {
                            key: 'sub1-1',
                            url: '/workListA',
                            name: 'workList-A',
                            description: 'headerToolbar + Tab + Content'
                        },
                        {
                            key: 'sub1-2',
                            url: '/workListB',
                            name: 'workList-B',
                            description: 'headerToolbar + Subtitle + Tab + Content'
                        },
                        {
                            key: 'sub1-3',
                            url: '/workListC',
                            name: 'workList-C',
                            description: 'headerToolbar + Tab(图标) + Content'
                        },
                        {
                            key: 'sub1-4',
                            url: '/workListD',
                            name: 'workList-D',
                            description: 'headerToolbar + Content'
                        },
                        {
                            key: 'sub1-5',
                            url: '/workListE',
                            name: 'workList-E',
                            description: 'headerToolbar + Tab(图标) + Content + footerToolbar'
                        }
                    ]
                },
                {
                    key: 'sub2',
                    icon: 'biaoge1',
                    name: 'List Report',
                    fileLinkUrl: 'ightf1',
                    subMenuList: [
                        {
                            key: 'sub2-1',
                            url: '/listReportA',
                            name: 'listReport-A',
                            description: 'headerToolbar + Filterbar + Content'
                        },
                        {
                            key: 'sub2-2',
                            url: '/listReportB',
                            name: 'listReport-B',
                            description: 'Content（无三级菜单）'
                        },
                        {
                            key: 'sub2-3',
                            url: '/listReportC',
                            name: 'listReport-C',
                            description: 'Content（三级菜单）'
                        },
                    ]
                },
                {
                    key: 'sub3',
                    icon: 'zizhu1',
                    name: 'Object Page',
                    fileLinkUrl: 'fb8oyy',
                    subMenuList: [
                        {
                            key: 'sub3-1',
                            url: '/objectPageA',
                            name: 'objectPage-A',
                            description: 'headerToolbar + headerForm + Tab + Content'
                        },
                        {
                            key: 'sub3-2',
                            url: '/objectPageB',
                            name: 'objectPage-B',
                            description: 'headerToolbar + plainText + Tab + Content'
                        },
                        {
                            key: 'sub3-3',
                            url: '/objectPageC',
                            name: 'objectPage-C',
                            description: 'headerToolbar + plainText + Tab + Content (为table)'
                        },
                        {
                            key: 'sub3-4',
                            url: '/objectPageD',
                            name: 'objectPage-D',
                            description: 'headerToolbar + headerForm + Content'
                        },
                        {
                            key: 'sub3-5',
                            url: '/objectPageE',
                            name: 'objectPage-E',
                            description: 'headerToolbar + Tab + Content'
                        },
                        {
                            key: 'sub3-6',
                            url: '/objectPageF',
                            name: 'objectPage-F',
                            description: 'headerToolbar + Content'
                        },
                        {
                            key: 'sub3-7',
                            url: '/objectPageG',
                            name: 'objectPage-G',
                            description: 'headerToolbar + headerForm + Tab (Anchor模式) + Content'
                        },
                    ]
                }
            ]
        }
    }

    componentDidMount () {
        const selectedKeys = getQueryString('key');
        this.setState({
            selectedKeys: [selectedKeys || this.state.menuList[0].key],
            openKeys: this.getOpenKeys()
        })
        if(!selectedKeys) {
            const {description, url, fileLinkUrl, key} = this.state.menuList[0];
            location.href = location.href.slice(0,location.href.length-1) + `${url}?key=${key}&fileLinkUrl=${fileLinkUrl}&description=${description}`;
        }
    }

    getOpenKeys = () => {
        const selectedKeys = getQueryString('key') || this.state.menuList[0].key;
        return selectedKeys.split('-').length > 1 ? [selectedKeys.split('-')[0]] : []
    }

    toggleCollapsed = () => {
        const newState = { collapsed: !this.state.collapsed } as any;
        if(this.state.collapsed) {
            newState.openKeys = this.getOpenKeys();
        }
        this.setState(newState);
    };
    onSelect = (obj: any) => {
        this.setState({selectedKeys: obj.selectedKeys})
    }
    onOpenChange = (openKeys: string[]) => {
        const length = openKeys.length;
        this.setState({openKeys: length > 0 ? openKeys.slice(length-1) : []})
    }

    renderMenuItems = (item: any) => {
        const {subMenuList, name, key, icon, fileLinkUrl} = item;
        if(Array.isArray(subMenuList) && !!subMenuList.length){
            return (
                <IrsMenu.SubMenu
                    key={key}
                    title={name}
                    icon={<IrsBaseIcon type={`icon-${icon}`}/>}
                >
                    { subMenuList.map((childItem:any) => this.renderMenuItem({...childItem, fileLinkUrl})) }
                </IrsMenu.SubMenu>
            )
        }
        return this.renderMenuItem(item)
    }

    renderMenuItem = (item: any) => {
        const {name, key, icon, description, url, fileLinkUrl} = item;
        return <IrsMenu.Item key={key} icon={icon && <IrsBaseIcon type={`icon-${icon}`} />}>
            <Link to={{
                pathname: url, 
                search: `?key=${key}&fileLinkUrl=${fileLinkUrl}&description=${description}`
            }}>{name}</Link>
        </IrsMenu.Item>
    }

    public render() {
        const { menuList, collapsed, selectedKeys, openKeys } = this.state;
        return (
            <IrsLayout.Sider
                width="179"
                trigger={null}
                collapsible={true}
                collapsed={collapsed}
                collapsedWidth={47}
                className='left-sider'
            >
                <div className='left-sider-header'>
                    <img src={require(`../assets/images/${!collapsed ? 'logo2' : 'logo'}.png`)} />
                </div>

                <div className='left-sider-content'>
                    <IrsMenu
                        theme="dark"
                        mode="inline"
                        inlineCollapsed={collapsed}
                        onSelect={this.onSelect}
                        onOpenChange={this.onOpenChange}
                        openKeys={openKeys}
                        selectedKeys={selectedKeys}
                    >
                        {menuList.map(this.renderMenuItems)}
                    </IrsMenu>
                </div>
                
                <div className='left-sider-footer' onClick={this.toggleCollapsed}>
                    <IrsBaseIcon type={!collapsed ? "icon-outdent" : "icon-indent"} />
                </div>
            </IrsLayout.Sider>
        )
    }
}