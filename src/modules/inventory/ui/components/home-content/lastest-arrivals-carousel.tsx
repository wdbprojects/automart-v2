"use client";

import { Prisma } from "@prisma/client";
import dynamic from "next/dynamic";
import SkeletonCard from "@/components/shared/skeleton-card";
import { Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { ClassifiedCard } from "../inventory-content/classified-card";
import SwiperButtons from "../single-clasiffied/swiper-buttons";
import "swiper/css";

interface CarouselProps {
  classifieds: Prisma.ClassifiedGetPayload<{ include: { images: true } }>[];
  favourites: number[];
}

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
        {[1, 2, 3].map((index) => {
          return <SkeletonCard key={index} />;
        })}
      </div>
    );
  },
});

const LatestArrivalsCarousel = (props: CarouselProps) => {
  const { classifieds, favourites } = props;

  return (
    <div className="mt-8 relative">
      <Swiper
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        modules={[Navigation]}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1530: { slidesPerView: 4 },
        }}
      >
        {classifieds.map((classified) => {
          return (
            <SwiperSlide key={classified.id}>
              <ClassifiedCard classified={classified} favourites={favourites} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <SwiperButtons
        prevClassName="swiper-button-prev -left-10 sm:-left-16 border-2 border-border hidden lg:flex"
        nextClassName="swiper-button-next -right-10 sm:-right-16 border-2 border-border hidden lg:flex"
      />
    </div>
  );
};

export default LatestArrivalsCarousel;
