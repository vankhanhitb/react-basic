import { useRef } from 'react'

import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination, Navigation } from "swiper/modules";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';

import {
  heroSlides, 
  type HeroSlide
} from "../../data/data-store";

gsap.registerPlugin(useGSAP);

type HeroSlideshowProps = {
  slides?: HeroSlide[]
}

function getSlideElements(slide: HTMLElement) {
  return {
    eyebrow: slide.querySelector<HTMLElement>(
      "[data-hero-eyebrow]"
    ),
    title: slide.querySelector<HTMLElement>(
      "[data-hero-title]"
    ),
    description: slide.querySelector<HTMLElement>(
      "[data-hero-description]"
    ),
    button: slide.querySelector<HTMLElement>(
      "[data-hero-button]"
    )
  }
}

function prepareSlide(slide: HTMLElement) {
  const {
    eyebrow,
    title,
    description,
    button,
  } = getSlideElements(slide);

  gsap.killTweensOf([
    eyebrow,
    title,
    description,
    button
  ])

  //Eyebrow come from down to up
  gsap.set(eyebrow, {
    y: 24,
    x: 0,
    autoAlpha: 0
  });

  // Title
  gsap.set(title, {
    x: -70,
    y: 0,
    autoAlpha: 0
  });

  // Description and button
  gsap.set([description, button], {
    y: 40,
    x: 0,
    autoAlpha: 0
  });
}

export default function HeroSlider({
  slides = heroSlides
}: HeroSlideshowProps) {
  
  const rootRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /**
   * contextSafe help animation created in Swiper events
   * belong to GSAP context and will be cleanup when element unmount
   */

  const { contextSafe } = useGSAP({
    scope: rootRef
  })

  const prepareActiveSlide = (swiper: SwiperType) => {
      contextSafe(() => {
        timelineRef.current?.kill();

        const activeSlide =
          swiper.slides[swiper.activeIndex];

        if (!activeSlide) return;

        prepareSlide(activeSlide);
      })();
    };

  const animateActiveSlide =(swiper: SwiperType) => {
      contextSafe(() => {
        const activeSlide =
        swiper.slides[swiper.activeIndex];

        if (!activeSlide) return;

      const {
        eyebrow,
        title,
        description,
        button
      } = getSlideElements(activeSlide);

      const elements = [
        eyebrow,
        title,
        description,
        button
      ].filter(Boolean);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      timelineRef.current?.kill();

      if (reduceMotion) {
        gsap.set(elements, {
          x: 0,
          y: 0,
          autoAlpha: 1
        });

        return;
      }

      timelineRef.current = gsap
        .timeline({
          defaults: {
            ease: "power3.out"
          }
        })
        .to(eyebrow, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8
        })
        .to(
          title,
          {
            x: 0,
            autoAlpha: 1,
            duration: 1
          },
          "-=0.25"
        )
        .to(
          description,
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.2
          },
          "-=0.4"
        )
        .to(
          button,
          {
            y: 0,
            autoAlpha: 1,
            duration: .9
          },
          "-=0.3"
        );
    })();
  }

  const initializeSlider = (swiper: SwiperType) => {
      contextSafe(() => {
        // Chuẩn bị trạng thái ban đầu cho tất cả slide.
        swiper.slides.forEach((slide) => {
          prepareSlide(slide);
        });

        // Chạy animation cho slide đầu tiên.
        animateActiveSlide(swiper);
      })();
    };

  return (
    <section
      ref={rootRef}
      aria-label="Featured promotions"
      className="relative overflow-hidden"
    >
      <Swiper
        modules={[Autoplay, Pagination, A11y, Navigation]}
        slidesPerView={1}
        speed={900}
        loop={slides.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true
        }}
        pagination={{
          clickable: true
        }}
        navigation
        onAfterInit={initializeSlider}
        onSlideChangeTransitionStart={
          prepareActiveSlide
        }
        onSlideChangeTransitionEnd={
          animateActiveSlide
        }
        className="
          h-[520px]
          md:h-[620px]
          lg:h-[720px]
          [&_.swiper-pagination-bullet]:h-4!
          [&_.swiper-pagination-bullet]:w-4!
          [&_.swiper-pagination-bullet]:bg-white!
          [&_.swiper-pagination-bullet]:opacity-50
          [&_.swiper-pagination-bullet-active]:w-8
          [&_.swiper-pagination-bullet-active]:rounded-full
          [&_.swiper-pagination-bullet-active]:opacity-100
          [&_.swiper-button-prev]:left-auto!
          [&_.swiper-button-prev]:right-16!
          [&_.swiper-button-prev]:top-auto!
          [&_.swiper-button-prev]:bottom-6!
          [&_.swiper-button-prev]:size-8!
          [&_.swiper-button-prev]:text-white!

          [&_.swiper-button-next]:right-6!
          [&_.swiper-button-next]:top-auto!
          [&_.swiper-button-next]:bottom-6!
          [&_.swiper-button-next]:size-8!
          [&_.swiper-button-next]:text-white!
        "
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <article className="relative h-full">
              <img
                src={slide.image}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent" />

              {/* Content */}
              <div className="relative z-10 mx-auto flex h-full container items-center px-6 md:px-10 lg:px-12">
                <div className="max-w-2xl text-white">
                  <p
                    data-hero-eyebrow
                    className="invisible opacity-0 text-sm font-semibold uppercase tracking-[0.25em]text-white/80"
                  >
                    {slide.eyebrow}
                  </p>

                  <h2
                    data-hero-title
                    className="
                      invisible opacity-0
                      mt-4 text-4xl font-bold
                      leading-tight
                      md:text-5xl
                      lg:text-6xl
                      uppercase
                    "
                  >
                    {slide.title}
                  </h2>

                  <p
                    data-hero-description
                    className="
                      invisible opacity-0
                      mt-6 max-w-xl
                      text-base leading-7
                      text-white/80
                      md:text-lg
                    "
                  >
                    {slide.description}
                  </p>

                  <a
                    data-hero-button
                    href={slide.href}
                    className="
                      invisible opacity-0
                      mt-8 inline-flex
                      rounded-full bg-white
                      px-7 py-3
                      font-semibold text-slate-950
                      transition-colors
                      hover:bg-slate-200
                    "
                  >
                    {slide.buttonLabel}
                  </a>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
