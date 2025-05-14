import Link from 'next/link';
import { forwardRef } from 'react';

type MainVisualItemType = {
	imgSrc: string;
	volume: number;
	desc: string;
	bgColor: string;
	txtColor: string;
	taptapSeq : number;
};


const MainVisualItem = forwardRef<HTMLDivElement, MainVisualItemType>(
	({ imgSrc, volume, desc, bgColor, txtColor , taptapSeq }, ref) => {

	return (
		<div
			className="mainBox__visual__con"
			style={{ backgroundColor: bgColor }}
			data-txtcolor={txtColor}
			data-bgcolor={bgColor}
			ref={ref}
		>
			<div className="mainBox__visual__conSticky">
				<div className="mainBox__visual__con__img">
					<Link href={`/Magazine/${taptapSeq}`}>
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
	}
);

export default MainVisualItem;
