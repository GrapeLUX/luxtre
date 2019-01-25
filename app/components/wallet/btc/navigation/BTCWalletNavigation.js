// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import styles from './BTCWalletNavigation.scss';
import BTCWalletNavButton from './BTCWalletNavButton';
import LuxLogo from '../../../Logo/LuxLogo';
import btcicon from '../../../../assets/images/btc-logo.inline.svg';
import summaryWhiteIcon from '../../../../assets/images/wallet-nav/summary-ic.inline.svg';
import summaryBlackIcon from '../../../../assets/images/wallet-nav/summary-ic-black.inline.svg';
import sendWhiteIcon from '../../../../assets/images/wallet-nav/send-ic.inline.svg';
import sendBlackIcon from '../../../../assets/images/wallet-nav/send-ic-black.inline.svg';
import receiveWhiteIcon from '../../../../assets/images/wallet-nav/receive-ic.inline.svg';
import receiveBlackIcon from '../../../../assets/images/wallet-nav/receive-ic-black.inline.svg';
import transactionsWhiteIcon from '../../../../assets/images/wallet-nav/transactions-ic.inline.svg';
import transactionsBlackIcon from '../../../../assets/images/wallet-nav/transactions-ic-black.inline.svg';
import settingsWhiteIcon from '../../../../assets/images/wallet-nav/wallet-settings-ic.inline.svg';
import settingsBlackIcon from '../../../../assets/images/wallet-nav/wallet-settings-ic-black.inline.svg';
import { THEMES } from '../../../../themes/index';
import 'font-awesome/css/font-awesome.min.css'

const messages = defineMessages({
  summary: {
    id: 'wallet.navigation.summary',
    defaultMessage: '!!!Overview',
    description: 'Label for the "Summary" nav button in the wallet navigation.'
  },
  send: {
    id: 'wallet.navigation.send',
    defaultMessage: '!!!Send',
    description: 'Label for the "Send" nav button in the wallet navigation.'
  },
  receive: {
    id: 'wallet.navigation.receive',
    defaultMessage: '!!!Receive',
    description: 'Label for the "Receive" nav button in the wallet navigation.'
  },
  transactions: {
    id: 'wallet.navigation.transactions',
    defaultMessage: '!!!Transactions',
    description: 'Label for the "Transactions" nav button in the wallet navigation.'
  },
  settings: {
    id: 'wallet.navigation.settings',
    defaultMessage: '!!!Settings',
    description: 'Label for the "Settings" nav button in the wallet navigation.'
  }
});

type Props = {
  isActiveNavItem: Function,
  onNavItemClick: Function,
  amount: string,
  isShowingLuxtre: boolean,
  onSwitchLuxgate: Function,
  currentTheme: string
};

@observer
export default class BTCWalletNavigation extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { isActiveNavItem, onNavItemClick, amount, isShowingLuxtre, onSwitchLuxgate, currentTheme} = this.props;
    const { intl } = this.context;
    const socialIconStyle = {
      fontSize:18, 
      color:'rgb(86, 115, 156)',
      marginRight: 8
    };
    return (
      <div className={styles.component}>
        <div>
          <LuxLogo 
             amount={amount}
             isShowingLuxtre = {isShowingLuxtre}
             onSwitchLuxgate = {onSwitchLuxgate}
             logoIcon = {btcicon}
             logo = {'BITCOIN'}
 	        />
        </div>
        <div className={styles.navItem}>
          <BTCWalletNavButton
            className="summary"
            label={intl.formatMessage(messages.summary)}
            icon={currentTheme==THEMES.LIGHT_BLUE ? summaryBlackIcon : summaryWhiteIcon}
            isActive={isActiveNavItem('summary')}
            onClick={() => onNavItemClick('summary')}
          />
        </div>

        <div className={styles.navItem}>
          <BTCWalletNavButton
            className="send"
            label={intl.formatMessage(messages.send)}
            icon={currentTheme==THEMES.LIGHT_BLUE ? sendBlackIcon : sendWhiteIcon}
            isActive={isActiveNavItem('send')}
            onClick={() => onNavItemClick('send')}
          />
        </div>

        <div className={styles.navItem}>
          <BTCWalletNavButton
            className="receive"
            label={intl.formatMessage(messages.receive)}
            icon={currentTheme==THEMES.LIGHT_BLUE ? receiveBlackIcon : receiveWhiteIcon}
            isActive={isActiveNavItem('receive')}
            onClick={() => onNavItemClick('receive')}
          />
        </div>

        <div className={styles.navItem}>
          <BTCWalletNavButton
            label={intl.formatMessage(messages.transactions)}
            icon={currentTheme==THEMES.LIGHT_BLUE ? transactionsBlackIcon : transactionsWhiteIcon}
            isActive={isActiveNavItem('transactions')}
            onClick={() => onNavItemClick('transactions')}
          />
        </div>

        <div className={styles.navItem}>
          <BTCWalletNavButton
            label={intl.formatMessage(messages.settings)}
            icon={currentTheme==THEMES.LIGHT_BLUE ? settingsBlackIcon : settingsWhiteIcon}
            isActive={isActiveNavItem('settings')}
            onClick={() => onNavItemClick('settings')}
          />
        </div>
      </div>
    );
  }
}
