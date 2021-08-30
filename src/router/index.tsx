import * as React from 'react';
import { withRouter } from 'react-router-dom';
import IrsLayout from 'ihr360-web-ui/packages/base/irs-layout';
import LeftSider from '../components/LeftSider';
import Header from '../components/Header';

import '../index.less';

class App extends React.Component<any, any> {
    public render() {
        return (
            <IrsLayout style={{ padding: '0 0', display: 'flex', flexDirection: 'row' }}>
                <LeftSider />
                <IrsLayout className='webui-template-layout'>
                    <Header />
                    <IrsLayout.Content className='webui-template-content'>
                        {this.props.children}
                    </IrsLayout.Content>
                </IrsLayout>
            </IrsLayout>
        );
    }
}

export default withRouter(App);
