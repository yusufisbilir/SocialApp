import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { IconLogout } from '@tabler/icons-react';
import { useSignOut } from '@/lib/react-query/queriesMutations';
import { useEffect } from 'react';
import { ROUTES } from '@/_constants/ROUTES';

const TopBar = () => {
  const { mutate: signOut, isSuccess } = useSignOut();
  const navigate = useNavigate();

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
        <div className='flex gap-4'>
          <Button variant='ghost' onClick={() => signOut()}>
            <IconLogout />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
