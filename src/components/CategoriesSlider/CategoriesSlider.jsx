import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { baseUrl } from "./../../utils/baseUrl";
import { Link } from "react-router-dom";

export default function CategoriesSlider() {
  // baseurl https://ecommerce.routemisr.com

  function getCategories() {
    return axios.get(`${baseUrl}/categories`);
  }

  let { data } = useQuery("getCategories", getCategories);

  var settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <>
      <div className="container my-5 ">
        <h2 className="h3 mb-3">Shop popular Categories</h2>
        <Slider {...settings}>
          {data?.data?.data.map((item) => (
            <div key={item._id} className="p-1">
              <img
                src={item.image}
                alt={item.name}
                className="d-block w-100 rounded-2 object-fit-cover"
                height={200}
                // width={150}
              />

              <h5 className="text-center">
                <Link
                  className="font-sm fw-bold  text-main"
                  to={`/products/category/${item.name}/${item._id}`}
                >
                  {item.name}
                </Link>
              </h5>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
