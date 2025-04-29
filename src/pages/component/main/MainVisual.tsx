
import MainVisualItem from './MainVisualItem';
import MainVisualTitle from './MainVisualTitle';
import MainViewAllBtn from './MainViewAllBtn';
type MainVisualItemType = {
	bgColor: string;
	imgSrc: string;
	whiteMode?: boolean;
	volume: string;
	desc: string;
};

type MainVisualProps = {
	listDatas: MainVisualItemType[];
};

const MainVisual = ({ listDatas }: MainVisualProps) => {


	return (
		<div className="mainBox__visual">
			<MainVisualTitle />

			{listDatas?.map((item, i) => (
				<MainVisualItem
					key={i}
					bgColor={item.bgColor}
					imgSrc={item.imgSrc}
					whiteMode={item.whiteMode}
					volume={item.volume}
					desc={item.desc}
				/>
			))}

			<MainViewAllBtn />
		</div>
	);
};

export default MainVisual;
