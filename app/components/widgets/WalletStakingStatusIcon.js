import React, { Component } from 'react';
import { defineMessages, intlShape } from 'react-intl';
import classNames from 'classnames';
import stakingBrightIcon from '../../assets/images/top-bar/wallet-staking-bright.png';
import stakingWhiteIcon from '../../assets/images/top-bar/wallet-staking.png';
import styles from './WalletStakingStatusIcon.scss';
import { THEMES } from '../../themes/index';

const messages = defineMessages({
  walletStakingActive: {
    id: 'wallet.stakingActive',
    defaultMessage: '!!!Staking is active',
    description: 'Label for the wallet staking info overlay on wallet staking status icon.'
  },
  walletStakingInactive: {
    id: 'wallet.stakingInactive',
    defaultMessage: '!!!Staking is not active',
    description: 'Label for the wallet staking info overlay on wallet staking status icon.'
  },
});

type Props = {
  isStaking: boolean,
  currentTheme: string
};

export default class WalletStakingStatusIcon extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired
  };

  render() {
    const { intl } = this.context;
    const { isStaking, currentTheme } = this.props;
    const componentClasses = classNames([
      styles.component,
      isStaking ? styles.active : styles.inactive,
    ]);
    return (
      <div className={componentClasses}>
        <img 
          className={styles.icon} 
          src={currentTheme ==  THEMES.DARK_BLUE ? stakingWhiteIcon : stakingBrightIcon} 
          role="presentation" 
        />
        <div className={styles.info}>
          {isStaking ? intl.formatMessage(messages.walletStakingActive) : intl.formatMessage(messages.walletStakingInactive)}
        </div>
      </div>
    );
  }
}
