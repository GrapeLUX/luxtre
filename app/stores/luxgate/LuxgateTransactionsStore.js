// @flow
import { observable, computed, action, runInAction } from 'mobx';
import BigNumber from 'bignumber.js';
import Store from '../lib/Store';
import LGTransactions from '../../domain/LGTransactions';
import LGOpenOrders from '../../domain/LGOpenOrders';
import Request from '.././lib/LocalizedRequest';

import type { GetLGTransactionsResponse } from '../../api/common';
import type { GetLGOpenOrdersResponse } from '../../api/common';

import type { LGOpenOrder } from '../../domain/LGOpenOrders';

export default class LuxgateTransactionsStore extends Store {
  LGTRANSACTIONS_REFRESH_INTERVAL = 10000;
  LGOPENORDERS_REFRESH_INTERVAL = 5000;

  // REQUESTS
  @observable
  getLGTransactionsRequest: Request<GetLGTransactionsResponse> = new Request(
    this.api.luxgate.getLGTransactions
  );

  @observable
  getLGOpenOrdersRequest: Request<GetLGOpenOrdersResponse> = new Request(
    this.api.luxgate.getLGOpenOrders
  );

  @observable
  lstLGTransactions: Array<LGTransactions> = [];
  @observable
  LGOpenOrders: Array<LGOpenOrder> = [];

  setup() {
    super.setup();

    const { router, luxgate } = this.actions;
    const { transactions } = luxgate;
    transactions.getLGTransactions.listen(this._getLGTransactions);
    transactions.getLGOpenOrders.listen(this._getLGOpenOrders);

    //  setInterval(this._pollRefresh, this.LGTRANSACTIONS_REFRESH_INTERVAL);
    //  setInterval(this._pollRefresh, this.LGOPENORDERS_REFRESH_INTERVAL);

    // coininfo.getcoinarray.listen(this._createMasternode);
    // coininfo.getbalanacefromaddress
    // router.goToRoute.listen(this._onRouteChange);
  }

  _getLGTransactions = async (coin: string) => {
    const password = this.stores.luxgate.loginInfo.password;
    if (password == '') return;

    const info: GetLGTransactionsResponse = await this.getLGTransactionsRequest.execute(
      password,
      coin
    ).promise;
    if (info !== '') {
      const objInfo = JSON.parse(info);
      const balance = objInfo.balance;
      const address = objInfo.smartaddress;
      const height = objInfo.height;
      const status = objInfo.status;
      this._addLGTransactions(new LGTransactions({ coin, balance, address, height, status }));
    } else {
      const balance = 0;
      const address = '';
      const height = -1;
      const status = 'inactive';
      this._addLGTransactions(new LGTransactions({ coin, balance, address, height, status }));
    }

    this.getLGTransactionsRequest.reset();
  };

  @action
  refreshLGTransactionsData = () => {
    if (this.stores.networkStatus.isConnected) {
    }
  };

  @computed
  get lgTransactionsList(): Array<LGTransactions> {
    return this.lstLGTransactions;
  }

  @action
  _addLGTransactions = (info: LGTransactions) => {
    for (let i = 0; i < this.lstLGTransactions.length; i++) {
      if (this.lstLGTransactions[i].coin === info.coin) {
        this.lstLGTransactions[i] = info;
        return;
      }
    }
    this.lstLGTransactions.push(info);
  };

  @action
  _removeLGTransactions = (index: number) => {
    this.lstLGTransactions.splice(index, 1);
  };

  // OpenOrders

  _getLGOpenOrders = async () => {
    const password = this.stores.luxgate.loginInfo.password;
    if (password == '') return;

    const info: GetLGOpenOrdersResponse = await this.getLGOpenOrdersRequest.execute(password)
      .promise;
    if (info !== '') {
      const openOrders = JSON.parse(info);
      this.replaceOpenOrders(new LGOpenOrders({ openOrders }));
    }

    this.getLGOpenOrdersRequest.reset();
  };

  @action
  replaceOpenOrders(info: *) {
    this.LGOpenOrders = info;
  }

  // _pollRefresh = async () => {
  //  this.stores.networkStatus.isSynced && await this.refreshLGTransactionsData()
  //  this.stores.networkStatus.isSynced && await this.refreshLGOpenOrdersData()
  // }
}
