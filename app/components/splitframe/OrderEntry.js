import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './OrderEntry.scss'

type Props = {
    coinPrice: number,
  };

@observer
export default class Chart extends Component<Props> {

    render() {
        return (
            <div className={styles.component}>
            
                <div className={styles.marketstate_Outer}>
                    <div className={styles.marketstate_Row}>
                        <div className={styles.marketstate_Item}>
                            <div className={styles.marketstate_Label}>Last Price</div>
                            <div className={styles.marketstate_Value}>7184(-2.77%)</div>
                        </div>
                        <div className={styles.marketstate_Item}>
                            <div className={styles.marketstate_Label}>Best Bid / Ask</div>
                            <div className={styles.marketstate_Value}>7168✕7189</div>
                        </div>
                    </div>
                    <div className={styles.marketstate_Row}>
                        <div className={styles.marketstate_Item}>
                            <div className={styles.marketstate_Label}>Session Volume</div>
                            <div className={styles.marketstate_Value}>60.99</div>
                        </div>
                    </div>

                </div>

                <div>
                    Buy and Sell section
                </div>
                <div>
                    Signin Signup section 
                </div>
            </div>   
        );
    }
}


