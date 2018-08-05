'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib

  return {
    attr: (params, caller, picked) => {
      if (_.isArray(caller)) {
        picked = caller
        caller = null
      }
      picked = picked || ['id', 'name', 'value', 'disabled', 'readonly', 'style', 'for', 'rel']
      let text = ''
      let data = params.data || {}
      if (params.tt) {
        data['toggle'] = 'tooltip'
        data['placement'] = params.ttDir || 'top'
        text += ` title="${params.tt}" `
      } else if (params.po) {
        data['toggle'] = 'popover'
        data['placement'] = params.poDir || 'top'
        data['content'] = params.po
        if (params.poContainer) data['container'] = params.poContainer
        if (params.poTitle) text += ` title="${params.poTitle}" `
        if (!params.poNoDismiss) data['trigger'] = 'focus'
      }
      params = _.omit(params, ['data', 'tt', 'ttDir', 'po', 'poDir', 'poContainer', 'poTitle', 'poNoDismiss'])
      params = _.pick(params, picked)
      if (params.name && caller && !params.id) params.id = `cmpt-${caller}-${params.name}`

      _.forOwn(params, (v, k) => {
        if (k.substr(0, 4) === 'aria') k = 'aria-' + k.substr(4).toLowerCase()
        text += (v === true ? `${k} ` : `${k}="${v}" `)
      })
      _.forOwn(data, (v, k) => {
        text += `data-${k}="${v}" `
      })
      return _.trim(text)
    },
    attrFromParent: (tag, params, props) => {
      let newParams = {}
      _.each(props, item => {
        if (params[item]) {
          const key = item.substr(0, tag.length) === tag ? _.lowerFirst(item.substr(tag.length)) : item
          newParams[key] = params[item]
        }
        delete params[item]
      })
      return newParams
    }
  }
}