import Link from 'next/link';

import { useEffect , useRef  } from 'react';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type MainVisualItemType = {
	imgSrc: string;
	volume: number;
	desc: string;
	bgColor: string;
	txtColor: string;
};

gsap.registerPlugin(ScrollTrigger);

const MainVisualItem = ({
	imgSrc,
	volume,
	desc,
	bgColor,
	txtColor,
}: MainVisualItemType) => {
	
	const triggerBox = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLElement | null>(null);
	useEffect(() => {
		titleRef.current = document.querySelector(".mainBox__visual__title");
		if (!triggerBox.current || !titleRef.current) return;

		
		const titleHeight = titleRef.current.offsetHeight;
		const titleTop = titleRef.current.getBoundingClientRect().top;
		const txtcolor = triggerBox.current?.dataset.txtcolor;

		ScrollTrigger.create({
			trigger: triggerBox.current,
			start: `top top+=${titleHeight + titleTop * 0.5}`,
			end: `bottom top+=${titleHeight + titleTop * 0.5}`,
			markers : false,
			onEnter: () => {
				if (titleRef.current && txtcolor) {
					titleRef.current.style.color = txtcolor;
				}

			},
			onEnterBack: () => {
				console.log(txtcolor)
				if (titleRef.current && txtcolor) {
					titleRef.current.style.color = txtcolor;
				}

			},
		});
		const handleResize = () => ScrollTrigger.refresh();


		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div
			className="mainBox__visual__con"
			style={{ backgroundColor: bgColor }}
			data-txtcolor={txtColor}
			data-bgcolor={bgColor}
			ref={triggerBox}
		>
			<div className="mainBox__visual__conSticky">
				<div className="mainBox__visual__con__img">
					<Link href="">
						<img src={imgSrc} alt={`Vol.${volume} 이미지`} />
					</Link>
				</div>
				<div
					className="mainBox__visual__con__desc"
					style={{ color: txtColor }}
				>
					<p className="volumeNum">Vol.{volume}</p>
					<p
						className="desc"
						dangerouslySetInnerHTML={{ __html: desc }}
					/>
				</div>
			</div>
		</div>
	);
};

export default MainVisualItem;
