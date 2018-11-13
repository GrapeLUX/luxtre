// @flow
import Action from '../lib/Action';

export type WalletExportToFileParams = {
  walletId: string,
  exportType: string,
  filePath: string,
  password: ?string
};

export default class WalletSettingsActions {
  cancelEditingWalletField: Action<any> = new Action();
  startEditingWalletField: Action<{ field: string }> = new Action();
  stopEditingWalletField: Action<any> = new Action();
  updateWalletField: Action<{ field: string, value: string }> = new Action();
  // eslint-disable-next-line max-len
  updateWalletPassword: Action<{ walletId: string, oldPassword: ?string, newPassword: ?string }> = new Action();
  exportToFile: Action<WalletExportToFileParams> = new Action();
  unlockWallet: Action<{ password: ?string }> = new Action();
  lockWallet: Action<any> = new Action();
  importPrivateKey: Action<{ privateKey: ?string }> = new Action();
}
