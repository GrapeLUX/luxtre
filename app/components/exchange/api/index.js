import historyProvider from './historyProvider'

const supportedResolutions = ["1", "3", "5", "15", "30", "60", "120", "240", "D"]

const config = {
    supported_resolutions: supportedResolutions
}; 
const chart_log = false;

export default {
	onReady: cb => {
		if(chart_log) console.log('=====onReady running')
		setTimeout(() => cb(config), 0)
	},
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
		if(chart_log) console.log('====Search Symbols running')
	},
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		// expects a symbolInfo object in response
		if(chart_log) console.log('======resolveSymbol running')
		if(chart_log) console.log('resolveSymbol:',{symbolName})
		var split_data = symbolName.split(/[:/]/)
		if(chart_log) console.log({split_data})
		var symbol_stub = {
			name: symbolName,
			description: '',
			type: 'crypto',
			session: '24x7',
			timezone: 'Etc/UTC',
			ticker: symbolName,
			exchange: split_data[0],
			minmov: 1,
			pricescale: 100000000,
			has_intraday: true,
			intraday_multipliers: ['1', '60'],
			supported_resolution:  supportedResolutions,
			volume_precision: 8,
			data_status: 'streaming',
		}

		if (split_data[2].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
			symbol_stub.pricescale = 100
		}
		setTimeout(function() {
			onSymbolResolvedCallback(symbol_stub)
			if(chart_log) console.log('Resolving that symbol....', symbol_stub)
		}, 0)
		
		
		// onResolveErrorCallback('Not feeling it today')

	},
	getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
		if(chart_log) console.log('=====getBars running')
		if(chart_log) console.log('function args',arguments)
		if(chart_log) console.log(`Requesting bars between ${new Date(from * 1000).toISOString()} and ${new Date(to * 1000).toISOString()}`)
		historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest)
		.then(bars => {
			if (bars.length) {
				onHistoryCallback(bars, {noData: false})
			} else {
				onHistoryCallback(bars, {noData: true})
			}
		}).catch(err => {
			if(chart_log) console.log({err})
			onErrorCallback(err)
		})

	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
		if(chart_log) console.log('=====subscribeBars runnning')
	},
	unsubscribeBars: subscriberUID => {
		if(chart_log) console.log('=====unsubscribeBars running')
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		//optional
		if(chart_log) console.log('=====calculateHistoryDepth running')
		// while optional, this makes sure we request 24 hours of minute data at a time
		// CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
		return resolution < 60 ? {resolutionBack: 'D', intervalBack: '1'} : undefined
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		if(chart_log) console.log('=====getMarks running')
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		if(chart_log) console.log('=====getTimeScaleMarks running')
	},
	getServerTime: cb => {
		if(chart_log) console.log('=====getServerTime running')
	}
}
