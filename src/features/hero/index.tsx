import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";

import { StyledHero } from "./style";

import useWindowDimensions from "@hooks/useWindowDimensions";
import { useTranslation } from "react-i18next";

const Hero = () => {
	const sizes = useWindowDimensions();
	const { t } = useTranslation();
	const width = sizes.width;
	let slidesPerView = 5;

	if (width >= 1200) {
		slidesPerView = 10;
	} else if (width >= 992) {
		slidesPerView = 8;
	} else if (width >= 680) {
		slidesPerView = 6;
	}

	return (
		<StyledHero>
			<h1 className="visually-hidden">{t("heroFull")}</h1>
			<div className="top">
				<span>{t("heroFirst")}</span>
				{width >= 768 && (
					<Swiper
						// install Swiper modules
						modules={[Autoplay]}
						spaceBetween={16}
						slidesPerView={slidesPerView}
						autoplay={{ delay: 0, disableOnInteraction: false }}
						allowTouchMove={false}
						speed={3000}
						loop={true}>
						<SwiperSlide>
							<img
								src="https://m.media-amazon.com/images/I/6158m1qLqFL._AC_UF1000,1000_QL80_.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://static.yakaboo.ua/media/catalog/product/g/o/good-to-great_new.800x800.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/i/m/img306_1_45.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/i/m/img284_51.jpg	"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://static.yakaboo.ua/media/catalog/product/1/7/17_1_160.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0I2KxPeE4HsPewPnvpNmUP8M0Cb6unBvZWw&s"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://readeat.com/storage/app/uploads/public/673/44c/446/thumb_138755_900_900_0_0_auto.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://m.media-amazon.com/images/I/71de1OC-ZIL._AC_UF350,350_QL50_.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://m.media-amazon.com/images/I/51zGCdRQXOL.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://vivat.com.ua/storage/1.d/files/e/f/efc995da_1.png"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://static.yakaboo.ua/media/catalog/product/i/m/img_63663.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
					</Swiper>
				)}
			</div>
			<div className="bottom">
				<span>{t("heroSecond")}</span>
				{width >= 768 && (
					<Swiper
						// install Swiper modules
						modules={[Autoplay]}
						spaceBetween={16}
						slidesPerView={slidesPerView}
						autoplay={{ delay: 0, disableOnInteraction: false }}
						allowTouchMove={false}
						speed={3000}
						dir="rtl"
						loop={true}>
						<SwiperSlide>
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQei8UwvedGRmp_7ppTOQZQ1I9IMK6dTt0fzg&s"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2teeVmDME-sul_HdNUxZ59X8Lp37uMbPLKQ&s"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://images.booksense.com/images/592/612/9781451612592.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://static.yakaboo.ua/media/catalog/product/3/2/322849_69505976.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://static.yakaboo.ua/media/catalog/product/8/1/813zz9eeiel.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://m.media-amazon.com/images/I/618BdBwK5ML._AC_UF1000,1000_QL80_.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://static.yakaboo.ua/media/catalog/product/1/9/192119_0.192119"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://m.media-amazon.com/images/I/615ERKQY47L._AC_UF1000,1000_QL80_.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://m.media-amazon.com/images/I/91L0La1pwDL._AC_UF1000,1000_QL80_.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://m.media-amazon.com/images/I/61HXj-F8nmL._AC_UF1000,1000_QL80_.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src="https://static.yakaboo.ua/media/catalog/product/5/1/51b7wsiofxl.jpg"
								alt=""
								width="100"
								height="140"
								draggable="false"
							/>
						</SwiperSlide>
					</Swiper>
				)}
			</div>
		</StyledHero>
	);
};

export default Hero;
