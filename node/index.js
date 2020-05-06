const ReactDOMServer = require('react-dom/server')
const Koa = require('koa')
const mount = require('koa-mount')
const axios = require('axios')
const koaStatic = require('koa-static')
const render = require('./render.js')
const path = require('path')
const el = require('./app')
// const cache = require('koa-cache-lite')
const template = require('./template')(__dirname + '/index.htm')

const app = new Koa()
const URL = 'https://zkh-website-api-pro.zkh360.com/v1/h5'

// cache.configure({
//   '/': 5000
// }, {
//   debug: true
// })

app.use(mount('/static', koaStatic(path.join(__dirname, '../browser/build/static'))))
// app.use(mount('/assets', koaStatic(path.join(__dirname, '../assets'))))

const renderMethod = ReactDOMServer.renderToString
// const renderMethod = ReactDOMServer.renderToNodeStream

let homePageBuf = null
let cacheExpireTimer

// app.use(cache.middleware()) // 设置缓存，命中缓存直接返回，qps增加到900多

app.use(mount('/', async ctx => {
  if (homePageBuf) {
    ctx.body = homePageBuf
  } else {
    const res = await axios.get(`${URL}/home`)
    // homePageBuf = Buffer.from(render(
    //   res.data.data,
    //   renderMethod(
    //     // <First {...res.data.data} />
    //     el(res.data.data)
    //   )
    // ))

    homePageBuf = template({
      data: res.data.data,
      html: renderMethod(
        el(res.data.data)
      )
    })

    if(!cacheExpireTimer) {
      cacheExpireTimer = setTimeout(() => { // 设置3秒缓存过期时间
        homePageBuf = null
        clearTimeout(cacheExpireTimer)
      }, 3000)
    }
    ctx.body = homePageBuf
  }
  ctx.status = 200
  ctx.type = 'html'
}))

// use Cache
// let pageCache = null
// let dataCache = ''

// app.use(async ctx => {
//   let res = null
//   const start = Date.now()
//   try {
//     res = await axios.get(`${URL}/home`)
//   } catch(err) {
//     ctx.status = 500
//   }
//   const end = Date.now()
//   // console.log(end - start)
//   ctx.status = 200
//   const lastestData = JSON.stringify(res.data.data) // JSON.stringify性能很差
//   ctx.type = 'html'
//   if (dataCache === lastestData && pageCache) {
//     ctx.body = pageCache
//   } else {
//     pageCache = Buffer.from(render(
//       res.data.data,
//       ReactDOMServer.renderToString(
//         // <First {...res.data.data} />
//         el(res.data.data) // 这里注意不行传入jsx，只能是react element
//       )
//     ))
//     dataCache = lastestData
//     ctx.body = pageCache
//   }
// })

app.listen(3000)
