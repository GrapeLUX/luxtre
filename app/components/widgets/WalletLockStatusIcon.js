import React, { Component } from 'react';
import { defineMessages, intlShape } from 'react-intl';
import classNames from 'classnames';
import lockedBlackIcon from '../../assets/images/top-bar/wallet-locked.png';
import lockedWhiteIcon from '../../assets/images/top-bar/wallet-locked-white.png';
import styles from './WalletLockStatusIcon.scss';
import { THEMES } from '../../themes/index';

const messages = defineMessages({
  walletLocked: {
    id: 'wallet.locked',
    defaultMessage: '!!!Wallet encrypted and currently locked',
    description: 'Label for the wallet encrypted info overlay on wallet lock status icon.'
  },
  walletUnlocked: {
    id: 'wallet.unlocked',
    defaultMessage: '!!!Wallet encrypted and currently unlocked',
    description: 'Label for the wallet encrypted info overlay on wallet lock status icon.'
  },
});

type Props = {
  isLocked: boolean,
  currentTheme: string
};

export default class WalletLockStatusIcon extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired
  };

  render() {
    const { intl } = this.context;
    const { isLocked, currentTheme } = this.props;
    const componentClasses = classNames([
      styles.component,
      isLocked ? styles.locked : styles.unlocked,
    ]);
    return (
      <div className={componentClasses}>
        <img 
          className={styles.icon} 
          src={currentTheme == THEMES.DARK_BLUE ? lockedWhiteIcon : lockedBlackIcon} 
          role="presentation" 
        />
        <div className={styles.info}>
          {isLocked ? intl.formatMessage(messages.walletLocked) : intl.formatMessage(messages.walletUnlocked)}
        </div>
      </div>
    );
  }
}
