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
    "https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/y2020-09-10-16_generated.jpg?alt=media&token=47401b95-201b-4a32-8ff6-2405d728f660",
    "https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/banner%23.jpg?alt=media&token=38c8cc51-537c-4281-be22-dfe457112524",
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
