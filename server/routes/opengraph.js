const opengraph = require('opengraph-io')({ appId: process.env.OPEN_GRAPH_IO }); // <-- Enter your app_id!

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
