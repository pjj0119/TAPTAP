import Link from 'next/link';
import { useEffect, useState } from 'react';

const MagazineListItem = () => {
	type MagazineListItem = {
		postNum: number;
		title: string;
		imgUrl: string;
		hashTags: string[];
		pageNum : number;
	};
	const [magazineList, setMagazineList] = useState<MagazineListItem[]>([]);

	useEffect(() => {
		const fetchListData = async () => {
			try {
				const res = await fetch('https://inpix.com/front/ajax/tabtabItemList.json');
				const data = await res.json();
				console.log(data)

				const list = data.ITEMLIST.map((list: any) => ({
					postNum: list.postNum,
					title: list.title,
					imgUrl: `https://www.inpix.com/upload/taptap/${list.attPhgsFileNm}`,
					hashTags: [...new Set(list.hashTag.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== "") )],
					pageNum : list.taptapSeq,
				}));
				setMagazineList(list);
			} catch (err) {
				console.error('실패:', err);
			}
		};

		fetchListData();
	}, []);

	return (
		magazineList.map((item, i) => (
			<li className="magazineBox__list__item" key={item.pageNum}>
				<Link href={`/Magazine/${item.pageNum}`}>
					<div className="magazineBox__list__item__con magazineBox__list__item__con--left">
						<p className="num">Vol.{item.postNum}</p>
						<p className="tit">{item.title}</p>
						{item.hashTags.length > 0 && 
							(
								<ul className="hash">
									{item.hashTags.map((hashTag,i) =>(
										<li key={i}>#{hashTag}</li>
									))}
								</ul>
							)
						}
					</div>

					<div className="magazineBox__list__item__con magazineBox__list__item__con--right">
						<div className="img-box">
							<img src={item.imgUrl} alt="" />
						</div>
					</div>
				</Link>
			</li>

		))
	);
};

export default MagazineListItem;
