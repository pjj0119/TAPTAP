
type MainVisualTitleProps = {
	currentIndex?: number;//현재페이지
	totalSlides?: number;//전체페이지
	isMobile?: boolean;
};

const MainVisualTitle = ({ currentIndex, totalSlides, isMobile }: MainVisualTitleProps) => {
	return (
		<div className="mainBox__visual__title">
			<p className="tit">
				Magazine <br className="moNone" />TAPTAP
			</p>
			<div className="pageNum">

				<span className="on">{isMobile ? String(currentIndex).padStart(2, '0') : Number('01')}</span>
				<span className="slash">/</span>
				<span>{isMobile ? String(totalSlides).padStart(2, '0') : Number('03')}</span>
			</div>
		</div>
	);
};

export default MainVisualTitle;
