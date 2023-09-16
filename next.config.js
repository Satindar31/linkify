const { withLogtail } = require('@logtail/next');

module.exports = withLogtail({
  poweredByHeader: false,
});

module.exports = {
  LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
}