

import MagazineList from '@/pages/component/magazine/MagazineList';

// type isMobileProps = {
// 	isMobile: boolean;
// };


const Magazine = () => {
	return (
		<div id="contents" className="magazine contentPages">
			<div className="magazineBox">
				<MagazineList />
			</div>
		</div>
	);
};

export default Magazine


