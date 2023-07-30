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
    autoplay: true,
    autoplaySpeed: 3000, 
  };

  const slideStyle = {
    width: '70%',
    height: '600px', 
    margin: '0 auto', 
  };

  const sliderStyle = {
    margin: '0 auto', 
    width: '80%', 
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
