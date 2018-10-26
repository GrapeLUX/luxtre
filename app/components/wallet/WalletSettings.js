// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { defineMessages, intlShape } from 'react-intl';
import moment from 'moment';
import environment from '../../environment';
import LocalizableError from '../../i18n/LocalizableError';
import Button from 'react-polymorph/lib/components/Button';
import SimpleButtonSkin from 'react-polymorph/lib/skins/simple/raw/ButtonSkin';
import BorderedBox from '../widgets/BorderedBox';
import InlineEditingInput from '../widgets/forms/InlineEditingInput';
import InlineEditingDropdown from '../widgets/forms/InlineEditingDropdown';
import ReadOnlyInput from '../widgets/forms/ReadOnlyInput';
import RenameWalletButton from './settings/RenameWalletButton';
import RenameWalletConfirmationDialog from './settings/RenameWalletConfirmationDialog';
import RenameWalletDialogContainer from '../../containers/wallet/dialogs/RenameWalletDialogContainer';
import WalletExportDialog from './settings/export-to-file/WalletExportToFileDialog';
import WalletExportToFileDialogContainer from '../../containers/wallet/settings/WalletExportToFileDialogContainer';
import WalletUnlockDialog from '../../components/wallet/WalletUnlockDialog';
import WalletUnlockDialogContainer from '../../containers/wallet/dialogs/WalletUnlockDialogContainer';
import ImportPrivateKeyDialog from '../../components/wallet/ImportPrivateKeyDialog';
import ImportPrivateKeyDialogContainer from '../../containers/wallet/dialogs/ImportPrivateKeyDialogContainer';
import ImportPrivateKeySuccessDialog from '../../components/wallet/ImportPrivateKeySuccessDialog';
import ImportPrivateKeySuccessDialogContainer from '../../containers/wallet/dialogs/ImportPrivateKeySuccessDialogContainer';
import ExportPrivateKeyDialog from '../../components/wallet/ExportPrivateKeyDialog';
import ExportPrivateKeyDialogContainer from '../../containers/wallet/dialogs/ExportPrivateKeyDialogContainer';
import WalletFileImportDialogContainer from '../../containers/wallet/dialogs/WalletFileImportDialogContainer';
import WalletFileImportDialog from '../../components/wallet/file-import/WalletFileImportDialog';
/* eslint-disable max-len */
// import ExportPaperWalletPrinterCopyDialog from './settings/paper-wallet-export-dialogs/ExportPaperWalletPrinterCopyDialog';
// import ExportPaperWalletPrinterCopyDialogContainer from '../../containers/wallet/dialogs/paper-wallet-export/ExportPaperWalletPrinterCopyDialogContainer';
// import ExportPaperWalletMnemonicDialog from './settings/paper-wallet-export-dialogs/ExportPaperWalletMnemonicDialog';
// import ExportPaperWalletMnemonicDialogContainer from '../../containers/wallet/dialogs/paper-wallet-export/ExportPaperWalletMnemonicDialogContainer';
// import ExportPaperWalletMnemonicVerificationDialog from './settings/paper-wallet-export-dialogs/ExportPaperWalletMnemonicVerificationDialog';
// import ExportPaperWalletMnemonicVerificationDialogContainer from '../../containers/wallet/dialogs/paper-wallet-export/ExportPaperWalletMnemonicVerificationDialogContainer';
// import ExportPaperWalletCertificateDialog from './settings/paper-wallet-export-dialogs/ExportPaperWalletCertificateDialog';
// import ExportPaperWalletCertificateDialogContainer from '../../containers/wallet/dialogs/paper-wallet-export/ExportPaperWalletCertificateDialogContainer';
/* eslint-disable max-len */
import type { ReactIntlMessage } from '../../types/i18nTypes';
import ChangeWalletPasswordDialog from './settings/ChangeWalletPasswordDialog';
import ChangeWalletPasswordDialogContainer from '../../containers/wallet/dialogs/ChangeWalletPasswordDialogContainer';
import globalMessages from '../../i18n/global-messages';
import styles from './WalletSettings.scss';

