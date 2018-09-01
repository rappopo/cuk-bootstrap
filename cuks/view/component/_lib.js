'use strict'

module.exports = function (cuk) {
  const { _, util, helper } = cuk.pkg.core.lib

  return {
    attr: (params, caller, picked) => {
      if (_.isArray(caller)) {
        picked = caller
        caller = null
      }
      picked = _.uniq(_.concat(['id', 'style', 'rel'], picked || []))
      let attrs = ''
      if (params.name && caller && !params.id) params.id = `cmpt-${caller}-${params.name}`
      // handle subs
      _.each(['data', 'aria'], s => {
        params[s] = params[s] || {}
        _.forOwn(params, (v, k) => {
          let keys = _.snakeCase(k).split('_')
          if (keys.length > 1 && keys[0] === s) {
            _.drop(keys)
            params[s][keys.join('-')] = v
          }
        })
      })
      // handle tooltips & popover
      _.each(['tooltip', 'popover'], t => {
        params[t] = params[t] || {}
        if (!_.isEmpty(params[t])) {
          params.data = _.merge(params.data || {}, {
            toggle: t,
            placement: params.tooltip.dir || 'top'
          })
          if (params[t].title) attrs += `title="${params[t].title}" `
        }
      })
      if (!_.isEmpty(params.popover)) {
        params.data.content = params.popover.content
        if (params.popover.container) params.data.container = params.popover.container
        if (!params.popover.noDismiss) params.data.trigger = 'focus'
      }
      // generate attrs
      _.forOwn(_.pick(params, picked), (v, k) => {
        if (_.isPlainObject(v)) return
        attrs += `${k}="${v}" `
      })
      _.each(['data', 'aria'], s => {
        if (!_.isEmpty(params[s])) {
          _.forOwn(params[s], (v, k) => {
            attrs += `${s}-${k}="${v}" `
          })
        }
      })
      helper('core:objectDelProp')(params, ['tooltip', 'popover', 'data', 'aria'])
      return _.trim(attrs)
    },
    cls: (params, picked = [], added = {}) => {
      let all = {
        cls: '%s',
        textSize: 'btn-%s',
        textColor: 'text-%s',
        context: 'btn-%s',
        disabled: 'disabled',
        active: 'active',
        align: 'justify-content-%s',
        outline: p => {
          if (!params.context) return ''
          return 'btn-' + (p ? 'outline-' : '') + params.context
        }
      }
      all = _.merge(all, added)
      if (picked && picked.length > 0) all = _.pick(all, picked)
      // if (!params.aTag) helper('core:objectDelProp')(all, ['disabled', 'active'])
      let cls = ''
      _.forOwn(all, (v, k) => {
        if (params[k]) {
          if (_.isFunction(v)) {
            cls += v(params[k]) + ' '
          } else if (_.isString(params[k])) {
            cls += `${util.format(v, params[k])} `
          } else {
            cls += `${v} `
          }
        }
      })
      return _.trim(cls)
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
