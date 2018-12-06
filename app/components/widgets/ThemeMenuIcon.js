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

export default class ThemeMenuIcon extends Component<Props> {

  constructor() {
    super();
    
    this.state = {
      isShowThemeMenu: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  state = {
    isShowThemeMenu: false
  };
  
  static contextTypes = {
    intl: intlShape.isRequired
  };

  showMenu(event) {
    event.preventDefault();
    
    this.setState({ isShowThemeMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ isShowThemeMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
    }
  }


  render() {
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
        <button onClick={this.showMenu}>
          <img className={styles.icon} src={munuIcon} role="presentation" />
          { isShowThemeMenu ? (
            null
          ) : (
            <div className={styles.info}>
              {intl.formatMessage(messages.themeSettingIcon)}
            </div>
          )}
        </button>
        { this.state.isShowThemeMenu ? (
          <div
            className={styles.menu}
            ref={(element) => {
              this.dropdownMenu = element;
            }}
          >
            <div className={styles.menuItem}>default</div>
            <div className={styles.menuItem}>dark-blue</div>
            <div className={styles.menuItem}>light-blue</div>
          </div>
        ) : (
          null
        )}
      </div>
    );
  }
}


