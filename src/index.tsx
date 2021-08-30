/**
 * @author Mike.Cai
 * @time 2018/05/05.
 */

import React, { Suspense } from 'react';
import 'intl';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AppRoute from './router/index';
import 'url-search-params-polyfill';//处理URLSearchParams的兼容性
import IrsLoading from 'ihr360-web-ui/packages/loading/irs-loading';

import "./assets/less/common.less";
import 'ihr360-web-ui/packages/theme/index.less'

const Wizard = React.lazy(() => import('./pages/wizard'));

const WorkListA = React.lazy(() => import('./pages/workList/workListA'));
const WorkListB = React.lazy(() => import('./pages/workList/workListB'));
const WorkListC = React.lazy(() => import('./pages/workList/workListC'));
const WorkListD = React.lazy(() => import('./pages/workList/workListD'));
const WorkListE = React.lazy(() => import('./pages/workList/workListE'));

const ListReportA = React.lazy(() => import('./pages/listReport/listReportA'));
const ListReportB = React.lazy(() => import('./pages/listReport/listReportB'));
const ListReportC = React.lazy(() => import('./pages/listReport/listReportC'));

const ObjectPageA = React.lazy(() => import('./pages/objectPage/objectPageA'));
const ObjectPageB = React.lazy(() => import('./pages/objectPage/objectPageB'));
const ObjectPageC = React.lazy(() => import('./pages/objectPage/objectPageC'));
const ObjectPageD = React.lazy(() => import('./pages/objectPage/objectPageD'));
const ObjectPageE = React.lazy(() => import('./pages/objectPage/objectPageE'));
const ObjectPageF = React.lazy(() => import('./pages/objectPage/objectPageF'));
const ObjectPageG = React.lazy(() => import('./pages/objectPage/objectPageG'));


ReactDOM.render(
    (
        <HashRouter>
            <AppRoute>
                <Suspense fallback={<IrsLoading spinning={true} className='root-loading' delay={500} />}>
                    <Switch>
                        <Route path="/wizard" component={Wizard} />
                        <Route path="/workListA" component={WorkListA} />
                        <Route path="/workListB" component={WorkListB} />
                        <Route path="/workListC" component={WorkListC} />
                        <Route path="/workListD" component={WorkListD} />
                        <Route path="/workListE" component={WorkListE} />
                        <Route path="/listReportA" component={ListReportA} />
                        <Route path="/listReportB" component={ListReportB} />
                        <Route path="/listReportC" component={ListReportC} />
                        <Route path="/objectPageA" component={ObjectPageA} />
                        <Route path="/objectPageB" component={ObjectPageB} />
                        <Route path="/objectPageC" component={ObjectPageC} />
                        <Route path="/objectPageD" component={ObjectPageD} />
                        <Route path="/objectPageE" component={ObjectPageE} />
                        <Route path="/objectPageF" component={ObjectPageF} />
                        <Route path="/objectPageG" component={ObjectPageG} />
                    </Switch>
                </Suspense>
            </AppRoute>
        </HashRouter>
    ),
    document.getElementById('root')
);
