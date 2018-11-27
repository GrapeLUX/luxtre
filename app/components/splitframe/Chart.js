import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { render } from 'react-dom';
import Chart from './Chart/Chart';
import { getData } from "./Chart/utils"

import { TypeChooser } from "react-stockcharts/lib/helper";

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
			<TypeChooser>
				{type => <Chart type={type} data={this.state.data} />}
			</TypeChooser>
		)
    }
}

render(
	<ChartComponent />,
	document.getElementById("root")
);


