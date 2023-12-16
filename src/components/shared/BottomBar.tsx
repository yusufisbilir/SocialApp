import { bottombarLinks } from '@/_constants/SidebarLinks';
import { Link, useLocation } from 'react-router-dom';

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <section className='z-50 grid grid-cols-4 gap-4 w-full sticky bottom-0 rounded-t-[20px] px-5 py-4 md:hidden'>
      {bottombarLinks?.map((link) => {
        const samePath = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`flex items-center p-2 gap-3 transition rounded-lg ${
              samePath && 'bg-purple-900'
            }`}
          >
            <link.icon />
            <p>{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default BottomBar;
