
import Main from '@/pages/Main';

type isMobileProps = {
  isMobile: boolean;
};
export default function HomePage({ isMobile }: isMobileProps) {
  /* 첫 화면 */
  return <Main isMobile={isMobile} />;
}
