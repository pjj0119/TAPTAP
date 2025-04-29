import { useState } from 'react';

import HeaderLogo from '@/pages/component/layout/HeaderLogo';
import HeaderGnb from '@/pages/component/layout/HeaderGnb';
import HeaderMoGnb from '@/pages/component/layout/HeaderMoGnb';
import HeaderBtn from '@/pages/component/layout/HeaderBtn';

type isMobileProps = {
	isMobile: boolean;
};
const Header = ({ isMobile }: isMobileProps) => {
	const [isClicked, setIsClicked] = useState<boolean>(false);

	return (
		<header id='header' className='header'>
			<div className='headerInner'>
				<HeaderLogo />
				{!isMobile && <HeaderGnb />}
				{isMobile && <HeaderBtn setIsClicked={setIsClicked} />}
			</div>
			{isMobile && isClicked && (<HeaderMoGnb setIsClicked={setIsClicked} />)}
		</header>
	)
}

export default Header