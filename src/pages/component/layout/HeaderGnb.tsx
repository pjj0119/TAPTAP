import Link from 'next/link';

const HeaderGnb = () => {
	return (
		<nav className="header__gnb">
			<ul>
				<li><Link href="Magazine">MAGAZINE</Link></li>
				<li><Link href="Archive">ARCHIVE</Link></li>
				<li><Link href="About">ABOUT</Link></li>
			</ul>
		</nav>
	)
}

export default HeaderGnb