// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TopBar from '../components/layout/TopBar';
import ThemeMenuIcon from '../components/widgets/ThemeMenuIcon';
import ConsoleWindowIcon from '../components/widgets/ConsoleWindowIcon';
import NodeSyncStatusIcon from '../components/widgets/NodeSyncStatusIcon';
import WalletLockStatusIcon from '../components/widgets/WalletLockStatusIcon';
import LuxgateToopbarIcons from '../components/widgets/LuxgateToopbarIcons';
import WalletStakingStatusIcon from '../components/widgets/WalletStakingStatusIcon';
import WalletTestEnvironmentLabel from '../components/widgets/WalletTestEnvironmentLabel';
import type { InjectedProps } from '../types/injectedPropsType';
import environment from '../environment';

type Props = InjectedProps;

@inject('stores', 'actions') @observer
export default class TopBarContainer extends Component<Props> {

  static defaultProps = { actions: null, stores: null };

  selectTheme = (values: { theme: string }) => {
    this.props.actions.profile.updateTheme.trigger(values);
  }
  
  render() {
    const { actions, stores } = this.props;
    const { sidebar, app, networkStatus, luxgate } = stores;
    const { uiDialogs, uiNotifications } = stores;
    const isMainnet = environment.isMainnet();
    const isLuxApi = environment.isLuxApi();
    const activeWallet = stores[environment.API].wallets.active;
    const { isShowingLuxtre } = sidebar;
    const { isLogined } = luxgate.loginInfo;
    const pageTitle = stores[environment.API].wallets.pageTitle;
    const testnetLabel = (
      isLuxApi && !isMainnet ? <WalletTestEnvironmentLabel /> : null
    );
    const { currentTheme } = this.props.stores.profile;

    return (
      <TopBar
        onSwitchLuxgate={actions.sidebar.switchLuxgate.trigger}
        isShowingLuxtre={isShowingLuxtre}
        pageTitle={pageTitle}
        isDialogOpen={uiDialogs.isOpen}
      >
        {isShowingLuxtre && activeWallet && activeWallet.hasPassword == true ?
          <WalletLockStatusIcon
            isLocked={activeWallet.isLocked}
            currentTheme={currentTheme}
          />
          : null
        }
        {isShowingLuxtre ?
          <WalletStakingStatusIcon
            isStaking={activeWallet.isStaking}
            currentTheme={currentTheme}
          />
          : null
        }
        {isShowingLuxtre ?
          <NodeSyncStatusIcon
            networkStatus={networkStatus}
            isMainnet={isMainnet}
            currentTheme={currentTheme}
          />
          : null
        }
        {isShowingLuxtre ?
          <ConsoleWindowIcon
            openDialogAction={actions.dialogs.open.trigger}
            currentTheme={currentTheme}
          />
          :null
        }
        {isShowingLuxtre ?
          <ThemeMenuIcon
            theme={currentTheme}
            selectTheme={this.selectTheme}
          />
          :null
        }
        {!isShowingLuxtre ?
          <LuxgateToopbarIcons
            isLogined={isLogined}
            addLog={(content:string, type:string) =>{
              const logData = {
                content: content,
                type: type
              };
              actions.luxgate.logger.addLog.trigger(logData);
            }}
            onLogout={() => {
              actions.luxgate.loginInfo.logoutAccount.trigger();
            }}
            openDialogAction={actions.dialogs.open.trigger}
          />
          : null
        }
      </TopBar>
    );
  }

}
