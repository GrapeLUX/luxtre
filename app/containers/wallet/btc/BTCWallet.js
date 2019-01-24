// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import MainLayout from '../../MainLayout';
import TopBarContainer from '../../TopBarContainer';
import BTCWalletWithNavigation from '../../../components/wallet/btc/layouts/BTCWalletWithNavigation';
import LoadingSpinner from '../../../components/widgets/LoadingSpinner';
import { buildRoute } from '../../../utils/routing';
import { ROUTES } from '../../../routes-config';
import type { InjectedContainerProps } from '../../../types/injectedPropsType';
import { DECIMAL_SPLACES_IN_LUX } from '../../../config/numbersConfig';

type Props = InjectedContainerProps;

@inject('stores', 'actions')
@observer
export default class BTCWallet extends Component<Props> {
  static defaultProps = { actions: null, stores: null };

  isActiveScreen = (page: string) => {
    const { app } = this.props.stores;
    const { wallets } = this.props.stores.lux;
    if (!wallets.active) return false;
    const screenRoute = buildRoute(ROUTES.WALLETS.PAGE, { id: wallets.active.id, page });
    return app.currentRoute.indexOf(screenRoute) > -1;
  };

  handleWalletNavItemClick = (page: string) => {
    const { wallets } = this.props.stores.lux;
    if (!wallets.active) return;
    this.props.actions.router.goToRoute.trigger({
      route: ROUTES.WALLETS.PAGE,
      params: { id: wallets.active.id, page }
    });
  };

  render() {
    const { sidebar } = this.props.stores;
    const { wallets, luxRedemption } = this.props.stores.lux;
    const luxgate = this.props.stores.luxgate;
    const { coinInfo, marketInfo, loggerInfo } = luxgate;
    const { coinInfoList } = coinInfo;
    const { coinPrice, ordersData, lgPriceArrayList } = marketInfo;
    const { logbuff } = loggerInfo;
    const { uiDialogs, uiNotifications } = this.props.stores;
    const { actions } = this.props;
    const { showLuxRedemptionSuccessMessage, amountRedeemed } = luxRedemption;
    const { isShowingLuxtre } = sidebar;
    const { currentTheme } = this.props.stores.profile;

    if (!wallets.active) {
      return (
        <MainLayout>
          <LoadingSpinner />
        </MainLayout>
      );
    }

    return (
      <MainLayout>
        <BTCWalletWithNavigation
          isActiveScreen={this.isActiveScreen}
          topbar={<TopBarContainer />}
          onWalletNavItemClick={this.handleWalletNavItemClick}
          amount={wallets.active.amount.toFormat(DECIMAL_SPLACES_IN_LUX)}
          isShowingLuxtre={isShowingLuxtre}
          onSwitchLuxgate={actions.sidebar.switchLuxgate.trigger}
          currentTheme={currentTheme}
        >
          {this.props.children}
        </BTCWalletWithNavigation>
      </MainLayout>
    );
  }
}
