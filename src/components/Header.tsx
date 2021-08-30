
import * as React from 'react';
import IrsTitle from 'ihr360-web-ui/packages/display/irs-title';
import IrsLink from 'ihr360-web-ui/packages/action/irs-link';
import { getQueryString } from '../util/common';

class Header extends React.Component<any, any> {
    getThirdMenuStatus = () => {
        return location.hash.indexOf('#/listReportC') > -1;
    }
    public render() {
        const description = getQueryString('description') || '';
        const fileLinkUrl = getQueryString('fileLinkUrl') || '';
        return (
            <>
                <div className='webui-template-header'>
                    {description && <div className='left'>
                        页面组成：
                        <IrsTitle level="H3" bold={true}>{description}</IrsTitle>
                    </div>}
                    {fileLinkUrl && <IrsLink 
                        underline={false} 
                        target="_blank" 
                        className='right'
                        href={`https://ihr360.yuque.com/ihr360/diazqv/${fileLinkUrl}`}
                    >
                        设计文档
                    </IrsLink>}
                </div>
                {this.getThirdMenuStatus() && <div className='webui-template-header thirdmenu-header' />}
            </>
        );
    }
}

export default Header;