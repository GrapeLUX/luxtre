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

                <div className={styles.TableContent}>
                    <div className={styles.Table_Order_Flash}>
                        <div className={styles.Table_Row}>
                            <div className={styles.Table_Cell}>
                                <div className={styles.ProportionBar_Container}>
                                    <div className={styles.ProportionBar_Bar}></div>
                                </div>
                            </div>
                            <div className={styles.Table_Cell}>
                                <span title="0.0100">0.01</span>
                            </div>
                            <div className={styles.Table_Cell}>
                                <span title="5839.0000">5839</span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>   
        );
    }
}


