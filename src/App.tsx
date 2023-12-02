import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './_constants/ROUTES';
import SignIn from './_auth/forms/SignIn';
import SignUp from './_auth/forms/SignUp';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import {
  AllUsers,
  CreatePost,
  Explore,
  Home,
  PostDetail,
  Profile,
  Saved,
  UpdatePost,
  UpdateProfile,
} from './_root/pages';
import { Toaster } from './components/ui/toaster';

const App = () => {
  return (
    <main className='flex h-screen dark'>
      <Routes>
        {/* public */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        </Route>
        {/* private */}
        <Route path='/' element={<RootLayout />}>
          <Route index path={ROUTES.HOME} element={<Home />} />
          <Route index path={ROUTES.EXPLORE} element={<Explore />} />
          <Route index path={ROUTES.SAVED} element={<Saved />} />
          <Route index path={ROUTES.PEOPLE} element={<AllUsers />} />
          <Route index path={ROUTES.CREATE_POST} element={<CreatePost />} />
          <Route index path={ROUTES.UPDATE_POST} element={<UpdatePost />} />
          <Route index path={ROUTES.POST_DETAIL} element={<PostDetail />} />
          <Route index path={ROUTES.PROFILE} element={<Profile />} />
          <Route
            index
            path={ROUTES.UPDATE_PROFILE}
            element={<UpdateProfile />}
          />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;

// 2:39
