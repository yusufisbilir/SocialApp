import { ROUTES } from '@/_constants/ROUTES';
import { sidebarLinks } from '@/_constants/SidebarLinks';
import { useUserContext } from '@/context/AuthContext';
import { useSignOut } from '@/lib/react-query/queriesMutations';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOut();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTES.SIGN_IN);
    }
  }, [isSuccess]);

  return (
    <nav className='hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] border-r dark:border-gray-900'>
      <div className='flex flex-col gap-10'>
        <Link to={ROUTES.HOME} className='flex items-center gap-3'>
          <h1 className='text-2xl font-semibold'>@SocialApp</h1>
        </Link>
        <Link
          to={`${ROUTES.PROFILE}/${user?.id}`}
          className='flex items-center gap-3'
        >
          <img src={user?.imageUrl} className='w-10 h-10 rounded-full' />
          <div className='flex flex-col'>
            <h3 className='text-xl font-semibold'>{user?.name}</h3>
            <p className='text-xs font-light dark:text-gray-400'>
              @{user?.username}
            </p>
          </div>
        </Link>

        <ul className='flex flex-col gap-6'>
          {sidebarLinks?.map((link) => (
            <li key={link.label}>
              <NavLink to={link.route} className='flex items-center gap-3'>
                <link.icon />
                <p>{link.label}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Button
        variant='unstyled'
        size='unstyled'
        onClick={() => signOut()}
        className='flex items-center justify-start gap-3'
      >
        <LogOut />
        <p>Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
