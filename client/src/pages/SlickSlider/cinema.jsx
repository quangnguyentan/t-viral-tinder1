import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function CustomSlide({ collection, currentData }) {
  var settings = {
    className: "center",
    centerMode: true,
    // dots: false,
    infinite: true,
    centerPadding: "25px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {collection &&
          collection?.map((col) => (
            <Link
              key={col?._id}
              to={`/video/${col?.title.replace(/ /g, "_")}/${col?._id}/${
                currentData?._id
              }`}
              className="relative w-full"
            >
              <div className="w-[90%] h-[152px] object-cover">
                <img
                  src={`https://sv.sexyloveeu.com/images/${col?.image}`}
                  // src={
                  //   `http://localhost:8080/images/${col?.image}`
                  //     ? `http://localhost:8080/images/${col?.image}`
                  //     : ` https://server-t-viral.onrender.com/images/${col?.image}`
                  // }
                  className="w-full h-full rounded-xl object-fill"
                  alt=""
                />
              </div>

              <div className="absolute bottom-0 ">
                <div className="flex items-center px-4 bg-[rgba(0,0,0,.4)] w-[300px] justify-between">
                  <span className="text-white">{col?.title}</span>
                  <span className="text-white">{col?.view?.length}</span>
                </div>
              </div>
            </Link>
          ))}
      </Slider>
    </div>
  );
}
