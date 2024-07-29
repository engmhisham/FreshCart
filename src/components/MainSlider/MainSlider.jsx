import React from "react";
import Slider from "react-slick";
import banner1 from "../../assets/images/slider/ad-banner-1.jpg";
import banner2 from "../../assets/images/slider/ad-banner-2.jpg";
import slid1 from "../../assets/images/slider/slider-image-1.jpg";
import slid2 from "../../assets/images/slider/slider-image-2.jpg";
import slid3 from "../../assets/images/slider/slider-image-3.jpg";

export default function MainSlider() {
  var settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <>
      <div className="container  my-5 py-5">
        <div className="row  g-0">
          <div className="col-md-8 mb-5 mb-md-0">
            <Slider {...settings}>
              <img src={slid1} height={400} alt="" />
              <img src={slid2} height={400} alt="" />
              <img src={slid3} height={400} alt="" />
            </Slider>
          </div>
          <div className="col-md-4">
            <img src={banner1} height={200} alt="" className="d-block w-100" />
            <img src={banner2} height={200} alt="" className="d-block w-100" />
          </div>
        </div>
      </div>
    </>
  );
}
