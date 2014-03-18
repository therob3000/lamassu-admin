var config = require('../config.js');

exports.actions = function(req, res, ss) {

  req.use('session')

  return {

    price: function(data) {
      config.load(function (err, results) {
        if (err) return res(err);
        results.config.exchanges.settings.commission = data.commission;
        results.config.exchanges.plugins.current.ticker = data.provider;
        config.saveExchangesConfig(results.config, res);
      });
    },
    
    wallet: function(data) {
      config.load(function(err, results) {
        if (err) return callback(err);

        var provider = data.provider;
        var settings = results.config.exchanges.plugins.settings[provider];
        results.config.exchanges.plugins.current.wallet = provider;
        Object.keys(data).forEach(function(key) {
          if (key !== 'provider')
            settings[key] = data[key];
        });

        config.saveExchangesConfig(results.config, res);
      });
    },

    exchange: function(data) {
      config.load(function(err, results) {
        if (err) return callback(err);

        var provider = data.provider;
        var settings = results.config.exchanges.plugins.settings[provider];
        results.config.exchanges.plugins.current.trade = provider;
        Object.keys(data).forEach(function(key) {
          if (key !== 'provider')
            settings[key] = data[key];
        });

        config.saveExchangesConfig(results.config, res);
      });
    },

    currency: function(data) {

      //data example: {type:'USD'}

      //set the data in the database

      //return the object (with symbol) like we would get from get.currency, example: {type:'USD', symbol:'$'}

    },

    compliance: function(data) {
      config.load(function(err, results) {
        if (err) return callback(err);
        // validate elements???
        results.config.exchanges.settings.compliance = data;
        // res { ok: true }
        config.saveExchangesConfig(results.config, res);
      });
    }
  };
};
