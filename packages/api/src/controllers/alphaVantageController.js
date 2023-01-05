const https = require('node:https');

const { ENV_ALPHA_VANTAGE_KEY, ENV_PATH, ENV_VERSION, ENV_DEMO } = process.env;

exports.info = (req, res) => {
  const data = { server: ENV_PATH, version: ENV_VERSION };
  res.status(200).json(data);
}

fetch = (url, req, res) => {
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

exports.search = (req, res) => {
  const keyword = req.query.keyword;
  let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${ENV_ALPHA_VANTAGE_KEY}`;
  if (ENV_DEMO) {
    url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo`;
  }

  fetch(url, req, res);
}

exports.overview = (req, res) => {
  const symbol = req.query.symbol;
  let url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ENV_ALPHA_VANTAGE_KEY}`;
  if (ENV_DEMO) {
    url = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo'
  }

  fetch(url, req, res);
}

exports.daily = (req, res) => {
  const symbol = req.query.symbol;
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${ENV_ALPHA_VANTAGE_KEY}`;
  if (ENV_DEMO) {
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo';
  }

  fetch(url, req, res);
}