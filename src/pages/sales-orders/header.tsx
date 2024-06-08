const Header = () => {
  return (
    <div className="border-b-4 border-primary p-2 pb-4 flex justify-between bg-base-300">
      <div className="items-center hidden laptop:flex">
        <img
          src="/nw.png"
          alt="logo"
          className={`filter drop-shadow overflow-hidden transition-all duration-500 w-32`}
        />
      </div>

      <div className="flex gap-4 w-[900px] justify-end">
        <div className="px-4 laptop:border-r-2 border-base-content">
          <p className="mb-2 text-right">Pelanggan</p>
          <h5 className="text-right my-0">Umum</h5>
        </div>
        <div className="px-4 border-r-2 border-base-content hidden laptop:block">
          <p className="mb-2 text-right">Tanggal</p>
          <h5 className="text-right my-0">23 Maret 2024</h5>
        </div>
        <div className="flex-1 px-4 border-r-2 border-base-content hidden laptop:block">
          <p className="mb-2 text-right">No. Penjualan</p>
          <h5 className="text-right my-0">Otomatis</h5>
        </div>
        <div className="px-4 hidden laptop:block">
          <p className="mb-2 text-right">Kasir</p>
          <h5 className="text-right my-0 max-w-44 overflow-hidden text-ellipsis whitespace-nowrap">
            Muhammad Akhyar
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Header;
