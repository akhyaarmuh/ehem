import './style.css';

import * as IconMd from 'react-icons/md';

import Navlink from './navlink';
import Navtitle from './navtitle';
import navlinkList from './navlink-list';
import { Button } from '../../../components';

export interface SidenavProps {
  expanded: boolean;
  setExpanded: () => void;
}

const Sidenav: React.FC<SidenavProps> = ({ expanded, setExpanded }) => {
  return (
    <aside
      className={`bg-base-200 fixed left-0 top-0 bottom-0 z-50 transition-all duration-500 pb-4 ${
        expanded
          ? 'w-screen laptop:w-[300px] overflow-y-auto'
          : 'w-0 laptop:w-[80px] -translate-x-20 laptop:translate-x-0'
      }`}
    >
      {/* brand */}
      <div className="flex justify-between items-center h-[60px] px-4">
        <img
          src="/nw.png"
          alt="logo"
          className={`filter drop-shadow overflow-hidden transition-all duration-500 invisible laptop:visible ${
            expanded ? 'w-32' : 'w-0'
          }`}
        />
        <Button size="sm" color="ghost" onClick={() => setExpanded()}>
          {expanded ? (
            <IconMd.MdOutlineKeyboardDoubleArrowLeft size={20} />
          ) : (
            <IconMd.MdOutlineKeyboardDoubleArrowRight size={20} />
          )}
        </Button>
      </div>

      {/* navlink */}
      <nav className="my-4 pl-[10px]">
        <ul>
          {navlinkList.map((link, i) => {
            return link.to ? (
              <Navlink
                expanded={expanded}
                label={link.label}
                to={link.to}
                icon={<link.Icon size={25} />}
                key={i}
              />
            ) : (
              <Navtitle label={link.label} key={i} />
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidenav;
