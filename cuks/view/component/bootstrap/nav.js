'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    if (_.isArray(params)) params = { items: params }
    if (!params.id) params.id = 'cmpt-nav-' + helper('core:makeId')()
    let cls = lib.cls(params, null, {
      vertical: p => `flex-${_.isString(p) ? (p + '-') : ''}column`,
      tab: `nav-tabs`,
      pill: `nav-pills`,
      fill: `nav-fill`,
      justified: `nav-justified`
    })
    params.verticalWidth = params.verticalWidth || '3:9'
    if (params.vertical) params.verticalWidth = _.isArray(params.verticalWidth) ? params.verticalWidth : params.verticalWidth.split(':')
    if (_.isPlainObject(params.items)) {
      let arr = []
      _.forOwn(params.items, (v, k) => {
        arr.push({ href: k, title: v })
      })
      params.items = arr
    }
    let panes = _.without(_.map(params.items, i => _.isEmpty(i.content) ? null : i), null)
    let isValidPanes = panes.length === params.items.length
    let header = ''
    if (isValidPanes && !params.ulTag) {
      header = `<nav><div class="nav ${cls}" ${lib.attr(params, ['id', 'style', 'rel'])} `
    } else {
      header = `<${params.ulTag ? 'ul' : 'nav'} class="nav ${cls}" ${lib.attr(params, ['id', 'style', 'rel'])} `
    }
    if (isValidPanes) header += `role="tablist" `
    if (isValidPanes && !params.ulTag) {
      header += `</div>\n`
    } else {
      header += `>\n`
    }
    _.each(params.items, (item, i) => {
      if (_.isString(item)) item = { title: item }
      let id = item.id || (params.id + '-' + i)
      if (params.ulTag) header += `<li class="nav-item${item.menu ? ' dropdown' : ''}">`
      header += `<a id="${id}-tab" class="${item.menu ? 'dropdown-toggle ' : ''} `
      let cls = lib.cls(item, ['active', 'disabled']) || ''
      header += `${params.ulTag ? 'nav-item ' : ''}nav-link ${cls}" `
      let href = '#'
      if (item.menu) {
        header += `data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" `
      } else if (isValidPanes) {
        href = `#${id}-pane`
        header += `data-toggle="tab" role="tab" aria-controls="${id}-pane" aria-selected="${item.active ? 'true' : 'false'}" `
      }
      header += `href="${href}">${item.title || ''}</a>`
      if (item.menu) header += cmpt('menu', item.menu, ctx)
      if (params.ulTag) header += `</li>\n`
    })
    if (isValidPanes && !params.ulTag) {
      header += `</div>\n</nav>\n`
    } else {
      header += `</${params.ulTag ? 'ul' : 'nav'}>\n`
    }
    let tabs = ''
    if (isValidPanes) {
      tabs += `<div class="tab-content" id="${params.paneId || (params.id + '-pane')}" role="tablist">\n`
      _.each(panes, (p, i) => {
        let id = p.id || (params.id + '-' + i)
        tabs += `<div class="tab-pane ${p.active ? 'show active' : ''}" `
        tabs += `id="${id}-pane" `
        tabs += `role="tabpanel" aria-labelledby="${id}-tab">\n`
        tabs += `${p.content}\n</div>\n`
      })
      tabs += `</div>\n`
    }
    if (!isValidPanes) return header
    if (!params.vertical) return header + tabs
    return cmpt('grid', {
      rows: [
        [
          { width: params.verticalWidth[0], content: header },
          { width: params.verticalWidth[1], content: tabs }
        ]
      ]
    })
  }
}
