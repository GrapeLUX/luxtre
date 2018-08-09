import { split, get } from 'lodash';
import { action } from 'mobx';
import environment from '../../environment';
import { getLuxgateCoinInfo } from './getLuxgateCoinInfo';
import { getLuxgateOrders } from './getLuxgateOrders';
import { getLuxgateTransactions } from './getLuxgateTransactions';
import { getLuxgateCoinBalanceFromAddress } from './getLuxgateCoinBalanceFromAddress';
import { swapLuxgateCoin } from './swapLuxgateCoin';
import { sendLuxgateCoin } from './sendLuxgateCoin';
import { getLuxgateTradeArray } from './getLuxgateTradeArray';
import { getLuxgatePriceArray } from './getLuxgatePriceArray';
import { getLuxgateAccountNewPhrase } from './getLuxgateAccountNewPhrase';
import { getLuxgatePassword } from './getLuxgatePassword';
import { setLuxgateDisableWallet } from './setLuxgateDisableWallet';
import { setLuxgateLocalWallet } from './setLuxgateLocalWallet';
import { setLuxgateRemoteWallet } from './setLuxgateRemoteWallet';
import { getLuxgateCoinPrice } from './getLuxgateCoinPrice';

export const LUXGATE_API_HOST = 'localhost';
export const LUXGATE_API_PORT = 9883;

import { Logger, stringifyData, stringifyError } from '../../utils/logging';

import {
  GenericApiError,
  IncorrectWalletPasswordError,
  WalletAlreadyRestoredError
} from '../common';

import { ELECTRUM_PORT, ELECTRUM_ADDRESS } from '../common';
import type {
  GetCoinInfoResponse,
  GetCoinBalanceResponse,
  SwapCoinResponse,
  SendCoinResponse,
  GetLGOrdersResponse,
  GetLGTransactionsResponse,
  GetLGTradeArrayResponse,
  GetLGPriceArrayResponse,
  GetPasswordInfoResponse,
  GetAccountNewPhraseResponse,
  SetCoinSettingResponse,
  GetCoinPriceResponse
} from '../common';

export type SendCoinRequest = {
  coin: string,
  address: string,
  amount: number,
  password: string
};

export type SwapCoinRequest = {
  buy_coin: string,
  sell_coin: string,
  amount: number,
  value: number,
  password: string
};

import type { LuxgateAccountNewPhraseResponse } from './types';

export default class LuxApi {
  constructor() {
    if (environment.isTest()) {
    }
  }

