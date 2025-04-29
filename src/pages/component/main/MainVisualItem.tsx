import { forwardRef } from 'react';
import Link from 'next/link';

type MainVisualItemProps = {
	bgColor: string;
	whiteMode?: boolean;
	imgSrc: string;
	volume: string;
	desc: string;
};

const MainVisualItem = forwardRef<HTMLDivElement, MainVisualItemProps>(
	({
		bgColor,
		whiteMode = false,
		imgSrc,
		volume,
		desc }, ref) => {
		return (
			<div
				className="mainBox__visual__con"
				style={{ backgroundColor: bgColor }}
				data-whitemode={whiteMode ? 'true' : undefined}
				ref={ref}
			>
				<div className="mainBox__visual__conSticky">
					<div className="mainBox__visual__con__img">
						<Link href=""><img src={imgSrc} alt="" /></Link>
					</div>
					<div className="mainBox__visual__con__desc">
						<p className="volumeNum">{volume}</p>
						<p className="desc" dangerouslySetInnerHTML={{ __html: desc }} />
					</div>
				</div>
			</div>
		);
	}
);
MainVisualItem.displayName = 'MainVisualItem';
export default MainVisualItem;
