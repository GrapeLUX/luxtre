import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './TimeSales.scss'

type Props = {
    coinPrice: number,
  };  

@observer
export default class TimeSales extends Component<Props> {

    render() {
        return (
            <div className={styles.component}>
                <div className={styles.HeaderContainer}>
                    <div className={styles.Header_Time}>Time</div>
                    <div className={styles.Header_Price}>Price</div>
                    <div className={styles.Header_Size}>Size</div>
                </div>
            </div>   
        );
    }
}