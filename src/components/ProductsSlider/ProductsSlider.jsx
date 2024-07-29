/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { baseUrl } from "../../utils/baseUrl";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";

export default function ProductsSlider({ categoryId, title }) {
  const [isLoading, setIsLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);

  async function getProductsByCategoryId() {
    try {
      let { data } = await axios.get(
        `${baseUrl}/products?category[in]=${categoryId}`
      );
      setProductsList(data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (categoryId != null) {
      getProductsByCategoryId();
    }
  }, [categoryId]);

  let settings = {
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
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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

  if (isLoading) return <Loading />;

  return (
    <>
      {productsList.length > 0 ? (
        <div className="bg-light">
          <div className="container py-5 mt-5">
            <h2 className="h3">{title}</h2>
            <Slider {...settings}>
              {productsList.map((item) => (
                <div key={item._id} className="px-3">
                  <Product inSlid="true" item={item} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : null}
    </>
  );
}
