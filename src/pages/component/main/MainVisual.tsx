
import { useEffect , useRef, useState  } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from 'next/router';


import MainVisualItem from './MainVisualItem';
import MainVisualTitle from './MainVisualTitle';
import MainViewAllBtn from './MainViewAllBtn';
type MainVisualItemType = {
	imgSrc: string;
	volume: number;
	desc: string;
	bgColor: string;
	txtColor : string;
	taptapSeq : number;
};

type MainVisualProps = {
	listDatas: MainVisualItemType[];
};

gsap.registerPlugin(ScrollTrigger);

const MainVisual = ({ listDatas }: MainVisualProps) => {

	const titleRef = useRef<HTMLDivElement | null>(null);
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
	const headerRef = useRef<HTMLDivElement | null>(null);
	const headerLogoRef = useRef<HTMLDivElement | null>(null);
	const viewBtnRef = useRef<HTMLDivElement | null>(null);
	const footerRef = useRef<HTMLDivElement | null>(null);
	const [conIndex, setConIndex] = useState(0);
	const router = useRouter();

	useEffect(() => {
		const killList: ScrollTrigger[] = [];
		const handleResize = () => ScrollTrigger.refresh();

		requestAnimationFrame(() => {
			headerRef.current = document.querySelector('.header');
			headerLogoRef.current = document.querySelector('.header__logo');
			footerRef.current = document.querySelector('.footer');

			const title = titleRef.current;
			const header = headerRef.current;
			const headerLogo = headerLogoRef.current;
			const viewBtn = viewBtnRef.current;
			const footer = footerRef.current;

			const titleHeight = title?.offsetHeight || 0;
			const titleTop = title?.getBoundingClientRect().top || 0;
			const headerHeight = header?.offsetHeight || 0;
			const viewBtnHeight = viewBtn?.offsetHeight || 0;
			const viewBtnTop = viewBtn?.getBoundingClientRect().top || 0;

			itemRefs.current.forEach((e, i) => {
			if (!e) return;

			const txtcolor = e.dataset.txtcolor;
			const bgcolor = e.dataset.bgcolor;

			const mainTrigger = ScrollTrigger.create({
				trigger: e,
				start: `top top+=${titleHeight + titleTop * 0.5}`,
				end: `bottom top+=${titleHeight + titleTop * 0.5}`,
				onEnter: () => {
				if (title && txtcolor) title.style.color = txtcolor;
				setConIndex(i + 1);
				},
				onEnterBack: () => {
				if (title && txtcolor) title.style.color = txtcolor;
				setConIndex(i + 1);
				},
			});

			const headerTrigger = ScrollTrigger.create({
				trigger: e,
				start: `top top+=${headerHeight}`,
				end: `bottom top+=${headerHeight}`,
				onEnter: () => {
				if (header && txtcolor) {
					header.style.color = txtcolor;
					headerLogo?.classList.toggle('white', txtcolor.toLowerCase() === 'white');
				}
				if (header && bgcolor) header.style.backgroundColor = bgcolor;
				},
				onEnterBack: () => {
				if (header && txtcolor) {
					header.style.color = txtcolor;
					headerLogo?.classList.toggle('white', txtcolor.toLowerCase() === 'white');
				}
				if (header && bgcolor) header.style.backgroundColor = bgcolor;
				},
			});

			const viewBtnTrigger = ScrollTrigger.create({
				trigger: e,
				start: `top top+=${viewBtnHeight + viewBtnTop}`,
				end: `bottom top+=${viewBtnHeight + viewBtnTop}`,
				markers: false,
				onEnter: () => {
				if (viewBtn && txtcolor) {
					viewBtn.style.color = txtcolor;
					viewBtn.querySelector('span')?.classList.toggle('white', txtcolor.toLowerCase() === 'white');
				}
				},
				onEnterBack: () => {
				if (viewBtn && txtcolor) {
					viewBtn.style.color = txtcolor;
					viewBtn.querySelector('span')?.classList.toggle('white', txtcolor.toLowerCase() === 'white');
				}
				},
			});

			const unfixBtnTrigger = ScrollTrigger.create({
				trigger: footer,
				start: `top bottom-=30`,
				end: `top bottom-=30`,
				onEnter: () => viewBtn?.classList.add('noFixed'),
				onEnterBack: () => viewBtn?.classList.remove('noFixed'),
			});

			killList.push(mainTrigger, headerTrigger, viewBtnTrigger, unfixBtnTrigger);
			});

			window.addEventListener('resize', handleResize);
			ScrollTrigger.refresh();
		});

		return () => {
			killList.forEach(t => t.kill());
			window.removeEventListener('resize', handleResize);

			const header = document.querySelector('.header') as HTMLElement | null;
			const headerLogo = document.querySelector('.header__logo') as HTMLElement | null;
			const viewBtn = document.querySelector('.mainViewAllBtn') as HTMLElement | null;

			if (header) {
			gsap.set(header, { clearProps: 'all' });
			}
			if (headerLogo) {
			headerLogo.classList.remove('white');
			}
			if (viewBtn) {
			gsap.set(viewBtn, { clearProps: 'all' });
			viewBtn.classList.remove('noFixed');
			}
		};
	}, [listDatas.length, router.pathname]);



	return (
		<div className="mainBox__visual">
			<MainVisualTitle ref={titleRef} conTotalNum={itemRefs.current.length} conIndex={conIndex}/>

			{listDatas?.map((item, i) => (
				<MainVisualItem
					key={i}
					imgSrc={item.imgSrc}
					volume={item.volume}
					desc={item.desc}
					bgColor={item.bgColor}
					txtColor ={item.txtColor}
					ref={(e) => {itemRefs.current[i] = e}}
					taptapSeq = {item.taptapSeq}
				/>
			))}

			<MainViewAllBtn ref={viewBtnRef}/>
		</div>
	);
};

export default MainVisual;
