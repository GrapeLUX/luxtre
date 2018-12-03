// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './StakingChart.scss';

import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);

type Props = {
    stakingsData: Array<StakingData>
};

@observer
export default class StakingChart extends Component<Props> {
  
  _graphLoading = true;
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const {stakingsData} = this.props;
    var ctx = this;
    stakingsData.then(function(result){
        var stakingsWeight = new Array();

	    result.forEach(function(weight) {
	        var stakingWeight;
	        stakingWeight = [weight.time, weight.netstakingweight];
	        stakingsWeight.push(stakingWeight);
        });
        
        ctx.renderGraph(stakingsWeight);
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderGraph(stakingsWeight){

    Highcharts.chart('staking-graph-container', {
        credits: {
            enabled: false
        },
        chart: {
            zoomType: 'x'
        },
        exporting: { 
            enabled: false 
        },
        title: {
            text: ''
        },  
        rangeSelector: {
            selected : 1,
            inputEnabled: false,
            buttons : [{
                type : 'day',
                count : 1,
                text : '1d'
            },{
                type : 'week',
                count : 1,
                text : '1w'
            },{
                type : 'Month',
                count : 1,
                text : '1m'
            }]
        },
        navigator: {
            enabled: false
        },
        scrollbar: {
            enabled: false
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            }   
        },
        tooltip: {
            shared: true,
            positioner: function(labelWidth, labelHeight, point) {
                var xPos = point.plotX + this.chart.plotLeft + 10;
                var yPos = point.plotY + this.chart.plotTop;

                if (point.plotX + labelWidth > this.chart.chartWidth - this.chart.plotLeft) {
                    xPos = point.plotX + this.chart.plotLeft - labelWidth - 10;
                }

                return {
                    x: xPos,
                    y: yPos
                };
      }
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineWidth: 1,
                marker: {
                    enabled: false
                }
            }
        },
        series: [
          {
              name: 'Staking Weight',
              data: stakingsWeight,
              type: 'area',
              tooltip:{
                pointFormatter:function(){
                  //var hashrate = ctx.formattedHashrate.call(ctx, this.y);
                  return 'Staking Weight: <b>' + this.y + '</b><br/>';
                }
              }
          }]
    });

    this._graphLoading = false;      
  }

  render() {
    return (
      <div className={styles.component}>
        <div className={styles.categoryTitle}> Staking Weight </div>
        <div className='chart' id='staking-graph-container'></div>
      </div>
    );
  }
}
