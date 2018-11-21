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
            buy: true,
            advanced: false,
        }
    }
    
    onBuySellToggleHandler() {
        this.setState({buy: !this.state.buy})
    }

    onAdvancedHandler() {
        this.setState({advanced: !this.state.advanced})
    }


    render() {
        let buysell_class = this.state.buy ? "Toggle_Buy" : "Toggle_Sell";
        let advanced_class = this.state.advanced ? "Toggle_Circle_On" : "Toggle_Circle_Off";
        let advancedBackgroud_class = this.state.advanced ? "Toggle_Container_Background_On" : "Toggle_Container_Background_Off";
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
                <form>
                    <div className={styles.Bottom_Border}>
                        <div className={styles.Form_Row1}>
                            <button type="button" className={styles.Form_Button}>
                                <span className={styles.Form_Span}>
                                    <div className={styles.Form_CategoryItem}>Type</div>
                                    <div className={styles.Form_ValueItem}>Limit</div>
                                    <div className={styles.Form_TypeItem}>
                                        <img src={require('../../assets/images/info-icon.svg')}/>
                                    </div>
                                </span>
                            </button>
                        </div>
                        <label className={styles.Form_Row2}>
                            <div className={styles.Form_CategoryItem}>Price</div>
                            <div className={styles.Form_ValueItem}>...</div>
                            <div className={styles.Form_TypeItem2}>AUD</div>
                        </label>
                        <label className={styles.Form_Row2}>
                            <div className={styles.Form_CategoryItem}>Size</div>
                            <div className={styles.Form_ValueItem}>...</div>
                            <div className={styles.Form_TypeItem2}>BTC</div>
                        </label>
                        <label className={styles.Form_Row2} onClick={this.onAdvancedHandler.bind(this)}>
                            <div className={styles.Toggle_Container + ' ' + styles[advancedBackgroud_class]}>
                                <div className={styles[advanced_class]}>
                                </div>
                            </div>
                            <div className={styles.Form_CategoryItem}>Advanced</div>
                        </label>
                        {
                        this.state.advanced && <div className={styles.Form_Row1}>
                            <button type="button" className={styles.Form_Button}>
                                <span className={styles.Form_Span}>
                                    <div className={styles.Form_CategoryItem}>Time in force</div>
                                    <div className={styles.Form_ValueItem}>Good til cancel</div>
                                    <div className={styles.Form_TypeItem}>
                                        <img src={require('../../assets/images/info-icon.svg')}/>
                                    </div>
                                </span>
                            </button>
                        </div>
                        }
                        <label className={styles.Form_Row2}>
                            <div className={styles.Form_CategoryItem}>Total</div>
                            <div className={styles.Form_ValueItem}>...</div>
                            <div className={styles.Form_TypeItem2}>AUD</div>
                        </label>
                    </div>
                    <div className={styles.Signinup_Container}>
                        <a className={styles.CreateAccount}>Create an account</a>
                        <p className={styles.Sign_In}>
                            <a>Sing In</a>
                        </p>
                    </div>
                </form>
            </div>   
        );
    }
}


