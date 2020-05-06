import React from 'react';
import { Carousel } from 'antd-mobile'
import topIcSearch from '../browser/src/assets/topIcSearch.png'
import searchIc from '../browser/src/assets/searchIc.png'

const dotStyle = {
  display: 'block',
  width: 10,
  height: 4,
  margin: '0 3',
  background: '#fff',
  opacity: 0.5,
  borderRadius: 'unset'
}

class First extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCate: 0
    }
  }

  render() {
    const { activeCate } = this.state
    let { banners, notice, catalogs, brands, recommends } = this.props
    banners = banners || []
    catalogs = catalogs || []
    brands = brands || []
    recommends = recommends || []
    return (
      <div className="home-page">
        <div className="search">
          <img src={topIcSearch} alt="" className="list-icon" />
          <div className="search-wrapper">
            <img src={searchIc} alt="" />
            <p>请输入产品名称、品牌、型号、SKU号</p>
          </div>
          <p className="to-login">登录</p>
        </div>

        <div style={{ margin: 10 }}>
          <Carousel
            autoplay
            infinite
            // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            // afterChange={index => console.log('slide to', index)}
            dotStyle={dotStyle}
            dotActiveStyle={Object.assign({}, dotStyle, { opacity: 1 })}
          >
            {
              banners.map(e => (
                <img
                  key={e.bannerImg}
                  src={e.bannerImg}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top', height: 200, display: 'inline-block' }}
                />
              ))
            }
          </Carousel>
        </div>
        {
          (notice && notice.length !== 0) && (
            <div className="marquee">
              <p>通知：</p>
              <div className="marquee-content">
                <p style={{ width: notice[0].noticeContent.length * 14, animationDuration: `${notice[0].noticeContent.length / 3}s` }}>{notice[0].noticeContent}</p>
              </div>
            </div>
          )
        }
        <div className="categorys">
          {
            catalogs.map((e, i) => {
              return (
                <div className="category" key={e.proCatalogId} onClick={() => this.setState({ activeCate: i })}>
                  <img src={activeCate === i ? e.imagePath : e.grayImagePath} alt="" />
                  <p>{e.catalogName}</p>
                </div>
              )
            })
          }
        </div>

        <div className={'category-subs'}>
          {
            catalogs.length ? catalogs[activeCate].children.map(e => {
              return (
                <div key={e.proCatalogId} className={'category-sub'}>
                  <img src={e.imagePath} alt='' />
                  <p>{e.catalogName.length > 4 ? `${e.catalogName.slice(0, 4)}...` : e.catalogName}</p>
                </div>
              )
            }) : null
          }
        </div>

        <div className="brands">
          <h2>热门品牌</h2>
          <div className="brand">
            {
              brands.map(e => {
                return (
                  <div className="brand-item" key={e.brandId} >
                    <img src={e.brandImg} alt="" />
                    <p>{e.brandName}</p>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="recommends">
          <h2>热销单品</h2>
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
        </div>
      </div>
    )
  }
}

export default First