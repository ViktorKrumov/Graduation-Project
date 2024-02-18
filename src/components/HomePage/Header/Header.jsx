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
    "https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/vecteezy_black-friday-sale-banner-modern-minimal-design-with-black_14471835.jpg?raw=true",
    "https://img.freepik.com/free-vector/black-friday-sale-attractive-modern-banner-design_1017-34753.jpg",
    "https://www.thepavilions.co.uk/wp-content/uploads/2017/03/BW4654-The-Pavilions-Uxbridge-Black-Friday-Web-Banner-AW.jpg",
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