  async getCoinBalanace(
    password: string,
    coin: string,
    address: string
  ): Promise<GetCoinBalanceResponse> {
    Logger.debug('LuxgateApi::getCoinBalanace called');
    try {
      const response = await getLuxgateCoinBalanceFromAddress({ coin, password, address });
      if (response !== undefined && response.result === 'success') {
        return response.balance;
      }
      return 0;
    } catch (error) {
      Logger.error('LuxgateApi::getCoinBalanace error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async getCoinInfo(password: string, coin: string): Promise<GetCoinInfoResponse> {
    Logger.debug('LuxgateApi::getCoinInfo called');
    try {
      const response = await getLuxgateCoinInfo({ coin, password });
      if (response !== undefined && response.result === 'success') {
        return response.coin;
      }
      return null;
    } catch (error) {
      Logger.error('LuxgateApi::getCoinInfo error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async sendCoin(request: SendCoinRequest): Promise<SendCoinResponse> {
    Logger.debug('LuxgateApi::sendCoin called');
    const { coin, receiver, amount, password } = request;
    try {
      const response = await sendLuxgateCoin({ coin, receiver, amount, password });
      if (response !== undefined && response.result === 'success') return true;
      return false;
    } catch (error) {
      Logger.error('LuxgateApi::sendCoin error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async swapCoin(request: SwapCoinRequest): Promise<SwapCoinResponse> {
    Logger.debug('LuxgateApi::swapCoin called');
    const { buy_coin, sell_coin, amount, value, password } = request;
    try {
      const response = await swapLuxgateCoin({ buy_coin, sell_coin, amount, value, password });
      if (response !== undefined && response.result === 'success') return true;
      return false;
    } catch (error) {
      Logger.error('LuxgateApi::swapCoin error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async getLGOrders(password: string, base: string, rel: string): Promise<GetLGOrdersResponse> {
    Logger.debug('LuxgateApi::getLGOrders called');
    try {
      const response = await getLuxgateOrders({ password, base, rel });
      if (response !== undefined) {
        return response;
      }
      return '';
    } catch (error) {
      Logger.error('LuxgateApi::getLGOrders error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async getLGTransactions(
    password: string,
    coin: string,
    address: string
  ): Promise<GetLGTransactionsResponse> {
    Logger.debug('LuxgateApi::getLGTransactions called');
    try {
      const response = await getLuxgateTransactions({ password, coin, address });
      if (response !== undefined && !response.error) {
        return stringifyData(response);
      }
      return '';
    } catch (error) {
      Logger.error('LuxgateApi::getLGTransactions error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }
  async getLGTradeArray(
    password: string,
    base: string,
    rel: string
  ): Promise<GetLGTradeArrayResponse> {
    Logger.debug('LuxgateApi::getLGTradeArray called');
    try {
      const scale = 60;
      const response = await getLuxgateTradeArray({ password, base, rel, scale });
      if (response !== undefined) {
        return stringifyData(response);
      }
      return '';
    } catch (error) {
      Logger.error('LuxgateApi::getLGTradeArray error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async getLGPriceArray(
    password: string,
    base: string,
    rel: string
  ): Promise<GetLGPriceArrayResponse> {
    Logger.debug('LuxgateApi::getLGPriceArray called');
    try {
      const scale = 60;
      const response = await getLuxgatePriceArray({ password, base, rel, scale });
      if (response !== undefined) {
        return stringifyData(response);
      }
      return '';
    } catch (error) {
      Logger.error('LuxgateApi::getLGPriceArray error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async getPasswordInfo(password: string, passphrase: string): Promise<GetPasswordInfoResponse> {
    Logger.debug('LuxgateApi::getPasswordInfo called');
    try {
      const response = await getLuxgatePassword({ passphrase, password });
      if (response !== undefined && response.result === 'success') {
        return stringifyData(response);
      }
      return '';
    } catch (error) {
      Logger.error('LuxgateApi::getPasswordInfo error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async setCoinSetting(
    password: string,
    coin: string,
    active: string,
    local: boolean,
    ipaddr: string,
    port: number
  ): Promise<SetCoinSettingResponse> {
    Logger.debug('LuxgateApi::setCoinSetting called');
    try {
      let response;
      if (active == 'active') {
        if (local) response = await setLuxgateLocalWallet({ password, coin });
        else response = await setLuxgateRemoteWallet({ password, coin, ipaddr, port });
      } else {
        response = await setLuxgateDisableWallet({ password, coin });
      }

      if (response !== undefined) {
        return stringifyData(response);
      }
      return '';
    } catch (error) {
      Logger.error('LuxgateApi::setCoinSetting error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  getAccountNewPhrase(): Promise<GetAccountNewPhraseResponse> {
    Logger.debug('LuxgateApi::getAccountNewPhrase called');
    try {
      const response: Promise<LuxgateAccountNewPhraseResponse> = new Promise(resolve =>
        resolve(getLuxgateAccountNewPhrase())
      );
      Logger.debug('LuxgateApi::getAccountNewPhrase success');
      return response;
    } catch (error) {
      Logger.error('LuxgateApi::getAccountNewPhrase error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async getCoinPrice(password: string, base: string, rel: string): Promise<GetCoinPriceResponse> {
    Logger.debug('LuxgateApi::getCoinPrice called');
    try {
      let response = await getLuxgateCoinPrice({ password, base, rel });
      if (response !== undefined && response.result === 'success') {
        return response.price;
      }
      const ipaddr = ELECTRUM_ADDRESS;
      const port = ELECTRUM_PORT;
      let coin = base;
      if (coin == 'BTC') {
        await setLuxgateRemoteWallet({ password, coin, ipaddr, port });
      } else {
        await setLuxgateLocalWallet({ password, coin });
      }
      coin = rel;
      if (coin == 'BTC') {
        await setLuxgateRemoteWallet({ password, coin, ipaddr, port });
      } else {
        await setLuxgateLocalWallet({ password, coin });
      }
      let response = await getLuxgateCoinPrice({ password, base, rel });
      if (response !== undefined && response.result === 'success') {
        return response.price;
      }
      return 0;
    } catch (error) {
      Logger.error('LuxgateApi::getCoinPrice error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }
}
