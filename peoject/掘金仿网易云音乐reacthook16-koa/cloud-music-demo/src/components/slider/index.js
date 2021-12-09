/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-11-25 11:06:52
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-11-25 13:10:57
 */
import React, { useEffect, useState } from 'react'

import { SliderContainer } from './style'
import "swiper/dist/css/swiper.css";

import { withRouter } from 'react-router-dom'

import Swiper from "swiper";

function Slider(props) {
  const [sliderSwiper, setSliderSwiper] = useState(null)
  const { bannerList } = props

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let sliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: true,
        autoplayDisableOnInteraction: false,
        pagination: { el: '.swiper-pagination' },
      });
      setSliderSwiper(sliderSwiper);
    }
  }, [bannerList.length, sliderSwiper])

  const test = () => {
    console.log(props);
    console.log(props.history);
  }

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className='swiper-wrapper'>
          {
            bannerList.map(slider => {
              return (
                <div className="swiper-slide" key={slider.key} onClick={test}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

// export default React.memo(Slider)
export default withRouter(Slider)