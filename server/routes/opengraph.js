const opengraph = require('opengraph-io')({
  appId: '6b1d1fd5-9873-4258-ab15-2e365714c63a',
}); // <-- Enter your app_id!

const openGraphIo = (req, res) => {
  const siteUrl = req.query['url'];

  console.log(siteUrl);

  opengraph.getSiteInfo(siteUrl, function (err, siteInfo) {
    if (err) {
      console.log('[ERROR GETTING OPEN GRAPH DATA: ]', err);
    }
    res.json(siteInfo);
  });
};

exports.openGraphIo = openGraphIo;
