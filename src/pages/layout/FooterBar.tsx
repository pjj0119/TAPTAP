import Link from "next/link"


type isMobileProps = {
	isMobile: boolean;
};
const Footer = ({ isMobile }: isMobileProps) => {
	return (
		<footer id='footer' className="footerbar">
			<div className="footerbarInner">
			{!isMobile ? 
				<>
					<div className="footerbarInner__con footerbarInner__con--left">
						<p>지금 매거진 탭탭을 구독해 보세요</p>
						
					</div>
					
					<div className="footerbarInner__con footerbarInner__con--right">
						<Link href="https://www.inpix.com/newsletter/add" target="_blank">구독하러 가기</Link>
					</div>
				</>
			: 
				<div className="footerbarInner__con">
					<Link href="https://www.inpix.com/newsletter/add" target="_blank">지금 매거진 탭탭을 구독해 보세요</Link>
				</div>
			}
				
			</div>
		</footer>
	)
}

export default Footer