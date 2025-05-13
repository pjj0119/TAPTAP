
import { useEffect, useState } from 'react';

import MainVisualSwiper from '@/pages/component/main/MainVisualSwiper';
import MainVisual from '@/pages/component/main/MainVisual';

type isMobileProps = {
	isMobile: boolean;
};
type MainVisualItemType = {
	volume: number;
	desc: string;
	imgSrc: string;
	bgColor: string;
	txtColor : string;
};


const Main = ({ isMobile }: isMobileProps) => {

	const [magazineList, setMagazineList] = useState<MainVisualItemType[]>([]);
	useEffect(() => {
		
		const fetchListData = async () => {
			try {
				const res = await fetch('https://inpix.com/front/ajax/tabtabItemList.json');
				const data = await res.json();

				const list = data.ITEMLIST.map((list: any) => ({
					volume: list.postNum,
					desc: list.title,
					imgSrc: `https://www.inpix.com/upload/taptap/${list.attPhgsFileNm}`,
					bgColor: list.bgColor,
					txtColor: list.txtColor,
				}));
				setMagazineList(list);
			} catch (err) {
				console.error('메인 비주얼 API 호출 실패:', err);
			}
		};

		fetchListData();
	}, []);
	return (
		<div id="contents" className="main">
			<div className="mainBox">
				{!isMobile && <MainVisual listDatas={magazineList} />}
				{isMobile && <MainVisualSwiper isMobile={isMobile} listDatas={magazineList} />}
			</div>
		</div>
	);
};

export default Main;
