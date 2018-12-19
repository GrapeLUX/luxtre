import React, { Component } from 'react';
import { defineMessages, intlShape } from 'react-intl';
import classNames from 'classnames';
import consoleBlackIcon from '../../assets/images/top-bar/core-console.png';
import consoleWhiteIcon from '../../assets/images/top-bar/core-console-white.png';
import ConsoleWindowDialog from "./ConsoleWindowDialog";
import styles from './ConsoleWindowIcon.scss';
import { THEMES } from '../../themes/index';

const messages = defineMessages({
  consoleWindow: {
    id: 'luxcoin.node.sync.status.consoleWindow',
    defaultMessage: '!!!Debug Console Window',
    description: 'Label for the console Window on Debug icon.'
  },
});

type Props = {
  openDialogAction: Function,
  currentTheme: string
};

export default class ConsoleWindowIcon extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired
  };

  render() {
    const { openDialogAction, currentTheme } = this.props;
    const { intl } = this.context;
    const componentClasses = classNames([
      styles.component,
    ]);
    return (
      <div className={componentClasses}>
        <button onClick={() => openDialogAction({dialog: ConsoleWindowDialog})}>
          <img 
            className={styles.icon} 
            src={currentTheme == THEMES.DARK_BLUE ? consoleWhiteIcon : consoleBlackIcon} 
            role="presentation" 
          />
          <div className={styles.info}>
            {intl.formatMessage(messages.consoleWindow)}
          </div>
        </button>
      </div>
    );
  }
}
