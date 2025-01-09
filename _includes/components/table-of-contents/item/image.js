const path = require('path')
/**
 * Renders a TOC item image
 *
 * @param     {Object} eleventyConfig
 * @param     {Object} params
 * @property  {String} src - image src
 *
 * @return {String} TOC image markup
 */
module.exports = function(eleventyConfig) {
  const { imageDir } = eleventyConfig.globalData.config.figures
  return function(params) {
    const { src, inline, zoom } = params
    if (!imageDir || !src) return ''
    const imgPath = zoom ? inline : path.join(imageDir, src)
    return `
      <div class="card-image">
        <figure class="image">
          <img src="${ imgPath }" alt="" loading="lazy" />
        </figure>
      </div>
    `
  }
}
