## 基于koa2和react实现一个h5网上商城首页的同构

![](https://github.com/zhr7777777/zkh-react-isomorphic/blob/master/README/isomorphic.gif)

## 运行

```bash
cd browser
npm run build

npm start
```
访问http://localhost:3000/

### 概述
项目实现了首页组件在服务端渲染（renderToString），在客户端注水（hydrate）用来绑定事件，也就是同构。
通过多种优化手段，比如设置页面级别缓存、混合ssr和客户端渲染实现异步加载（类似淘宝pc首页先渲染首屏结点，下拉加载由客户端渲染）。实现了减小首屏渲染时间，seo优化，提高qps的效果

### 项目结构

browser:
```javascript
├── assets                      ---------------------- 图片
├── components
│   ├── index.js                ---------------------- 首页组件
│   ├── recommends.js           ---------------------- 下拉加载的推荐组件
│   └── recommends.scss
├── App.jsx                     ---------------------- 首页入口，注入服务端挂载window上的数据
├── App.scss
├── index.js                    ---------------------- hydrate首页，render推荐组件
└── index.scss
```

node:
```javascript
├── app.js                      ---------------------- 注入数据，返回react组件的函数
├── entry.js                    ---------------------- 总入口，引入babel支持jsx，以及webpack-isomorphic-tools处理静态资源
├── index.js                    ---------------------- koa入口
├── template.js                 ---------------------- 使用模板字符串实现的模板引擎函数
└── render.js                   ---------------------- 旧的render函数
```

### 项目features
1.混合ssr和客户端渲染：

受淘宝pc首页启发，首次只渲染用户可见部分节点（ssr部分），其余以骨架屏呈现，用户下拉时使用客户端渲染，减轻服务端压力

2.使用页面缓存（qps提高一倍）

第一阶段：因为首页数据不经常变化，考虑第一次请求把数据stringify存在内存或者redis，再次请求不用调用服务端接口，减小服务端压力，提高首页返回速度。

但使用ab进行压测后，qps没什么变化，甚至有时下降。原因就是JSON.stringify太耗时，如图：

![](https://github.com/zhr7777777/zkh-react-isomorphic/blob/master/README/noCache.jpg)
![](https://github.com/zhr7777777/zkh-react-isomorphic/blob/master/README/useCache.jpg)

第二阶段：使用koa-cache-lite缓存页面并设置3秒过期，看过koa-cache-lite源码，可以自己使用setTimeout实现，不必引入包增加代码体积

最后：设置homePageBuf缓存页面Buffer，延迟3秒清除homePageBuf（Buffer比string赋值给body更快）

3.使用es6模板字符串实现的模板引擎

使用vm模块传入模板路径，动态读取模板文件。同时可以实现xss过滤，includes子模板等模板引擎常有的功能

使用with关键字，方便插值

```javascript
const templateContext = vm.createContext({
  _: function (data) {
    return String(data).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;')
  }
})

function createTemplate(templatePath) { // 
  return vm.runInContext(
    `(function render(data) {
      with (data) {
        return \`${fs.readFileSync(templatePath)}\`
      }
    })`,
    templateContext
  )
}
```

4.关于react-router和redux在服务端的渲染

由于服务端同步性，仅有一次渲染的机会。

对于多路由，每个路由初始化数据可能不同，比如首页调用http接口拿数据，登录页则没有数据源，当访问登录页时，不应该获取数据。
对于redux，每个路由store内的初始化数据也可能不相同

解决办法：
建立一个路由表，对于需要数据初始化或者store数据初始化的路由，设置一个loadData函数。服务端再渲染页面之前，调用这个函数初始化数据。
参考[react-router官方](https://reacttraining.com/react-router/web/guides/server-rendering)
参考[redux官方](https://redux.js.org/recipes/server-rendering)

