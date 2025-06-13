import React,{useRef,useEffect} from 'react'
import Slider from 'react-slick'
import hero from '../assets/Banner.jpg'
import banner2 from '../assets/banner2.jpg'
import banner3 from '../assets/banner3.jpg'
import banner4 from '../assets/banner4.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos'
import 'aos/dist/aos.css';

function HeroSection() {

    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll:1,
        autoplay: true,
        autoplaySpeed: 3000,
        initialSlide: 0
    };

    useEffect(() => {
        setTimeout(() => {
            if (sliderRef.current) {
                sliderRef.current.slickNext();
            }
        }, 100);
    }, []);

     useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: false,
          mirror:true
         })
      },[]);

    const images = [hero,banner2,banner3,banner4]

    return (
        <div
            data-aos="fade-up"
        >
        <div className="bg-gray-100 py-10 px-4 text-center">
            <div className="w-full max-w-screen-xl mx-auto">
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Slide${index + 1}`}
                                className="w-full xl:h-96  object-containy rounded-lg shadow-md"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-6"
            >Get 50% Off on All Products!</h1>
            <p
                className="text-gray-600 mt-2 text-lg sm:text-xl"
            >Limited Time Offer - Shop Now</p>
        </div>
        </div>
    );
}

export default HeroSection;