export const messages = defineMessages({
  name: {
    id: 'wallet.settings.name.label',
    defaultMessage: '!!!Name',
    description: 'Label for the "Name" text input on the wallet settings page.',
  },
  assuranceLevelLabel: {
    id: 'wallet.settings.assurance',
    defaultMessage: '!!!Transaction assurance security level',
    description: 'Label for the "Transaction assurance security level" dropdown.',
  },
  passwordLabel: {
    id: 'wallet.settings.password',
    defaultMessage: '!!!Password',
    description: 'Label for the "Password" field.',
  },
  passwordLastUpdated: {
    id: 'wallet.settings.passwordLastUpdated',
    defaultMessage: '!!!Last updated',
    description: 'Last updated X time ago message.',
  },
  passwordNotSet: {
    id: 'wallet.settings.passwordNotSet',
    defaultMessage: '!!!You still don\'t have password',
    description: 'You still don\'t have password set message.',
  },
  exportButtonLabel: {
    id: 'wallet.settings.exportWalletButtonLabel',
    defaultMessage: '!!!Export wallet',
    description: 'Label for the export button on wallet settings.',
  },
  unlockButtonLabel: {
    id: 'wallet.settings.unlockWallet',
    defaultMessage: '!!!Unlock',
    description: 'Label for the unlock button on wallet settings.'
  },
  lockButtonLabel: {
    id: 'wallet.settings.lockWallet',
    defaultMessage: '!!!Lock',
    description: 'Label for the lock button on wallet settings.'
  },
});

type Props = {
  assuranceLevels: Array<{ value: string, label: ReactIntlMessage }>,
  walletName: string,
  walletAssurance: string,
  isWalletPasswordSet: boolean,
  isWalletLocked: boolean,
  walletPasswordUpdateDate: ?Date,
  error?: ?LocalizableError,
  openDialogAction: Function,
  isDialogOpen: Function,
  onFieldValueChange: Function,
  onStartEditing: Function,
  onStopEditing: Function,
  onCancelEditing: Function,
  onUnlockWallet: Function,
  onLockWallet: Function,
  onExportPrivateKey: Function,
  onImportPrivateKey: Function,
  nameValidator: Function,
  activeField: ?string,
  isSubmitting: boolean,
  isInvalid: boolean,
  lastUpdatedField: ?string,
};

