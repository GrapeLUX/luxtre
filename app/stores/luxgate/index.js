// @flow
import { observable, action } from 'mobx';
import LuxgateLoginInfoStore from './LuxgateLoginInfoStore';
import LuxgateSettingInfoStore from './LuxgateSettingInfoStore';
import LuxgateCoinInfoStore from './LuxgateCoinInfoStore';
import LuxgateMarketInfoStore from './LuxgateMarketInfoStore';
import LuxgateTransactionsStore from './LuxgateTransactionsStore';
import LuxgateLoggerStore from './LuxgateLoggerStore';

export const luxgateStoreClasses = {
  loginInfo: LuxgateLoginInfoStore,
  settingInfo: LuxgateSettingInfoStore,
  coinInfo: LuxgateCoinInfoStore,
  marketInfo: LuxgateMarketInfoStore,
  transactions: LuxgateTransactionsStore,
  loggerInfo: LuxgateLoggerStore
};

export type LuxgateStoresMap = {
  loginInfo: LuxgateLoginInfoStore,
  settingInfo: LuxgateSettingInfoStore,
  coinInfo: LuxgateCoinInfoStore,
  marketInfo: LuxgateMarketInfoStore,
  transactions: LuxgateTransactionsStore,
  loggerInfo: LuxgateLoggerStore
};

const luxgateStores = observable({
  loginInfo: null,
  settingInfo: null,
  coinInfo: null,
  marketInfo: null,
  transactions: null,
  loggerInfo: null
});

// Set up and return the stores and reset all stores to defaults
export default action(
  (stores, api, actions): LuxgateStoresMap => {
    const storeNames = Object.keys(luxgateStoreClasses);
    storeNames.forEach(name => {
      if (luxgateStores[name]) luxgateStores[name].teardown();
    });
    storeNames.forEach(name => {
      luxgateStores[name] = new luxgateStoreClasses[name](stores, api, actions);
    });
    storeNames.forEach(name => {
      if (luxgateStores[name]) luxgateStores[name].initialize();
    });
    return luxgateStores;
  }
);
