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

  static contextTypes = {
    intl: intlShape.isRequired
  };

  render() {
    const { openDialogAction } = this.props;
    const { intl } = this.context;
    const componentClasses = classNames([
      styles.component,
    ]);
    return (
      <div className={componentClasses}>
        <button>
          <img className={styles.icon} src={munuIcon} role="presentation" />
          <div className={styles.info}>
            {intl.formatMessage(messages.themeSettingIcon)}
          </div>
        </button>
        <div className={styles.menu}>
          <div className={styles.menuItem}>default</div>
          <div className={styles.menuItem}>dark-blue</div>
          <div className={styles.menuItem}>light-blue</div>
        </div>
      </div>
    );
  }
}
