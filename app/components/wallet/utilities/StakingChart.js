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
  
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const {stakingsData} = this.props;
    var ctx = this;
    stakingsData.then(function(result){
        var stakingsWeight = new Array();
        var myStakingsWeight = new Array();

	    result.forEach(function(weight) {
            var stakingWeight = [weight.time, weight.netstakingweight];
            var mystakingWeight = [weight.time, parseFloat(weight.stakingweight * 100 / weight.netstakingweight)];
            stakingsWeight.push(stakingWeight);
            myStakingsWeight.push(mystakingWeight)
        });
        
        ctx.renderGraph1(stakingsWeight);
        ctx.renderGraph2(myStakingsWeight);
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderGraph1(stakingsWeight){
    
    Highcharts.chart('staking-graph-container1', {
        credits: {
            enabled: false
        },
        chart: {
            zoomType: 'x',
            height: 300
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
              name: 'Network Staking Weight',
              data: stakingsWeight,
              type: 'area',
              tooltip:{
                pointFormatter:function(){
                  //var hashrate = ctx.formattedHashrate.call(ctx, this.y);
                  return 'Network Staking Weight: <b>' + this.y + '</b><br/>';
                }
              }
          }]
    });
 }
 renderGraph2(myStakingsWeight){
    Highcharts.chart('staking-graph-container2', {
        credits: {
            enabled: false
        },
        chart: {
            zoomType: 'x',
            height: 300
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
              name: 'My Staking Weight',
              data: myStakingsWeight,
              type: 'area',
              tooltip:{
                pointFormatter:function(){
                  //var hashrate = ctx.formattedHashrate.call(ctx, this.y);
                  return 'My Staking Weight: <b>' + this.y + '%</b><br/>';
                }
              }
          }]
    });      
  }

  render() {
    return (
      <div className={styles.component}>
        <div className={styles.networkweight}>
            <div className={styles.categoryTitle}> Network Staking Weight </div>
            <div className='chart' id='staking-graph-container1'></div>
        </div>
        <div className={styles.myweight}>
            <div className={styles.categoryTitle}> My Staking Weight (%) </div>
            <div className='chart' id='staking-graph-container2'></div>
        </div>
        
      </div>
    );
  }
}
