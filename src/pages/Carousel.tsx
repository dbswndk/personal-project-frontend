import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동으로 슬라이딩하도록 설정
    autoplaySpeed: 3000, 
  };

  const slideStyle = {
    width: '70%', // 이미지의 가로 너비를 조정합니다.
    height: '600px', // 이미지의 세로 높이를 조정합니다.
    margin: '0 auto', // 슬라이더 내에서 가운데 정렬합니다.
  };

  const sliderStyle = {
    margin: '0 auto', // 슬라이더의 가운데 정렬을 유지합니다.
    width: '80%', // 슬라이더의 가로 너비를 조정합니다.
  };

  return (
    <div className='carousel'>
      <Slider {...settings}>
        <div>
          <img src='/image1.jpg' style={slideStyle} alt='Slide 1' />
        </div>
        <div>
          <img src='/image2.jpg' style={slideStyle} alt='Slide 2' />
        </div>
        <div>
          <img src='/image3.jpg' style={slideStyle} alt='Slide 3' />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
