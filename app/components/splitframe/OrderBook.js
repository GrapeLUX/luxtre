import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './OrderBook.scss';

type Props = {
    coinPrice: number,
  };  

@observer
export default class OrderBook extends Component<Props> {

    render() {
        return (
            <div className={styles.component}>
                <div className={styles.HeaderContainer}>
                    <div className={styles.Header_Proportion}>Proportion</div>
                    <div className={styles.Header_Size}>Size</div>
                    <div className={styles.Header_Price}>Price</div>
                </div>
                
            </div>   
        );
    }
}


