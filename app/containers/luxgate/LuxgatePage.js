// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import MainLayout from '../MainLayout';
import TopBarContainer from '../TopBarContainer';
import WalletWithNavigation from '../../components/wallet/layouts/WalletWithNavigation';
import ExchangePage from '../../components/exchange/ExchangePage';
import LoadingSpinner from '../../components/widgets/LoadingSpinner';
import LuxRedemptionSuccessOverlay from '../../components/wallet/lux-redemption/LuxRedemptionSuccessOverlay';
import { buildRoute } from '../../utils/routing';
import { ROUTES } from '../../routes-config';
import type { InjectedContainerProps } from '../../types/injectedPropsType';
import { DECIMAL_SPLACES_IN_LUX } from '../../config/numbersConfig';

type Props = InjectedContainerProps;

@inject('stores', 'actions')
@observer
export default class Wallet extends Component<Props> {
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
    const luxgate = this.props.stores.luxgate;
    const { coinInfo, marketInfo, loggerInfo } = luxgate;
    const { coinInfoList } = coinInfo;
    const { coinPrice, ordersData, lgPriceArrayList } = marketInfo;
    const { logbuff } = loggerInfo;
    const { uiDialogs, uiNotifications } = this.props.stores;
    const { actions } = this.props;

    return (
      <MainLayout>
        <ExchangePage
          coinPrice={coinPrice}
          ordersData={ordersData}
          lgPriceArrayList={lgPriceArrayList}
          coinInfoList={coinInfoList}
          logbuff={logbuff}
          openDialogAction={actions.dialogs.open.trigger}
          isDialogOpen={uiDialogs.isOpen}
          onSwitchLuxgate={actions.sidebar.switchLuxgate.trigger}
          onChangeCoin={(coin: string, coin_num: number) => {
            const coinData = {
              coin,
              coin_num
            };
            actions.luxgate.coinInfo.getCoinInfo.trigger(coinData);
          }}
          onSwapCoin={(buy_coin: string, sell_coin: string, amount: number, value: number) => {
            const swapData = {
              buy_coin,
              sell_coin,
              amount,
              value
            };
            actions.luxgate.coinInfo.swapCoin.trigger(swapData);
          }}
        >
          {/* code Exchange UI here */}
        </ExchangePage>
      </MainLayout>
    );
  }
}
