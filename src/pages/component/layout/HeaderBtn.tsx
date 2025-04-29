import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

type HeaderMoGnbProps = {
	setIsClicked: (isClicked: boolean) => void;
}
const HeaderBtn = ({ setIsClicked }: HeaderMoGnbProps) => {
	const [headerTit, setHeaderTit] = useState<string>('');
	const router = useRouter();

	useEffect(() => {
		const path = router.pathname.split('/');
		const pathName = path[1] || '';
		setHeaderTit(pathName);
	}, [router.pathname]);

	return (
		<div className="header__hamBtn">
			<p className="header__hamBtn__gnbTit">
				{headerTit}
			</p>
			<button className="hamBtn" type="button" aria-label="메뉴 열기" onClick={() => setIsClicked(true)}>
				<span className="hamBtn__bar"></span>
				<span className="hamBtn__bar"></span>
			</button>
		</div>
	)
}

export default HeaderBtn