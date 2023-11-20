import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './_constants/ROUTES';
import SignIn from './_auth/forms/SignIn';
import SignUp from './_auth/forms/SignUp';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public */}
        <Route path='/' element={<AuthLayout />}>
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        </Route>
        {/* private */}
        <Route path='/' element={<RootLayout />}>
          <Route index path={ROUTES.HOME} element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
