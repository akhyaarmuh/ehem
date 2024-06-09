import { toRupiah } from '.';

type nameDetails = 'Total' | 'Bayar' | 'Kembali' | 'Sisa Hutang';

// }
export class BTPrinter {
  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | undefined = undefined;
  private characteristic: BluetoothRemoteGATTCharacteristic | undefined = undefined;
  private reciept: string = '';
  private data: Uint8Array | null = null;

  async connect() {
    try {
      // Meminta perangkat Bluetooth dengan filter layanan tertentu
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }],
      });

      // Menghubungkan ke perangkat
      this.server = await this.device.gatt?.connect();

      // Mendapatkan layanan utama dari perangkat
      const service = await this.server?.getPrimaryService(
        '000018f0-0000-1000-8000-00805f9b34fb'
      );

      // Mendapatkan karakteristik dari layanan
      this.characteristic = await service?.getCharacteristic(
        '00002af1-0000-1000-8000-00805f9b34fb'
      );

      return this;
    } catch (error) {
      throw error;
    }
  }

  size(ukuran: 'normal' | 'large') {
    const GS = '\x1D';

    const fontNormal = GS + '!' + '\x00';
    const fontLarge = GS + '!' + '\x11';

    this.reciept += ukuran === 'normal' ? fontNormal : fontLarge;
    return this;
  }

  align(align: 'left' | 'center' | 'right') {
    const ESC = '\x1B';
    let alignCode;
    switch (align) {
      case 'center':
        alignCode = '\x01';
        break;
      case 'right':
        alignCode = '\x02';
        break;
      case 'left':
      default:
        alignCode = '\x00';
        break;
    }
    this.reciept += `${ESC}a${alignCode}`;

    return this;
  }

  bold(status?: false) {
    const ESC = '\x1B'; // ESC byte in ASCII

    const boldOn = ESC + 'E' + '\x01'; // Bold on
    const boldOff = ESC + 'E' + '\x00'; // Bold off

    this.reciept += status === undefined ? boldOn : boldOff;

    return this;
  }

  text(str: string = '') {
    const arrStr = str.split('||');

    arrStr.forEach((str) => (this.reciept += `${str.trim()}\n`));

    return this;
  }

  newLine() {
    this.reciept += '\n';

    return this;
  }

  line(prefix: string, qty?: number) {
    this.reciept += `${prefix.repeat(qty || 32)}\n`;

    return this;
  }

  products(
    products: { name: string; quantity: number; price: number; total: number }[],
    width: number = 32
  ) {
    products.forEach((product) => {
      this.reciept += `${product.name}\n`;
      const qty = toRupiah(product.quantity);
      const price = toRupiah(product.price);
      const total = toRupiah(product.total);

      this.reciept += `${qty} x ${price}${total.padStart(
        width - (qty.length + price.length + 3),
        ' '
      )}\n`;
    });
    return this;
  }

  transactioDetail(details: { name: nameDetails; value: number }[], width: number = 32) {
    details.forEach((detail) => {
      const name = detail.name.padEnd(12, ' ');
      const value = toRupiah(detail.value);

      this.reciept += `${name} :${value.padStart(width - (name.length + 2), ' ')}\n`;
    });

    return this;
  }

  cut() {
    this.newLine().newLine().newLine().newLine();

    return this;
  }

  cashdraw() {
    // Mengirim perintah khusus untuk membuka laci kas
    const ESC = '\x1b';
    const p = '\x70';
    const m = '\x01'; // Drawer #1
    const t1 = '\x19';
    const t2 = '\x78';

    const command = `${ESC}${p}${m}${t1}${t2}`;

    this.reciept += command;

    // Mengirim buffer ke printer
    return this;
  }

  async close() {
    if (!this.characteristic) {
      throw new Error('Printer tidak ditemukan');
    }

    const textEncoder = new TextEncoder();
    this.data = textEncoder.encode(this.reciept);

    // Fungsi untuk membagi data menjadi batch kecil
    const CHUNK_SIZE = 512;
    for (let i = 0; i < this.data.length; i += CHUNK_SIZE) {
      const chunk = this.data.slice(i, i + CHUNK_SIZE);
      try {
        await this.characteristic.writeValue(chunk);
      } catch (error) {
        throw error;
      }
    }

    if (this.device && this.device.gatt) {
      this.device.gatt.disconnect();
      console.log('Bluetooth device disconnected');
    }
  }
}

export class Encoder {
  private reciept: string = '';
  private data: Uint8Array | null = null;

  size(ukuran: 'normal' | 'large') {
    const GS = '\x1D';

    const fontNormal = GS + '!' + '\x00';
    const fontLarge = GS + '!' + '\x11';

    this.reciept += ukuran === 'normal' ? fontNormal : fontLarge;
    return this;
  }

  align(align: 'left' | 'center' | 'right') {
    const ESC = '\x1B';
    let alignCode;
    switch (align) {
      case 'center':
        alignCode = '\x01';
        break;
      case 'right':
        alignCode = '\x02';
        break;
      case 'left':
      default:
        alignCode = '\x00';
        break;
    }
    this.reciept += `${ESC}a${alignCode}`;

    return this;
  }

  bold(status?: false) {
    const ESC = '\x1B'; // ESC byte in ASCII

    const boldOn = ESC + 'E' + '\x01'; // Bold on
    const boldOff = ESC + 'E' + '\x00'; // Bold off

    this.reciept += status === undefined ? boldOn : boldOff;

    return this;
  }

  text(str: string = '') {
    const arrStr = str.split('||');

    arrStr.forEach((str) => (this.reciept += `${str.trim()}\n`));

    return this;
  }

  newLine() {
    this.reciept += '\n';

    return this;
  }

  line(prefix: string, qty?: number) {
    this.reciept += `${prefix.repeat(qty || 32)}\n`;

    return this;
  }

  products(
    products: { name: string; quantity: number; price: number; total: number }[],
    width: number = 32
  ) {
    products.forEach((product) => {
      this.reciept += `${product.name}\n`;
      const qty = toRupiah(product.quantity);
      const price = toRupiah(product.price);
      const total = toRupiah(product.total);

      this.reciept += `${qty} x ${price}${total.padStart(
        width - (qty.length + price.length + 3),
        ' '
      )}\n`;
    });
    return this;
  }

  transactioDetail(details: { name: nameDetails; value: number }[], width: number = 32) {
    details.forEach((detail) => {
      const name = detail.name.padEnd(12, ' ');
      const value = toRupiah(detail.value);

      this.reciept += `${name} :${value.padStart(width - (name.length + 2), ' ')}\n`;
    });

    return this;
  }

  cut() {
    this.newLine().newLine().newLine().newLine();

    return this;
  }

  cashdraw() {
    // Mengirim perintah khusus untuk membuka laci kas
    const ESC = '\x1b';
    const p = '\x70';
    const m = '\x01'; // Drawer #1
    const t1 = '\x19';
    const t2 = '\x78';

    const command = `${ESC}${p}${m}${t1}${t2}`;

    this.reciept += command;

    // Mengirim buffer ke printer
    return this;
  }

  close() {
    const textEncoder = new TextEncoder();
    this.data = textEncoder.encode(this.reciept);
    return this.data;
  }
}
