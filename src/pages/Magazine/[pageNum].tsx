import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState , useRef  } from 'react';
import { getEnv } from '@/env/getEnv';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type isMobileProps = {
	isMobile: boolean;
};

gsap.registerPlugin(ScrollTrigger);

export default function MagazineView({ isMobile }: isMobileProps) {
	const { ASSET_PREFIX } = getEnv();
	
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
					imgUrl: `http://taptap.inpix.com/upload/${viewImg.attachmentPhgsFileNm}`,
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

	const triggerBox = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLElement | null>(null);
	useEffect(() => {
		headerRef.current = document.querySelector(".header");
		if (!triggerBox.current || !headerRef.current) return;

		const headerHeight = headerRef.current.offsetHeight;

		ScrollTrigger.create({
			trigger: triggerBox.current,
			start: `top top+=${headerHeight}`,
			markers : false,
			onEnter: () => {
				triggerBox.current?.classList.add('fixed');
				gsap.set(triggerBox.current, {
					position: "fixed",
					top: headerHeight,
					left: 0,
					right: 0,
					margin: "auto",
					width: "100%",
					zIndex: 999,
					backgroundColor: "#fff",
				});
			},
			onLeaveBack: () => {
				triggerBox.current?.classList.remove('fixed');
				gsap.set(triggerBox.current, {
					clearProps: "all",
				});
			},
		});
		const handleResize = () => ScrollTrigger.refresh();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [magazineView]);


	
	if (!magazineView) return null;

  return (
	
		<div id="contents" className="magazine">
			<div className="magazineBox">
				<div className="magazineBox__view">
					{ !isMobile && 
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
					}
					<div className="magazineBox__view__infoFix" ref={triggerBox}>
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
									<span ><img src={`${ASSET_PREFIX}/images/common/ico_topBtn_wt.png`} alt="" /></span>
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
  );
}