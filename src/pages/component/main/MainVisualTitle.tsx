import { forwardRef } from "react";

type MainVisualTitleProps = {
	currentIndex?: number;//현재페이지
	totalSlides?: number;//전체페이지
	isMobile?: boolean;
	conTotalNum? : number;
	conIndex? : number
};

const MainVisualTitle = forwardRef<HTMLDivElement, MainVisualTitleProps>(
	({ currentIndex, totalSlides, isMobile , conTotalNum , conIndex }, ref) => {
	return (
		<div className="mainBox__visual__title" ref={ref}>
			<p className="tit">
				Magazine <br className="moNone" />TAPTAP
			</p>
			<div className="pageNum">

				<span className="on">{isMobile ? String(currentIndex).padStart(2, '0') : String(conIndex).padStart(2, '0')}</span>
				<span className="slash">/</span>
				<span>{isMobile ? String(totalSlides).padStart(2, '0') : String(conTotalNum).padStart(2, '0')}</span>
			</div>
		</div>
		);
	}
);

export default MainVisualTitle;
