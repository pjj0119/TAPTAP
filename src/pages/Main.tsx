
// import { useEffect, useState } from 'react';

import MainVisualSwiper from '@/pages/component/main/MainVisualSwiper';
import MainVisual from '@/pages/component/main/MainVisual';

type isMobileProps = {
	isMobile: boolean;
};

const MainVisualItemDatas = [
	{
		bgColor: '#D6CAB1',
		imgSrc: '/images/main/img_main_1.png',
		volume: 'Vol.7',
		desc: `당신의 눈 앞에 펼쳐지는 <br class="pcBlock"/>신세계 : AR 헤드셋 이야기 ①`,
	},
	{
		bgColor: '#AEC4C4',
		imgSrc: '/images/main/img_main_2.png',
		volume: 'Vol.6',
		desc: `미래산업 유망주 드론, <br class="pcBlock"/>현대 전쟁의 패러다임 바꾸다.`,
	},
	{
		bgColor: '#4A545D',
		imgSrc: '/images/main/img_main_3.png',
		whiteMode: true,
		volume: 'Vol.5',
		desc: `AI의 심장을 만드는 엔비디아 : <br class="pcBlock"/>거침없는 독주는 계속된다.`,
	},
];

const Main = ({ isMobile }: isMobileProps) => {
	// type VisualItem = {
	// 	postNum: number;
	// 	title: string;
	// 	imgUrl: string;
	// };
	// const [listTitle, setListTitle] = useState<VisualItem[]>([]);

	// useEffect(() => {
	// 	const fetchListData = async () => {
	// 		try {
	// 			const res = await fetch('https://inpix.com/front/ajax/tabtabItemList.json');
	// 			const data = await res.json();

	// 			const list = data.ITEMLIST.map((list: any) => ({
	// 				postNum: list.postNum,
	// 				title: list.title,
	// 				imgUrl: `https://www.inpix.com/upload/taptap/${list.attPhgsFileNm}`
	// 			}));
	// 			setListTitle(list);
	// 		} catch (err) {
	// 			console.error('메인 비주얼 API 호출 실패:', err);
	// 		}
	// 	};

	// 	fetchListData();
	// }, []);
	return (
		<div id="contents" className="main">
			<div className="mainBox">
				{!isMobile && <MainVisual listDatas={MainVisualItemDatas} />}
				{isMobile && <MainVisualSwiper isMobile={isMobile} listDatas={MainVisualItemDatas} />}
				{/*listTitle.map((item, i) => (
					<p key={i}>
						{item.postNum}
						{item.title}
						<img src={item.imgUrl} alt="" />
					</p>
				))*/}
			</div>
		</div>
	);
};

export default Main;
