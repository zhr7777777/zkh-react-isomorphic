import React, { useState, useEffect } from "react"
import axios from 'axios'
require('./recommends.scss')

let pageIndex = 1
const pageSize = 10

const Recommends = () => {
  const [loadingMore, setLoadingMore] = useState(true)
  const [recommends, setRecommends] = useState([])

  const scrollHandler = () => {
    // const clientHeight = document.body.clientHeight || document.documentElement.clientHeight // document.body.clientHeight可能会等于scrollHeight
    if(loadingMore) {
      const clientHeight = document.documentElement.clientHeight
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
      if (scrollHeight === scrollTop + clientHeight) {
        retrieveRecommends()
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  })

  const retrieveRecommends = () => {
    axios.get(`https://zkh-website-api-pro.zkh360.com/h5/recommend?pageIndex=${pageIndex}&pageSize=${pageSize}`).then(res => {
      const { stateCode, data } = res.data
      if (stateCode === 0 && data.recommends.length) {
        const { totalPage } = data
        setRecommends([...recommends, ...data.recommends ])
        if(pageIndex + 1 >= totalPage) {
          setLoadingMore(false)
          window.removeEventListener('scroll', scrollHandler)
        }
        pageIndex++
      }
    })
  }

  return (
    <>
      <ul className="recommend">
        {
          recommends.map(e => {
            return (
              <li className="recommend-item" key={e.goodsId}>
                <img src={e.goodsThumb} alt="" />
                <div className="text">
                  <p className="name">{e.goodsName.length > 27 ? e.goodsName.slice(0, 27) + '...' : e.goodsName}</p>
                  {e.goodsPrice && e.goodsPrice > 0 ? (<p className="price">￥{e.goodsPrice}</p>) : (<p className="price ask">待询价</p>)}
                  <p className="original-price">¥{Number(e.goodsOrgPrice).toFixed(2)}</p>
                </div>
              </li>
            )
          })
        }
      </ul>
      {
        loadingMore && (
          <div className='loading-more'>
            <img src={require('../assets/loading.gif')} alt='' />
          </div>
        )
      }
      {
        !loadingMore && (
          <div style={{ height: 50 }}></div>
        )
      }
    </>
  );
}

export default Recommends;
