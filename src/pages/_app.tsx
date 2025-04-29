
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import '@/scss/style.scss';
import Header from '@/pages/layout/Header';
import Footer from '@/pages/layout/Footer';

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
	return (
		<>
			<Header isMobile={isMobile} />
			<Component {...pageProps} isMobile={isMobile} />
			<Footer isMobile={isMobile} />
		</>
	);
}