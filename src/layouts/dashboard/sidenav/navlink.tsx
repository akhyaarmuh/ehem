import React from 'react';
import { NavLink } from 'react-router-dom';

export interface NavlinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
}

const Navlink: React.FC<NavlinkProps> = ({ to, icon, label, expanded }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => {
          return `pl-4 laptop:pl-0 group relative flex gap-x-[10px] items-center hover:text-primary ${
            isActive ? 'active' : ''
          }`;
        }}
        end
      >
        <div className="flex laptop:min-w-[60px] h-[50px] justify-center items-center">
          {icon}
        </div>
        <span className="overflow-hidden text-lg font-light whitespace-nowrap">
          {label}
        </span>
        {!expanded && (
          <span className="left-full bg-base-200 text-lg font-light whitespace-nowrap absolute rounded-md px-2 py-1 ml-3 invisible opacity-0 -translate-x-3 transition-all laptop:group-hover:visible group-hover:opacity-80 group-hover:translate-x-0">
            {label}
          </span>
        )}
      </NavLink>
    </li>
  );
};

export default Navlink;
