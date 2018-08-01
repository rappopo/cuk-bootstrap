'use strict'

module.exports = function(cuk) {
  const { _, helper, config } = cuk.pkg.core.lib
  let cfg = config('bootstrap')
  return new Promise((resolve, reject) => {
    _.each(helper('core:pkgs')(), p => {
      let themes = _.get(p, 'cfg.cuks.bootstrap.themes')
      if (themes) {
        cfg.themes = _.concat(cfg.themes || [], themes)
//        _.set(cuk.pkg.bootstrap, 'cfg.common.themes', cfg.themes)
      }

    })
    resolve(true)
  })
}