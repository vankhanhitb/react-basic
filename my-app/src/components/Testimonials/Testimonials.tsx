import React from 'react';
import { dataTestimonial } from "../../data/testimonial";

import { A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

import { FiCheckCircle } from "react-icons/fi";

export default function Testimonials() {
  return (
    <div>
      <div className="testimonial__heading container m-auto mt-20">
        <h3 className="mb-8 text-3xl uppercase text-black font-800">How the clent talk about us? </h3>
      </div>
      <div className="testimonial__items container m-auto">
        <Swiper
          modules={[A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.09}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
          }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {
            dataTestimonial.map((testimonial) => (
              <SwiperSlide className="product-list__slide" key={testimonial.name}>
                <div className="testimonial__item w-full md:max-w-[80%] m-auto flex flex-col md:flex-row gap-3 justify-center items-center">
                  <div className="testimonial__item-media">
                    <img src={testimonial.banner} alt="Banner Image" className="w-full object-center border border-gray-300 rounded-lg shadow-md insert-1" />
                  </div>
                  <div className="testimonial__item-comment ml-0 md:ml-2">
                    <div className="text-xl md:text-2xl leading-4xl italic text-justify tracking-wide font-300">
                      {testimonial.comment}
                    </div>
                    <div className="testimonial__item-content mt-10 flex justify-start items-center gap-2">
                      <img src={testimonial.image} alt="" className="w-20 h-auto rounded-full border border-gray-200 p-1 shadow-md" />
                      <div className="testimonial__item-info">
                        <h3 className="text-xl font-700">{testimonial.name}</h3>
                        <p className="flex justify-start items-center gap-2 text-sm font-bold text-gray-400"><FiCheckCircle className="bg-green-700 text-white rounded-full" /> Verify Byer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}
