const { html } = require('~lib/common-tags')

/**
 * Google Analytics
 * @param      {Object}  eleventyConfig
 * @param      {Object}  data
 */
module.exports = function(eleventyConfig) {
  const { googleId } = eleventyConfig.globalData.config.analytics
  return function(params) {
    if (!googleId) return ''
    return html`
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${googleId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${googleId}');
</script>
    `
  }
}
