import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { IconLogout } from '@tabler/icons-react';

const TopBar = () => {
  return (
    <section className='sticky top-0 z-50 w-full md:hidden bg-dark-2'>
      <div className='flex items-center justify-between p-4'>
        <Link to='/' className='flex items-center gap-3'>
          <h1 className='text-lg font-semibold'>@SocialApp</h1>
        </Link>
        <div className='flex gap-4'>
          <Button variant='ghost'>
            <IconLogout />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