@observer
export default class WalletSettings extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  state = {
    actionType: ''
  };

  componentWillUnmount() {
    // This call is used to prevent display of old successfully-updated messages
    this.props.onCancelEditing();
  }

  render() {
    const { intl } = this.context;
    const {
      assuranceLevels, walletAssurance,
      walletName, isWalletPasswordSet,
      walletPasswordUpdateDate, error,
      openDialogAction, isDialogOpen,
      onFieldValueChange, onStartEditing,
      onStopEditing, onCancelEditing, 
      nameValidator, activeField,
      isSubmitting, isInvalid,
      lastUpdatedField,isWalletLocked,
      onUnlockWallet, onLockWallet,
      onExportPrivateKey, onImportPrivateKey
    } = this.props;

    const assuranceLevelOptions = assuranceLevels.map(assurance => ({
      value: assurance.value,
      label: intl.formatMessage(assurance.label),
    }));

    const passwordMessage = isWalletPasswordSet ? (
      intl.formatMessage(messages.passwordLastUpdated, {
        lastUpdated: moment(walletPasswordUpdateDate).fromNow(),
      })
    ) : intl.formatMessage(messages.passwordNotSet);

    const buttonClasses = classnames([
      'primary',
      styles.nextButton,
    ]);

    const exportButtonClasses = classnames([
      'primary',
      'exportButton',
      styles.button,
      isSubmitting ? styles.submitButtonSpinning : null,
    ]);

    const importButtonClasses = classnames([
      'flat',
      'importButton',
      styles.button,
      isSubmitting ? styles.submitButtonSpinning : null,
    ]);

    return (
      <div className={styles.component}>
        <BorderedBox>
          <ReadOnlyInput
            label={intl.formatMessage(messages.passwordLabel)}
            value={passwordMessage}
            isSet={isWalletPasswordSet}
            onClick={() => openDialogAction({
              dialog: ChangeWalletPasswordDialog,
            })}
          />

          {/*
            <div className={styles.export}>
              <h2>Export</h2>
              <p>
                Use your wallet on multiple devices
                or give read-only copies to friends.
              </p>
              <button
                className={styles.export_link}
                onClick={() => openDialogAction({
                  dialog: WalletExportDialog
                })}
              >
                {intl.formatMessage(messages.exportButtonLabel)}
              </button>
            </div>
          */}

          {isWalletPasswordSet ? 
              <Button
                className={buttonClasses}
                label={isWalletLocked ? intl.formatMessage(messages.unlockButtonLabel) : intl.formatMessage(messages.lockButtonLabel)}
                onMouseUp={() => {
                  if(isWalletLocked){
                    this.setState({ actionType: 'unlock' });  
                    openDialogAction({dialog: WalletUnlockDialog});
                  }
                  else
                    onLockWallet();
                }}
                skin={<SimpleButtonSkin />}
              />
            :
            null
          }
          
          
        </BorderedBox>

        <BorderedBox>
          <div className={styles.export}>
            <h2>Export / Import Private Key</h2>
          </div>
          
          <div className={styles.actionButtons}>
            <Button
              className={exportButtonClasses}
              label='Export'
              onMouseUp={() => {
                if(isWalletLocked){
                  this.setState({ actionType: 'exportPrivateKey' });
                  openDialogAction({dialog: WalletUnlockDialog});
                }
                else{
                  openDialogAction({dialog: ExportPrivateKeyDialog});
                }
                  
              }}
              skin={<SimpleButtonSkin />}
            />

            <Button
              className={importButtonClasses}
              label="Import"
              onMouseUp={() => {
                if(isWalletLocked){
                  this.setState({ actionType: 'importPrivateKey' });
                  openDialogAction({dialog: WalletUnlockDialog});
                }
                else{
                  openDialogAction({dialog: ImportPrivateKeyDialog});
                }
              }}
              skin={<SimpleButtonSkin />}
            />
          </div>
        </BorderedBox>

        <BorderedBox>
          <div className={styles.export}>
            <h2>Backup / Restore Wallet</h2>
          </div>
          
          <div className={styles.actionButtons}>
            <Button
              className={exportButtonClasses}
              label='Backup'
              onMouseUp={() => {
                openDialogAction({dialog: WalletExportDialog});
              }}
              skin={<SimpleButtonSkin />}
            />

            <Button
              className={importButtonClasses}
              label="Restore"
              onMouseUp={() => {
                if(isWalletLocked){
                  this.setState({ actionType: 'importWallet' });
                  openDialogAction({dialog: WalletUnlockDialog});
                }
                else{
                  openDialogAction({dialog: WalletFileImportDialog});
                }
              }}
              skin={<SimpleButtonSkin />}
            />
          </div>
        </BorderedBox>

        {isDialogOpen(WalletFileImportDialog) ? (
          <WalletFileImportDialogContainer />
        ) : null}

        {isDialogOpen(ChangeWalletPasswordDialog) ? (
          <ChangeWalletPasswordDialogContainer />
        ) : null}

        {isDialogOpen(RenameWalletConfirmationDialog) ? (
          <RenameWalletDialogContainer />
        ) : null}

        {isDialogOpen(WalletExportDialog) ? (
          <WalletExportToFileDialogContainer />
        ) : null}

        {isDialogOpen(WalletUnlockDialog) ? (
          <WalletUnlockDialogContainer
            actionType = {this.state.actionType}
            error = {error}
            unlockWallet = {(password) => (
              onUnlockWallet(password)
            )}

            exportPrivateKey = { (password) => {
              onUnlockWallet(password);
              // if(!isWalletLocked) {
              //   openDialogAction({dialog: ExportPrivateKeyDialog});
              // }
            }}

            importPrivateKey = {(password) => (
              onUnlockWallet(password)
              // openDialogAction({dialog: ImportPrivateKeyDialog})
            )}

            importWallet = {(password) => (
              onUnlockWallet(password)
              // openDialogAction({dialog: ImportPrivateKeyDialog})
            )}
          />
        ) : null}

        {isDialogOpen(ImportPrivateKeyDialog) ? (
          <ImportPrivateKeyDialogContainer
            error = {error}
            importPrivateKey = {(privateKey) => (
              onImportPrivateKey(privateKey)
            )}
          />
        ) : null}

        {isDialogOpen(ImportPrivateKeySuccessDialog) ? (
          <ImportPrivateKeySuccessDialogContainer
          />
        ) : null}

        {isDialogOpen(ExportPrivateKeyDialog) ? (
          <ExportPrivateKeyDialogContainer
            exportPrivateKey = {(publicKey) => (
              onExportPrivateKey(publicKey)
            )}
          />
        ) : null}

        {/*
          {isDialogOpen(ExportPaperWalletPrinterCopyDialog) ? (
            <ExportPaperWalletPrinterCopyDialogContainer />
          ) : null}

          {isDialogOpen(ExportPaperWalletMnemonicDialog) ? (
            <ExportPaperWalletMnemonicDialogContainer />
          ) : null}

          {isDialogOpen(ExportPaperWalletMnemonicVerificationDialog) ? (
            <ExportPaperWalletMnemonicVerificationDialogContainer />
          ) : null}

          {isDialogOpen(ExportPaperWalletCertificateDialog) ? (
            <ExportPaperWalletCertificateDialogContainer />
          ) : null}
        */}

      </div>
    );
  }

}
