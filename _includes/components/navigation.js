const truncate = require('~lib/truncate')
const { html } = require('~lib/common-tags')

/**
 * This controls the various navigation elements (nav, skip-link, menu and
 * search icons, and search results if enabled). It is visible on all pages.
 *
 * A note that while Hugo includes .Next and .Prev variables that can be used
 * to connect to the next and previous pages in the linear order of the site,
 * Quire makes available the option of hiding pages from the linear order in the
 * book in order to have custom pages in other formats (PDF, EPUB, etc.).
 * Because of this, the .Next and .Prev variables are not used here, and instead
 * eligible pages are ranged through and based on weight, the next or previous
 * one in the range is linked to.
 */
module.exports = function(eleventyConfig) {
  const eleventyNavigation = eleventyConfig.getFilter('eleventyNavigation')
  const pageTitle = eleventyConfig.getFilter('pageTitle')
  const { imageDir } = eleventyConfig.globalData.config.figures

  return function (params) {
    const { collections, pagination, title } = params
    const {
      currentPage,
      currentPageIndex,
      nextPage,
      percentProgress,
      previousPage
    } = pagination

    if (!currentPage) return
    
    const home = '/'
    const isHomePage = currentPage.url === home

    const navBarLabel = ({ label, short_title, title }) => {
      return pageTitle({ label, title: short_title || title})
    }

    const navBarStartButton = () => {
      if (!isHomePage) return ''
      const secondPageLink = collections.navigation[1].url
      return `
        <li class="quire-navbar-page-controls__item quire-home-page">
          <a href="${secondPageLink}" rel="next">
            <span class="visually-hidden">Next Page: </span>
            <span class="quire-navbar-button play-button">
              <svg data-outputs-exclude="epub,pdf">
                <switch>
                  <use xlink:href="#start-icon"></use>
                </switch>
              </svg>
            </span>
          </a>
        </li>
      `
    }

    const navBarPreviousButton = () => {
      if (!previousPage) return ''
      const { data, url } = previousPage
      const { label, short_title, title } = data
      return html`
        <li class="quire-navbar-page-controls__item quire-previous-page">
          <a href="${url}" rel="previous">
            <span class="visually-hidden">Previous Page: </span>
            <svg class="left-icon" data-outputs-exclude="epub,pdf">
              <switch>
                <use xlink:href="#left-arrow-icon"></use>
              </switch>
            </svg>
            <span class="hide-small-screen">${navBarLabel({ label, short_title, title })}</span>
          </a>
        </li>
      `
    }

    const navBarHomeButton = () => {
      return '' // disable home button because we have a site logo
      if (!previousPage) return ''
      return html`
        <li class="quire-navbar-page-controls__item quire-home-page">
          <a href="${home}" rel="home">
            <span class="visually-hidden">Home Page: </span>
            <span class="quire-navbar-button home-button">
              <svg data-outputs-exclude="epub,pdf">
                <switch>
                  <use xlink:href="#home-icon"></use>
                </switch>
              </svg>
            </span>
          </a>
        </li>
      `
    }

    const navBarNextButton = () => {
      if (isHomePage || !nextPage) return ''
      const { data, url } = nextPage
      const { label, short_title, title } = data
      return html`
        <li class="quire-navbar-page-controls__item quire-next-page">
          <a href="${url}" rel='next'>
            <span class="visually-hidden">Next Page: </span>
            <span class="hide-small-screen">${navBarLabel({ label, short_title, title })}</span>
            <svg data-outputs-exclude="epub,pdf">
              <switch>
                <use xlink:href="#right-arrow-icon"></use>
              </switch>
            </svg>
          </a>
        </li>
      `
    }

    // TODO: get logo alt text in a config file
    return html`
      <div class="quire-navbar">
        <a href="#main" class="quire-navbar-skip-link" tabindex="1">
          Skip to Main Content
        </a>
        <nav class="quire-navbar-controls">
          <div class="quire-navbar-controls__left">
            <div class="logo">
              <a class="logo-link" href="/" title="Home" rel="home"><img src="/_assets/images/nav-logo.svg" alt=""></a>
            </div>
          </div>
          <div class="quire-navbar-controls__center">
            <ul class="quire-navbar-page-controls" role="navigation" aria-label="quick">
              ${navBarStartButton()}
              ${navBarPreviousButton()}
              ${navBarHomeButton()}
              ${navBarNextButton()}
            </ul>
          </div>
          <div class="quire-navbar-controls__right">
            <button
              class="quire-navbar-button menu-button"
              id="quire-controls-menu-button"
              onclick="toggleMenu()"
              aria-expanded="true"
              aria-controls="quire-menu"
              tabindex="2">
              <svg data-outputs-exclude="epub,pdf">
                <switch>
                  <use xlink:href="#nav-icon"></use>
                </switch>
              </svg>
              <span class="hide-small-screen text-label">Contents</span>
            </button>
            <button
              class="quire-navbar-button search-button"
              aria-controls="quire-search"
              onclick="toggleSearch()">
              <svg data-outputs-exclude="epub,pdf">
                <switch>
                  <use xlink:href="#search-icon"></use>
                </switch>
              </svg>
              <span class="hide-small-screen text-label">Search</span>
            </button>
          </div>
        </nav>
      </div>
    `
  }
}
