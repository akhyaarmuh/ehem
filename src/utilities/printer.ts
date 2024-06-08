import { Encoder } from './escpos';

export const getPrinter = async (): Promise<{ printer: any; endpoint: any }> => {
  const _navigator = navigator as any;
  if (!_navigator.usb) {
    throw new Error('WebUSB is not supported in this browser');
  }

  try {
    const [printer] = await _navigator.usb.getDevices();

    if (printer) {
      await printer.open();
      if (printer.configuration === null) await printer.selectConfiguration(1);
      await printer.claimInterface(0);
      const endpoint = printer.configuration.interfaces[0].alternates[0].endpoints.find(
        (e: any) => e.direction === 'out'
      );
      return { printer, endpoint };
    }

    const device = await _navigator.usb.requestDevice({
      filters: [],
    });
    await device.open();
    if (printer.configuration === null) await printer.selectConfiguration(1);
    await device.claimInterface(0);
    const endpoint = device.configuration.interfaces[0].alternates[0].endpoints.find(
      (e: any) => e.direction === 'out'
    );
    return { printer: device, endpoint };
  } catch (error) {
    throw error;
  }
};

export const printNota = async () => {
  try {
    const { printer, endpoint } = await getPrinter();
    if (!printer || !endpoint) throw new Error('Printer tidak ditemukan');

    const data = new Encoder()
      .size('large')
      .align('center')
      .text('NW Store')
      .size('normal')
      .text('Amuntai')
      .text('Desa Tigarun, RT.003 No. 003')
      .text('082354566666')
      .line('-')
      .align('right')
      .text('08 Juni 2024')
      .text('15:04:49')
      .align('left')
      .line('-')
      .products([
        { name: 'Paramex', quantity: 3, price: 4000, total: 12000 },
        { name: 'Head&Shoulders', quantity: 1, price: 15000, total: 15000 },
        { name: 'Hanasui Anti Acne', quantity: 1, price: 25000, total: 25000 },
      ])
      .line('-')
      .transactioDetail([
        { name: 'Total', value: 18500 },
        { name: 'Bayar', value: 20000 },
        { name: 'Kembali', value: 1500 },
        { name: 'Sisa Hutang', value: 5000 },
      ])
      .line('-')
      .align('center')
      .text('Terimakasih sudah berbelanja || di toko kami ^_^')
      .cut()
      .cashdraw()
      .close();

    await printer.transferOut(endpoint.endpointNumber, data);
  } catch (error: any) {
    throw error;
  }
};

// export const printNota = async () => {
//   try {
//     const { printer, endpoint } = await getPrinter();
//     if (!printer || !endpoint) throw new Error('Printer tidak ditemukan');

//     const ESC = '\x1B'; // ESC byte in ASCII
//     const GS = '\x1D'; // GS byte in ASCII

//     const boldOn = ESC + 'E' + '\x01'; // Bold on
//     const boldOff = ESC + 'E' + '\x00'; // Bold off
//     const newLine = '\n';

//     // Perintah ESC/POS untuk ukuran font normal
//     const fontNormal = GS + '!' + '\x00';

//     // Perintah ESC/POS untuk ukuran font besar (2x ukuran normal)
//     const fontLarge = GS + '!' + '\x11';

//       const alignCenter = ESC + 'a' + '\x01';
//       const alignLeft = ESC + 'a' + '\x00';

//     const header = `
// ${fontNormal}      My Store      ${newLine}
// ${fontNormal}----------------------------${newLine}
// Item            Qty    Price     Total${newLine}
// ----------------------------${newLine}`;

//     const items = [
//       { name: 'Apples', qty: 2, price: 1.0, total: 2.0 },
//       { name: 'Bananas', qty: 3, price: 0.5, total: 1.5 },
//       { name: 'Oranges', qty: 1, price: 0.8, total: 0.8 },
//     ];

//     let itemsText = '';
//     items.forEach((item) => {
//       const name = item.name.padEnd(14, ' '); // Menyelaraskan nama item
//       const qty = item.qty.toString().padStart(4, ' '); // Menyelaraskan jumlah
//       const price = item.price.toFixed(2).toString().padStart(8, ' '); // Menyelaraskan harga
//       const total = item.total.toFixed(2).toString().padStart(8, ' '); // Menyelaraskan total
//       itemsText += `${name}${qty}${price}${total}${newLine}`;
//     });

//     const footer = `
// ----------------------------${newLine}
// ${fontLarge}Total:             $4.30${newLine}
// ----------------------------${newLine}
// ${fontLarge}Thank you for shopping!${newLine}`;

//     const receipt = header + itemsText + footer;

//     const textEncoder = new TextEncoder();
//     const textData = textEncoder.encode(receipt);
//     await printer.transferOut(endpoint.endpointNumber, textData);

//     // const dataArrayBuffer = new TextEncoder().encode('Hello, world! ⨉ \n\n\n');
//     // await printer.open();
//     // if (printer.configuration === null) await printer.selectConfiguration(1);
//     // await printer.claimInterface(0);
//     // await printer.transferOut(1, dataArrayBuffer);
//   } catch (error) {
//     throw error;
//   }
// };
