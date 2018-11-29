import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { render } from 'react-dom';
import Chart from './Chart/Chart';
import { getData } from "./Chart/utils"

import { TypeChooser } from "react-stockcharts/lib/helper";

import styles from './Chart.scss';
import PopOver from './PopOver';

type Props = {
    coinPrice: number,
  };

@observer
export default class ChartComponent extends Component<Props> {
    componentDidMount() {
		getData().then(data => {
			this.setState({ data })
		})
	}

    render() {
        if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			<div className={styles.component}>
				<div className={styles.HeaderContainer}>
					<div role="button" className={styles.Chart_Interval}>1m</div>
					<div role="button" className={styles.Chart_Interval}>15m</div>
					<div role="button" className={styles.Chart_Interval}>30m</div>
					<div role="button" className={styles.Chart_Interval}>1h</div>
					<div role="button" className={styles.Chart_Interval}>4h</div>
					<div role="button" className={styles.Chart_Interval}>8h</div>
					<div role="button" className={styles.Chart_Interval}>1d</div>
					<div role="button" className={styles.Chart_Interval}>1w</div>
					<div className={styles.PopOver_PopOverWrapper}>
						<button style={{transform: "rotateZ(0deg)"}} className={styles.Clickable}>
							<div className={styles.Chart_PopOverLabel}>
								<div className={styles.Chart_ChartType}>Candlestick</div>
								<PopOver></PopOver>
							</div>
						</button>
					</div>
				</div>
				<TypeChooser>
					{type => <Chart type={type} data={this.state.data} />}
				</TypeChooser>
			</div>
			
		)
    }
}

render(
	<ChartComponent />,
	document.getElementById("root")
);


