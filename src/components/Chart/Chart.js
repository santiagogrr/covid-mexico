import React, {Component} from 'react';
import { fetchDailyData, fetchMexico, fetchYesterdayMexico } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import cx from 'classnames';

import styles from './Chart.module.css';

class Chart extends Component {

  state = {
		dailyData: [],
		dataMex:  {},
		dataYesterdayMex:  {}
	}
	
	async componentDidMount () {
		const fetchedData = await fetchDailyData();
		const fetchedCountry = await fetchMexico();
		const fetchedYesterdayCountry = await fetchYesterdayMexico();
	
    this.setState({
			dailyData: fetchedData,
			dataMex: fetchedCountry,
			dataYesterdayMex: fetchedYesterdayCountry 
		});
  }

  render(){
		const { dailyData, dataMex, dataYesterdayMex } = this.state;

		// const data = {
		// 	labels: Object.keys(dailyData.recovered),
		// 	datasets: [{
		// 		label: 'Infected',
		// 		borderColor: '#3333ff',
		// 		fill: true,
		// 		//data: Object.values(dailyData),
		// 	}]
		// } ;
		
		const lineChart =  (
      dailyData.length !== 0 ? 
      (<Line
				options={{
					legend: { 
						display: true, 
						position: 'top', 
						labels: {
						fontSize: 16
					}
				},
					title: { display: true, text: `Daily stats on the past 30 days`, fontSize: 18},
					tooltips: {
						titleFontSize: 14,
						bodyFontSize: 14,
					},
					maintainAspectRatio: 	false,
					responsive:true,
					scales: {
						yAxes: [{
							ticks: {
                fontSize: 14
            }
						 }],
						xAxes: [{
							ticks: {
                fontSize: 14
            }
						 }],
						},
				}}
        data={{
          labels: Object.keys(dailyData.recovered),
          datasets: [{
            label: 'Infected',
						borderColor: 'rgba(99, 180, 255,1)',
						fill: false,
						pointBorderWidth: 5,
						data: Object.values(dailyData.cases),
					}, 	
					{
						label: 'Recovered',
						fill: false,
						borderColor: '#008900',
						pointBorderWidth: 5,
						data: Object.values(dailyData.recovered),
					},		
					{
            label: 'Deaths',
						borderColor: 'rgba(255,99,132,1)',
						fill: false,
						pointBorderWidth: 5,
						data: Object.values(dailyData.deaths),
					},	
				]
        }}
      /> ): null
	)
	
	const barChart = (
		dataMex.cases ? 
		(
			<Bar 
			
			data={{
			  labels: ['Today', 'Yesterday'],
			  datasets:[{
				label: 'Deaths',
				backgroundColor: [
				  'rgba(255,99,132,0.2)', //rojo
				  'rgba(255,99,132,0.2)' //rojo
				],
				borderColor: [
				  'rgba(255,99,132,1)',
				  'rgba(255,99,132,1)'
				],
				hoverBackgroundColor: [
				  'rgba(255,99,132,0.4)',
				  'rgba(255,99,132,0.4)',
				],
				hoverBorderColor: [
				  'rgba(255,99,132,1)',
				  'rgba(255,99,132,1)',
				],
				borderWidth: [
				  1,
				  1
				],
				data: [dataMex.todayDeaths, dataYesterdayMex.todayDeaths]
				},
				{
					label: 'Infected',
					data: [dataMex.todayCases, dataYesterdayMex.todayCases],
					backgroundColor: [
						'rgba(99, 180, 255,0.2)',
						'rgba(99, 180, 255,0.2)',

					],
					borderColor: [
						'rgba(99, 180, 255, 1)',
						'rgba(99, 180, 255, 1)',
					],
					hoverBackgroundColor: [
						'rgba(99, 180, 255, 0.4)',
						'rgba(99, 180, 255, 0.4)'
					],
					hoverBorderColor: [
						'rgba(99, 180, 255, 1)',
						'rgba(99, 180, 255, 1)'
					],
					borderWidth: [
						1, 
						1
					]
				}
			]
  
			}}
			options={{
			  legend: { 
					display: true, 						
					labels: {
						fontSize: 16
					} 
				},
				title: { display: true, text: `Current updates in cases and deaths`, fontSize: 20},
				scales: {
					xAxes: [{
							stacked: true,
							ticks: {
								beginAtZero: true,
								fontSize: 14
							}
					}],
					yAxes: [{
							stacked: true,
							ticks: {
								beginAtZero: true,
								fontSize: 14
							}
					}]
			},
			tooltips: {
				titleFontSize: 14,
				bodyFontSize: 14,
			},
			maintainAspectRatio: 	false,
			responsive:true,
			}}
		  
		  />
		) : null
	  )
  
    return (
			<div className={cx(styles.container,styles.chart)}>
					{this.props.toggled1 ? lineChart: null}
					{this.props.toggled2 ? barChart: null}
			</div>
    );
  }
}

export default Chart;
