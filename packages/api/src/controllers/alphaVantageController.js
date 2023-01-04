const https = require('node:https');

const { ENV_ALPHA_VANTAGE_KEY, ENV_PATH, ENV_VERSION } = process.env;

exports.info = (req, res) => {
  const data = { server: ENV_PATH, version: ENV_VERSION };
  res.status(200).json(data);
}

exports.search = (req, res) => {
  const keyword = req.query.keyword;
  // const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${ENV_ALPHA_VANTAGE_KEY}`;
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo`;

  // console.log(keyword);
  https.get(url, (result) => {
    if (result.statusCode === 200) {
      let data = ''
      result.on('data', (chunk) => data += chunk);
      result.on('end', () => res.status(200).json(JSON.parse(data)));
    }
  }).on('error', (e) => {
    console.error(e);
  });
}

exports.overview = (req, res) => {
  const symbol = req.query.symbol;
  // const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ENV_ALPHA_VANTAGE_KEY}`;
  const url = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo'

  // console.log(keyword);
  https.get(url, (result) => {
    if (result.statusCode === 200) {
      let data = ''
      result.on('data', (chunk) => data += chunk);
      result.on('end', () => res.status(200).json(JSON.parse(data)));
    }
  }).on('error', (e) => {
    console.error(e);
  });
}

exports.daily = (req, res) => {
  const symbol = req.query.symbol;
  // const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ENV_ALPHA_VANTAGE_KEY}`;
  const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo';

  https.get(url, (result) => {
    if (result.statusCode === 200) {
      let data = ''
      result.on('data', (chunk) => data += chunk);
      result.on('end', () => res.status(200).json(JSON.parse(data)));
    }
  }).on('error', (e) => {
    console.error(e);
  });
}