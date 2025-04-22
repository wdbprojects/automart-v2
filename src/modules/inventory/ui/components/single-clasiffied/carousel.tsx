"use client";

import { useCallback, useState } from "react";
import { Image as PrismaImage } from "@prisma/client";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/virtual";
import { EffectFade, Navigation, Thumbs, Virtual } from "swiper/modules";
import { type Swiper as SwiperType } from "swiper";
import dynamic from "next/dynamic";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import SwiperButtons from "./swiper-buttons";

interface ClassifiedCarouselProps {
  images: PrismaImage[];
}

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => {
    return <div>Loading...</div>;
  },
});

const SwiperThumb = dynamic(
  () => import("swiper/react").then((mod) => mod.Swiper),
  {
    ssr: false,
    loading: () => null,
  },
);

const ClassifiedCarousel = ({ images }: ClassifiedCarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  return (
    <div className="relative">
      <Swiper
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        effect="fade"
        spaceBetween={10}
        fadeEffect={{ crossFade: true }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[EffectFade, Navigation, Thumbs, Virtual]}
        virtual={{ addSlidesAfter: 8, enabled: true }}
        className="aspect-3/2"
        onSlideChange={handleSlideChange}
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide key={image.id} virtualIndex={index}>
              <Image
                blurDataURL={image.blurhash}
                src={image.src}
                alt={image.alt}
                width={1200}
                height={800}
                placeholder="blur"
                className="aspect-3/2 object-cover rounded-md cursor-pointer"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <SwiperButtons
        prevClassName="left-4 !bg-background/70 border-none"
        nextClassName="right-4 !bg-background/70 border-none"
      />
    </div>
  );
};

export default ClassifiedCarousel;
