
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '@/scss/style.scss';
import Header from '@/pages/layout/Header';
import Footer from '@/pages/layout/Footer';
import FooterBar from '@/pages/layout/FooterBar';

export default function App({ Component, pageProps }: AppProps) {
	/* 모바일 체크 */
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth <= 767);
		};

		checkIsMobile();
		window.addEventListener('resize', checkIsMobile);
		return () => window.removeEventListener('resize', checkIsMobile);
	}, []);

	/* //모바일 체크 */
	
	const router = useRouter();
	const [pageTit, setPageTit] = useState<string>('');

	//페이지에 따른 푸터설정
	useEffect(() => {
		const path = router.pathname.split('/');
		const pathName = path[1] || '';
		setPageTit(pathName);
	},[router.pathname]);

	return (
		<>
			<Header isMobile={isMobile} />
			<Component {...pageProps} isMobile={isMobile} />
			{pageTit == "Magazine" || pageTit == "Archive" ? <FooterBar isMobile={isMobile} /> : <Footer isMobile={isMobile} />}
		</>
	);
}