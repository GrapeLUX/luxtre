import React, { Component } from 'react';
import { observer } from 'mobx-react';

type Props = {
    coinPrice: number,
  };  

@observer
export default class TimeSales extends Component<Props> {

    render() {
        return (
            <div>
                Here is Time and Sales Page
            </div>   
        );
    }
}