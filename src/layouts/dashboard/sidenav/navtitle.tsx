import { useAppSelector } from '../../../redux/hooks';

const Navtitle: React.FC<{ label: string }> = ({ label }) => {
  const expanded = useAppSelector((state) => state.settings.isSidenavOpen);

  return (
    <li
      className={`transition-all duration-200 overflow-hidden flex items-end ${
        expanded ? 'h-0 laptop:h-11' : 'h-0 laptop:h-0'
      }`}
    >
      <h3 className="whitespace-nowrap pl-[10px] text-sm m-0">{label}</h3>
    </li>
  );
};

export default Navtitle;
