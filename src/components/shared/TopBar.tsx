import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOut } from '@/lib/react-query/queriesMutations';
import { useEffect } from 'react';
import { ROUTES } from '@/_constants/ROUTES';
import { useUserContext } from '@/context/AuthContext';
import { LogOut, LucideUser } from 'lucide-react';

const TopBar = () => {
  const { mutate: signOut, isSuccess } = useSignOut();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTES.SIGN_IN);
    }
  }, [isSuccess]);

  return (
    <section className='sticky top-0 z-50 w-full md:hidden bg-dark-2'>
      <div className='flex items-center justify-between p-4'>
        <Link to='/' className='flex items-center gap-3'>
          <h1 className='text-lg font-semibold'>@SocialApp</h1>
        </Link>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' onClick={() => signOut()}>
            <LogOut />
          </Button>
          <Link
            to={`${ROUTES.PROFILE}/${user?.id}`}
            className='flex items-center gap-3'
          >
            {user?.imageUrl ? (
              <img src={user?.imageUrl} className='w-8 h-8 rounded-full' />
            ) : (
              <LucideUser />
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
