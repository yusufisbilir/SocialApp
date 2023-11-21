import { Outlet, Navigate } from 'react-router-dom';
const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section className='flex flex-col items-center justify-center py-10 grow'>
            <Outlet />
          </section>

          <img
            src='/assets/images/login-side-image.jpg'
            alt='login'
            className='hidden object-cover w-1/2 h-screen bg-no-repeat xl:block'
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
