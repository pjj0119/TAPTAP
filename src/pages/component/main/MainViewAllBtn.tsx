import { forwardRef } from "react";
import Link from 'next/link';

const MainViewAllBtn = forwardRef<HTMLDivElement, {}>((props, ref) => {
	return (
		<div ref={ref} className="mainBox__visual__viewAllBtn">
			<Link href="/Magazine">View All <span></span></Link>
		</div>
	);
});

MainViewAllBtn.displayName = "MainViewAllBtn";
export default MainViewAllBtn;
