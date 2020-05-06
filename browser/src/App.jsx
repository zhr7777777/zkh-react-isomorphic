import React from 'react'
import First from './components'
require('./App.scss')

// const React = require('react')
// const First = require('./components')
// require('./App.scss')
const URL = 'https://zkh-website-api-pro.zkh360.com/v1/h5'
const { banners, notice, catalogs, brands, recommends } = window.initReactData

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
    <First 
      banners={banners || []}
      notice={notice}
      catalogs={catalogs || []}
      brands={brands || []}
      recommends={recommends || []}
    />
  )
}

export default App;
