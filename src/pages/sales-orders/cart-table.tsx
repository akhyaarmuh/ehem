const CartTable = () => {
  return (
    <div className="overflow-x-auto mt-2 flex-1 bg-base-100 border-[1px] border-base-content rounded-md">
      <table className="table table-pin-rows table-xs">
        <thead>
          <tr className="text-white bg-primary">
            <th className="w-[30px]"></th>
            <th>Nama Produk</th>
            <th>Satuan</th>
            <th className="text-right pr-5">Jumlah</th>
            <th className="text-right pr-5">Harga</th>
            <th className="text-right pr-5">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Paramex</td>
            <td>Kotak</td>
            <td>
              <input
                className="input input-ghost w-full input-sm text-right"
                placeholder="Jumlah produk..."
              />
            </td>
            <td>
              <input
                className="input input-ghost w-full input-sm text-right"
                placeholder="Harga produk..."
              />
            </td>
            <td>
              <input
                className="input input-ghost w-full input-sm text-right"
                placeholder="Total harga produk..."
              />
            </td>
          </tr>
          <tr className="bg-primary-content">
            <td>2</td>
            <td>Paramex</td>
            <td>Kotak</td>
            <td>
              <input
                className="input input-ghost w-full input-sm text-right"
                placeholder="Jumlah produk..."
              />
            </td>
            <td>
              <input
                className="input input-ghost w-full input-sm text-right"
                placeholder="Harga produk..."
              />
            </td>
            <td>
              <input
                className="input input-ghost w-full input-sm text-right"
                placeholder="Total harga produk..."
              />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Paramex</td>
            <td>Kotak</td>
            <td>
              <input
                className="input input-ghost w-full input-sm text-right"
                placeholder="Jumlah produk..."
              />
            </td>
            <td>
              <input
                className="input input-ghost w-full input-sm text-right"
                placeholder="Harga produk..."
              />
            </td>
            <td>
              <input
                className="input input-ghost w-full input-sm text-right"
                placeholder="Total harga produk..."
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
