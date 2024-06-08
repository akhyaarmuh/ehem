import { Link } from 'react-router-dom';

const getYear = () => {
  const date = new Date();
  return date.getFullYear();
};

const Footer = () => {
  return (
    <footer
      className={`flex items-center justify-center text-sm laptop:justify-end border-t border-base-200 px-2 laptop:px-6 h-[60px] absolute w-full bottom-0`}
    >
      <span>
        Copyright© 2021-{getYear()} - Build by.{' '}
        <Link
          rel="noreferrer"
          to="https://wa.me/6282354566666"
          target="_blank"
          className="font-bold text-primary hover:underline"
        >
          NW-Dev
        </Link>{' '}
      </span>
    </footer>
  );
};

export default Footer;
