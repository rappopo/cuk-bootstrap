'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    if (_.isArray(params)) params = { content: params }
    let attr = lib.attr(params)
    params.content = _.isArray(params.content) ? params.content : [params.content]
    let content = `<div class="carousel slide ${params.crossfade ? 'carousel-fade' : ''}" data-ride="carousel" ${attr}>\n`
    if (params.indicator && params.id) {
      content += `<ol class="carousel-indicators">\n`
      _.each(params.content, (c, i) => {
        content += `<li data-target="#${params.id}" data-slide-to="${i}" ${i === 0 ? 'class="active"' : ''}></li>\n`
      })
      content += `</ol>\n`
    }
    content += '<div class="carousel-inner">\n'
    _.each(params.content, (c, i) => {
      if (c.holder) c.src = 'holder.js/' + (_.isString(c.holder) ? c.holder : `100px300?text=${c.alt || ''}`)
      content += `<div class="carousel-item ${i === 0 ? 'active' : ''}">\n`
      content += `<img class="d-block w-100" data-src="${c.src}" alt="${c.alt || ''}">\n`
      if (params.caption) {
        content += `<div class="carousel-caption d-none d-md-block">\n`
        content += `<h5>${c.title || c.alt || ''}</h5>\n`
        if (c.content) content += `<p>${c.content || ''}</p>\n`
        content += `</div>\n`
      }
      content += `</div>\n`
    })
    content += '</div>\n'
    if (params.control && params.id) {
      content += `<a class="carousel-control-prev" href="#${params.id}" role="button" data-slide="prev">\n`
      content += `<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a>\n`
      content += `<a class="carousel-control-next" href="#${params.id}" role="button" data-slide="next">\n`
      content += `<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>\n`
    }
    content += '</div>\n'
    return content
  }
}
