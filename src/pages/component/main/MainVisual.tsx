
import MainVisualItem from './MainVisualItem';
import MainVisualTitle from './MainVisualTitle';
import MainViewAllBtn from './MainViewAllBtn';
type MainVisualItemType = {
	imgSrc: string;
	volume: number;
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
					imgSrc={item.imgSrc}
					volume={item.volume}
					desc={item.desc}
				/>
			))}

			<MainViewAllBtn />
		</div>
	);
};

export default MainVisual;
