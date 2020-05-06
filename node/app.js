import React from 'react'
import First from '../components'
import Login from '../components/login'
import { StaticRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

// export default function (reactData) {
//   return <First {...reactData} />
// }

// const React = require('react')
// const First = require('../components/index')

function el(reactData, url, context) {
  return (
    // <Provider >
      <StaticRouter location={url} context={context}>
        <Switch>
          <Route path='/' render={() => <Redirect to='/home' />} exact />
          <Route path='/home' render={() => <First {...reactData} />} />
          <Route path='/login' render={Login} />
        </Switch>
      </StaticRouter>
    // </Provider>
  )
}

module.exports = el