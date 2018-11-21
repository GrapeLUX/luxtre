import React, { Component } from 'react';
import { defineMessages, intlShape } from 'react-intl';
import classNames from 'classnames';
import consoleIcon from '../../assets/images/top-bar/theme-dark.png';
import styles from './ThemeMenuIcon.scss';

const messages = defineMessages({
  consoleWindow: {
    id: 'luxcoin.theme.setting',
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
      </div>
    );
  }
}
