import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <section id="register-page">
      <div className="mx-auto grid min-h-screen max-w-7xl py-8 px-4 laptop:grid-cols-2 laptop:gap-20">
        <Outlet />
      </div>
    </section>
  );
};

export default Auth;
