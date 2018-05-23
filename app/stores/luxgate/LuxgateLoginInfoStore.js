// @flow
import { observable, computed, action, runInAction } from 'mobx';
import BigNumber from 'bignumber.js';
import Store from '../lib/Store';
import { matchRoute, buildRoute } from '../../utils/routing';
import Request from '.././lib/LocalizedRequest';
import CachedRequest from '../lib/LocalizedCachedRequest';
import { ROUTES } from '../../routes-config';

import type {
  GetAccountNewPhraseResponse, 
  GetPasswordInfoResponse, 
} from '../../api/common';

export const LUXGATE_USER = "luxgate user";
export const LUXGATE_PASSWORD = "734f9979dd69851a7957b282d777b89a038428cb2b5657d36a2db35a78993748";

export default class LuxgateLoginInfoStore extends Store {

  // REQUESTS
  @observable LuxgateLoginRequest: Request<GetCoinInfoResponse> = new Request(this.api.luxgate.getCoinInfo);
  @observable getAccountNewPhraseRequest: Request<GetAccountNewPhraseResponse> = new Request(this.api.luxgate.getAccountNewPhrase);
  @observable getPasswordInfoRequest: Request<GetPasswordInfoResponse> = new Request(this.api.luxgate.getPasswordInfo);

  @observable newPhraseWords = [];
  @observable isLogined: boolean = false;
  @observable password: string = "";
  @observable myPhrase: string = "";
  
  setup() {
    super.setup();

    const { router, luxgate } = this.actions;
    const { loginInfo } = luxgate;
    loginInfo.createNewPhrase.listen(this._createNewPhrase);
    loginInfo.loginWithPhrase.listen(this._loginWithPhrase);
    loginInfo.logoutAccount.listen(this._logoutAccount);
  }

  _createNewPhrase = async () => {
    try {
      const newPhrase: ?GetAccountNewPhraseResponse = await (
        this.getAccountNewPhraseRequest.execute().promise
      );
      if (newPhrase != null) {
        this._mapNewPhrase(newPhrase);
      }
    } catch (error) {
      throw error;
    }
  };

  @action _mapNewPhrase = (newPhrase: GetAccountNewPhraseResponse) => {
    this.newPhraseWords = newPhrase.map(word => ({ word }));
  };

  @action _loginWithPhrase = async (phrase: string) => {
    const password = LUXGATE_PASSWORD;
    this.myPhrase = phrase;
    const info: GetPasswordInfoResponse = await this.getPasswordInfoRequest.execute(password, phrase).promise;
    if(info !== "")
    {
      const objInfo = JSON.parse(info);
      if(objInfo.userpass)
      {
        this._setPassword(objInfo.userpass);
      }
    }
  };

  @action _setPassword = (pwd) => {
    this.password = pwd;
    this.isLogined = true;
  };

  @action _logoutAccount = () => {
    const password = this.password;
    const phrase = LUXGATE_USER;
    const info: GetPasswordInfoResponse = await this.getPasswordInfoRequest.execute(password, phrase).promise;
    if(info !== "")
    {
      const objInfo = JSON.parse(info);
      if(objInfo.userpass)
      {
        this._setPassword(objInfo.userpass);
      }
    }
    this.myPhrase = '';
    this.isLogined = false;
  };

}
