// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { observer } from 'mobx-react';
import BTCWalletNavigation from '../navigation/BTCWalletNavigation';
import styles from './BTCWalletWithNavigation.scss';

type Props = {
  children?: Node,
  topbar: Node,
  isActiveScreen: Function,
  onWalletNavItemClick: Function,
  amount: string,
  isShowingLuxtre: boolean,
  onSwitchLuxgate: Function,
  currentTheme: string
};

@observer
export default class BTCWalletWithNavigation extends Component<Props> {

  render() {
    const { children, topbar, isActiveScreen, onWalletNavItemClick, amount, isShowingLuxtre, onSwitchLuxgate, currentTheme} = this.props;
   
    return (
      <div className={styles.component}>
        <div className={styles.navigation}>
          <BTCWalletNavigation
            isActiveNavItem={isActiveScreen}
            onNavItemClick={onWalletNavItemClick}
            amount={amount}
            isShowingLuxtre={isShowingLuxtre}
            onSwitchLuxgate={onSwitchLuxgate}
            currentTheme={currentTheme}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.topbar}>
            {topbar}
          </div>
          <div className={styles.page}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
