import { forwardRef } from 'react';
import Link from 'next/link';

type MainVisualItemProps = {
	imgSrc: string;
	volume: number;
	desc: string;
};

const MainVisualItem = forwardRef<HTMLDivElement, MainVisualItemProps>(
	({
		imgSrc,
		volume,
		desc }, ref) => {
		return (
			<div
				className="mainBox__visual__con"
				ref={ref}
			>
				<div className="mainBox__visual__conSticky">
					<div className="mainBox__visual__con__img">
						<Link href=""><img src={imgSrc} alt="" /></Link>
					</div>
					<div className="mainBox__visual__con__desc">
						<p className="volumeNum">Vol.{volume}</p>
						<p className="desc" dangerouslySetInnerHTML={{ __html: desc }} />
					</div>
				</div>
			</div>
		);
	}
);
MainVisualItem.displayName = 'MainVisualItem';
export default MainVisualItem;
