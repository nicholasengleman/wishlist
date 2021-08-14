import opengraph from 'opengraph-io';

const og = new opengraph({
  appId: process.env.OPENGRAPH_APP_ID,
  fullRender: true,
});

const openGraphIo = (req, res) => {
  const siteUrl = req.body.data;
  console.log(siteUrl);

  og.getSiteInfo(siteUrl, function (err, siteInfo) {
    if (err) {
      console.log('[ERROR GETTING OPEN GRAPH DATA: ]', err);
    }
    res.json(siteInfo);
  });
};

export default openGraphIo;
