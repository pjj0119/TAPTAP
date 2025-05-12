
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import HeaderLogo from '@/pages/component/layout/HeaderLogo';
import HeaderGnb from '@/pages/component/layout/HeaderGnb';
import HeaderMoGnb from '@/pages/component/layout/HeaderMoGnb';
import HeaderBtn from '@/pages/component/layout/HeaderBtn';

type isMobileProps = {
	isMobile: boolean;
};
const Header = ({ isMobile }: isMobileProps) => {
	const [isClicked, setIsClicked] = useState<boolean>(false);
	//페이지에 따른 푸터설정
	const router = useRouter();
	const [pageTit, setPageTit] = useState<string>('');

	useEffect(() => {
		const path = router.pathname.split('/');
		const pathName = path[1] || '';
		setPageTit(pathName);
	},[router.pathname]);


	return (
		<header id='header' className={`header ${pageTit == 'Magazine' ? 'bgwt': ''}`}>
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