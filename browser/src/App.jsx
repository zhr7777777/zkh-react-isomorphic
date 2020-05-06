import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import First from './components'
import Login from './components/login'
require('./App.scss')

// const React = require('react')
// const First = require('./components')
// require('./App.scss')
const URL = 'https://zkh-website-api-pro.zkh360.com/v1/h5'
const { banners, notice, catalogs, brands, recommends } = window.initReactData

delete window.initReactData

function App() {
  // const [banners, setBanners] = useState([])
  // const [notice, setNotice] = useState('')
  // const [catalogs, setCatalogs] = useState([])
  // const [brands, setBrands] = useState([])
  // const [recommends, setRecommends] = useState([])

  // useEffect(() => {
  //   axios.get(`${URL}/home`).then(res => {
  //     console.log(res.data.data)
  //     let { banners, notice, catalogs, brands, recommends } = res.data.data
  //     setBanners(banners)
  //     setNotice(notice)
  //     setCatalogs(catalogs)
  //     setBrands(brands)
  //     setRecommends(recommends)
  //   })
  // }, [])
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' render={() => <Redirect to='/home' />} exact />
        <Route path='/home' render={() => (
          <First 
            banners={banners || []}
            notice={notice}
            catalogs={catalogs || []}
            brands={brands || []}
            recommends={recommends || []}
          />
        )} />
        <Route path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
    // <First 
    //   banners={banners || []}
    //   notice={notice}
    //   catalogs={catalogs || []}
    //   brands={brands || []}
    //   recommends={recommends || []}
    // />
  )
}

export default App;
