import axios from 'axios';

// init axios
const client = axios.create({
	baseURL: 'https://api.iextrading.com/1.0',
	transformRequest: [(data, headers) => {
		delete headers.common.Authorization; // problematic header axios automaticly attaches to req
		return data;
	}],
});

client.getStocks = function (stocks) {
	return this({
		method: 'GET',
		url: '/stock/market/batch',
		params: {
			symbols: stocks.join(','),
			types: "quote",
		},
	})
		.then(re => {
			if (re.status === 200 && re.data) return re; else throw new Error("no stock data");
		})
		.then(re => re.data);
};

export default client;
