import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Header.css";

const Header = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
    "https://i.pinimg.com/736x/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg",
    "https://img.freepik.com/premium-psd/special-office-discount-shopping-post-design-black-friday_351527-1209.jpg",
    "https://img.freepik.com/premium-psd/social-media-banner-design-with-3d-rendering-shopping-instrument_351527-1226.jpg",
  ];

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Slider Image ${index + 1}`}
            style={{ width: "100%", maxHeight: "550px" }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default Header;
