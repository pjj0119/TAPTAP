

import { useState } from 'react';
import MainVisualItem from './MainVisualItem';
import MainVisualTitle from './MainVisualTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

type MainVisualItemType = {
	bgColor: string;
	imgSrc: string;
	whiteMode?: boolean;
	volume: string;
	desc: string;
};

type MainVisualProps = {
	isMobile: boolean;
	listDatas: MainVisualItemType[];
};

const MainVisualSwiper = ({ isMobile, listDatas }: MainVisualProps) => {
	const [currentIndex, setCurrentIndex] = useState(1);

	const [totalSlides, setTotalSlides] = useState(0);
	return (
		<div className="mainBox__visual">


			<MainVisualTitle isMobile={isMobile} currentIndex={currentIndex} totalSlides={totalSlides} />


			<Swiper
				modules={[Autoplay]}
				slidesPerView={1}
				loop={true}
				autoplay={{ delay: 3000 }}

				onSwiper={(swiper) => {
					setTotalSlides(swiper.slides.length);// 현재 페이지
				}}
				onSlideChange={(swiper) => {
					setCurrentIndex(swiper.realIndex + 1);// 전체 페이지 수
				}}
			>
				{listDatas?.map((item, i) => (
					<SwiperSlide key={i}>
						<MainVisualItem
							bgColor={item.bgColor}
							imgSrc={item.imgSrc}
							whiteMode={item.whiteMode}
							volume={item.volume}
							desc={item.desc}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default MainVisualSwiper