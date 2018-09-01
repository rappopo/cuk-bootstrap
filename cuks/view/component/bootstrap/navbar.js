'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    let attr = lib.attr(params)
    let id = params.id || ('cmpt-navbar-' + helper('core:makeId')())
    let content = `<nav ${attr} class="navbar${params.collapseAlways ? '' : ' navbar-expand-lg'} `
    content += `navbar-${params.dark ? 'dark' : 'light'} `
    if (params.fixed && !params.sticky) content += `fixed-${params.fixed} `
    if (params.sticky && !params.fixed) content += `sticky-top `
    content += `bg-${params.context || 'light'} `
    content += `">\n`
    let tmps = []
    if (_.isArray(params)) params = { content: params }
    _.each(params.content, c => {
      let tmp = ''
      switch (c.type) {
        case 'brand':
          tmp += `<a class="navbar-brand" href="${c.href || '#'}">${c.content || ''}</a>\n`
          break
        case 'form':
          tmp += `<form class="form-inline ${c.cls || ''}">\n`
          if (_.isString(c.content)) {
            tmp += c.content
          } else {
            if (_.isPlainObject(c.content)) c.content = [c.content]
            _.each(c.content, item => {
              tmp += cmpt(item.type || 'input', item, ctx)
            })
          }
          tmp += `</form>\n`
          break
        case 'nav':
          let items = []
          _.each(c.items, i => {
            if (_.isPlainObject(i)) i = _.omit(i, ['content'])
            items.push(i)
          })
          tmp += cmpt('nav', {
            ulTag: true,
            navbar: true,
            cls: c.cls,
            items: items
          })
          break
        case 'text':
          tmp += `<span class="navbar-text ${c.cls}">${c.content || ''}</span>\n`
          break
      }
      tmps.push({ collapse: !!c.collapse, content: tmp })
    })
    if (params.collapse) {
      let collapsed = _.filter(tmps, { collapse: true })
      let notCollapsed = _.filter(tmps, { collapse: false })
      let collapseId = params.collapseId || (id + '-collapse')
      let toggler = `<button class="navbar-toggler" type="button" data-toggle="collapse" `
      toggler += `data-target="#${collapseId}" aria-control="${collapseId}" aria-expanded="false" `
      toggler += `aria-label="Toggle Navigation">\n`
      toggler += `<span class="navbar-toggler-icon"></span>\n</button>\n`
      let wrapper = `<div class="collapse navbar-collapse" id="${collapseId}">\n`
      if (params.collapse === 'right') {
        content += _.map(notCollapsed, 'content').join('') + toggler + wrapper + _.map(collapsed, 'content').join('') + '</div>\n'
      } else if (params.collapse === true || params.collapse === 'left') {
        content += toggler + _.map(notCollapsed, 'content').join('') + wrapper + _.map(collapsed, 'content').join('') + '</div>\n'
      } else {
        // todo: external wrapper
        wrapper = ''
      }
    } else {
      content += _.map(tmps, 'content').join('')
    }
    content += `</nav>\n`
    return content
  }
}
