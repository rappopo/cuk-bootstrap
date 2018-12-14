'use strict'

module.exports = function (cuk) {
  const { _, helper, config } = cuk.pkg.core.lib
  const cfg = config('bootstrap')
  return new Promise((resolve, reject) => {
    _.each(helper('core:pkgs')(), p => {
      let themes = _.get(p, 'cfg.cuks.bootstrap.themes')
      if (themes) {
        cfg.themes = _.concat(cfg.themes || [], themes)
      }
    })
    resolve(true)
  })
}
