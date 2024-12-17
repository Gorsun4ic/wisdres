import { Swiper as SwiperInstance } from "swiper"; // Ensure this import is correct for the Swiper type
import { ReactNode, useState } from "react";
import { Thumbs as SwiperThumbs, EffectFade, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import getArrLength from "@utils/getArrLength";

import { StyledThumb } from "./style";

// @ts-expect-error Cuz it's correct swiper styles import
import "swiper/css";
// @ts-expect-error Cuz it's correct swiper styles import
import "swiper/css/thumbs";
// @ts-expect-error Cuz it's correct swiper styles import
import "swiper/css/effect-fade";

const Thumbs = ({images, bookName}: {images: string[], bookName: string}) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null); // <-- Updated type

	const imgsList = (width: number, height: number, altTitle: string): ReactNode[] =>
		images.map((item: string, index: number) => (
			<SwiperSlide key={index}>
				<img
					src={item}
					alt={`${bookName} ${altTitle} - photo ${index + 1}`}
					width={width}
					height={height}
				/>
			</SwiperSlide>
		));

	return (
		<>
			<StyledThumb>
				<div className="thumbs">
					<Swiper
						className="thumb-slider"
						onSwiper={setThumbsSwiper}
						loop={true}
						spaceBetween={10}
						mousewheel={true}
						direction="vertical"
						slidesPerView={3}
						modules={[SwiperThumbs, Mousewheel]}>
						{imgsList(100, 128, "additional")}
					</Swiper>
					<p>Additional photos ({getArrLength(images, 3)})</p>
				</div>
				<Swiper
					loop={true}
					spaceBetween={10}
					mousewheel={true}
					thumbs={{ swiper: thumbsSwiper }}
					modules={[SwiperThumbs, EffectFade, Mousewheel]}
					effect="fade"
					className="mySwiper2">
					{imgsList(290, 445, "main")}
				</Swiper>
			</StyledThumb>
		</>
	);
};

export default Thumbs;
