import Navbar from '../common/components/ui/Navbar/MainNavbar';

type Props = {
  children: React.ReactNode;
};

const RootPage: React.FC<Props> = ({ children }) => {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <div className='p-4 md:max-w-6xl md:mx-auto'>{children}</div>
    </div>
  );
};

export default RootPage;
