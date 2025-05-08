import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MagazineView() {
	
	const router = useRouter();
	const { pageNum } = router.query;

	const formatDate = (date: Date): string => {
		const yy = date.getFullYear();
		const mm = String(date.getMonth() + 1).padStart(2, '0');
		const dd = String(date.getDate()).padStart(2, '0');
		return `${yy}.${mm}.${dd}`;
	  };

	type magazineView = {
		hashTags? : string[],
		title : string,
		postNum : number,
	}
	type magazineViewImg = {
		imgUrl : string,
		regDtm : Date
	}

	const [magazineView, setMagazineView] = useState<magazineView | null>(null);
	const [magazineViewImg, setMagazineViewImg] = useState<magazineViewImg | null>(null);

	useEffect(() => {
		
	if (!pageNum) return;

		const fetchData = async () => {
			try {
				const res = await fetch('https://inpix.com/front/ajax/tabtabItemList.json');
				const data = await res.json();
		
				const list = data.ITEMLIST.find(
					(item: any) => String(item.taptapSeq) === String(pageNum)
				);
				const viewImg = data.VIEWLIST.find(
					(item: any) => String(item.taptapFkSeq) === String(pageNum)
				);

				const itemList : magazineView ={
					postNum: list.postNum,
					title: list.title,
					hashTags: [...new Set(
						String(list.hashTag ?? '')
						  .split(',')
						  .map((tag) => tag.trim())
						  .filter(Boolean)
					  )],
				};
				
				const viewList : magazineViewImg  = {
					imgUrl: `https://www.inpix.com/upload/taptap/${viewImg.attachmentPhgsFileNm}`,
					regDtm : new Date(viewImg.regDtm)
				};
		
				if (!list) {
					router.replace('/Magazine'); 
					return;
				}
		
				setMagazineView(itemList);
				setMagazineViewImg(viewList)
				// console.log(data)
				
			} catch (err) {
				router.replace('/Magazine');
			}
		};

		fetchData();
	}, [pageNum, router]);

	if (!magazineView) return null;

  

  return (
	
		<div id="contents" className="magazine">
			<div className="magazineBox">
				<div className="magazineBox__view">
					<div className="magazineBox__view__info">
						<p className="tit">{magazineView.title}</p>
						{magazineView.hashTags && magazineView.hashTags.length > 0 && (
						<ul className="hash">
							{magazineView.hashTags.map((tag, i) => (
							<li key={i}>#{tag}</li>
							))}
						</ul>
						)}
					</div>
					<div className="magazineBox__view__infoFix">
						<div className="magazineBox__view__infoFix__left">
							<div className="vol">Vol.{magazineView.postNum}</div>
							{magazineViewImg && (
								<div className="date">
									{formatDate(magazineViewImg.regDtm)}
								</div>
							)}
						</div>
						<div className="magazineBox__view__infoFix__right">
							<Link href="/Magazine" className='listBtn'>목록보기</Link>
						</div>
					</div>
					{magazineViewImg && (
						<div className="magazineBox__view__con">
							
							<div className="magazineBox__view__con__img">
								<img src={magazineViewImg.imgUrl} alt="" />
							</div>
							<div className="magazineBox__view__con__topBtn">
								<button type="button" onClick={() => window.scrollTo({ top: 0 })}>
									<span ><img src="/images/common/ico_topBtn_wt.png" alt="" /></span>
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
  );
}