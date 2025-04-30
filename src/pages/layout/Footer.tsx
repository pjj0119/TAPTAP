import Link from "next/link"
import FooterTopbtn from '@/pages/component/layout/FooterTopBtn';


type isMobileProps = {
	isMobile: boolean;
};
const Footer = ({ isMobile }: isMobileProps) => {
	return (
		<footer id='footer' className="footer">
			<div className="footerInner">
				<div className="footerInner__con footerInner__con--left">
					<div className="footerInner__con__logo">
						<Link href="https://www.inpix.com/"><img src="/images/common/logo_inpix.png" alt="" /></Link>
					</div>
					<div className="footerInner__con__address">
						<p>
							© 2025 INPIX. ALL RIGHTS RESERVED.<br />
							서울특별시 강남구 학동로 126 인픽스 빌딩  <br className="tabletBlock" />TEL. 02-538-0036  <br className="moBlock" />FAX. 02-538-7139
						</p>
					</div>
				</div>
				<div className="footerInner__con footerInner__con--right">
					<div className="footerInner__con__desc">
						<p>
							전문성과 재미를 한곳에<br />
							아카이빙하고 싶은 매거진 탭탭 <br className="tabletBlock moBlock" />지금 구독하세요.
						</p>
						<Link href="https://www.inpix.com/newsletter/add" target="_blank">구독하러 가기</Link>
					</div>
				</div>
				{!isMobile && <FooterTopbtn />}
			</div>
		</footer>
	)
}

export default Footer