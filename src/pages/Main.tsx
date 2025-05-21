
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
	taptapSeq : number ;
};


const Main = ({ isMobile }: isMobileProps) => {

	const [magazineList, setMagazineList] = useState<MainVisualItemType[]>([]);
	useEffect(() => {
		
		const fetchListData = async () => {
			try {
				const isDev = process.env.NODE_ENV === 'development';

				const url = isDev
				? '/api/loadData' // 개발 환경은 프록시로 우회
				: 'http://taptap.inpix.com/taptap/loadAjaxData.do'; // export는 실제 주소

				const res = await fetch(url, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({}),
				});

				const data = await res.json();
				console.log(res.status);
				console.log(data)
				const list = data.ITEMLIST.map((list: any) => ({
					volume: list.postNum,
					desc: list.title,
					imgSrc: `http://taptap.inpix.com/upload/${list.attPhgsFileNm}`,
					bgColor: list.bgColor,
					txtColor: list.txtColor,
					taptapSeq : list.taptapSeq ,
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
