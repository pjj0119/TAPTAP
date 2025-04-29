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
					
				</div>
				<div className="footerInner__con footerInner__con--right">
					
				</div>
			</div>
		</footer>
	)
}

export default Footer