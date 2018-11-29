import React, { Component } from 'react';
import { defineMessages, intlShape } from 'react-intl';
import classNames from 'classnames';
import munuIcon from '../../assets/images/top-bar/theme-dark.png';
import styles from './ThemeMenuIcon.scss';

const messages = defineMessages({
  themeSettingIcon: {
    id: 'luxcoin.theme.setting.icon',
    defaultMessage: '!!!Theme Style',
    description: 'Label for the theme style on Theme Setting icon.'
  },
});

type Props = {
  openDialogAction: Function,
};

type State = {
  isShowThemeMenu: boolean,
}

export default class ThemeMenuIcon extends Component<Props, State> {

  state = {
    isShowThemeMenu: false
  };

  static contextTypes = {
    intl: intlShape.isRequired
  };

  onOpenThemeMenu() {
    this.setState({isShowThemeMenu: !this.state.isShowThemeMenu});
  }

  render() {
    const { openDialogAction } = this.props;
    const { isShowThemeMenu } = this.state;
    const { intl } = this.context;
    const componentClasses = classNames([
      styles.component,
    ]);
    const themeMenuClasses = classNames([
      styles.menu,
      this.state.isShowThemeMenu ? null : styles.hideMenu
    ]);
    return (
      <div className={componentClasses}>
        <button onClick={e => this.setState({ isShowThemeMenu: !isShowThemeMenu })}>
          <img className={styles.icon} src={munuIcon} role="presentation" />
          { isShowThemeMenu ? (
            null
          ) : (
            <div className={styles.info}>
              {intl.formatMessage(messages.themeSettingIcon)}
            </div>
          )}
        </button>
        <div className={themeMenuClasses}>
          <div className={styles.menuItem}>default</div>
          <div className={styles.menuItem}>dark-blue</div>
          <div className={styles.menuItem}>light-blue</div>
        </div>
      </div>
    );
  }
}
