import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './OrderEntry.scss'

type Props = {
    coinPrice: number,
  };

@observer
export default class Chart extends Component<Props> {
    constructor(){
        super();

        this.state = {
            buy: true
        }
    }
    
    onBuySellToggleHandler() {
        this.setState({buy: !this.state.buy})
    }

    render() {
        let buysell_class = this.state.buy ? "Toggle_Buy" : "Toggle_Sell";
        return (
            <div className={styles.component}>
            
                <div className={styles.marketstate_Outer}>
                    <div className={styles.marketstate_Row}>
                        <div className={styles.marketstate_Item}>
                            <div className={styles.marketstate_Label}>Last Price</div>
                            <div className={styles.marketstate_Value}>7184(-2.77%)</div>
                        </div>
                        <div className={styles.marketstate_Item}>
                            <div className={styles.marketstate_Label}>Best Bid / Ask
                                <div className={styles.PopOver_PopOverWrapper}>
                                    <button type="button" className={styles.Clickable}>
                                        <img src={require('../../assets/images/info-icon.svg')}/>
                                    </button>
                                </div>
                            </div>
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

                <div className={styles.BuySellToggle_Outer}>
                    <button type="button" className={styles.BuySellToggle_Background} onClick={this.onBuySellToggleHandler.bind(this)}>
                        <div className={styles.BuySellToggle_Slider + ' ' + styles[buysell_class]}>

                        </div>
                    </button>
                </div>
                <div>
                    Signin Signup section 
                </div>
            </div>   
        );
    }
}


