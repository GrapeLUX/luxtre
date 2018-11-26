import React, { Component } from 'react';
import { observer } from 'mobx-react';

type Props = {
    coinPrice: number,
  };  

@observer
export default class YourFills extends Component<Props> {

    render() {
        return (
            <div>
                Here is Your Fills Page
            </div>   
        );
    }
}