import { toRupiah } from '.';

type nameDetails = 'Total' | 'Bayar' | 'Kembali' | 'Sisa Hutang';

// }
export class BTPrinter {
  public device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | undefined = undefined;
  private characteristic: BluetoothRemoteGATTCharacteristic | undefined = undefined;
  private dataBuffer: Uint8Array[] = [];

  static async create(): Promise<BTPrinter> {
    const instance = new BTPrinter();
    await instance.initialize();
    return instance;
  }

  private async initialize() {
    try {
      const [device] = await navigator.bluetooth.getDevices();

      if (device) this.device = device;
      else
        this.device = await navigator.bluetooth.requestDevice({
          filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }],
        });

      if (!this.device.gatt) {
        throw new Error('GATT not supported on device');
      }

      this.server = await this.device.gatt.connect();
      const service = await this.server.getPrimaryService(
        '000018f0-0000-1000-8000-00805f9b34fb'
      );
      this.characteristic = await service.getCharacteristic(
        '00002af1-0000-1000-8000-00805f9b34fb'
      );
    } catch (error) {
      throw error;
    }
  }

  encoder(text: string): Uint8Array {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(text);
  }

  size(ukuran: 'normal' | 'large') {
    const GS = '\x1D';

    const fontNormal = GS + '!' + '\x00';
    const fontLarge = GS + '!' + '\x11';

    this.dataBuffer.push(this.encoder(ukuran === 'normal' ? fontNormal : fontLarge));

    return this;
  }

  align(align: 'left' | 'center' | 'right') {
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

    this.dataBuffer.push(this.encoder(`\x1Ba${alignCode}`));

    return this;
  }

  bold(status?: false) {
    const ESC = '\x1B'; // ESC byte in ASCII

    const boldOn = ESC + 'E' + '\x01'; // Bold on
    const boldOff = ESC + 'E' + '\x00'; // Bold off

    this.dataBuffer.push(this.encoder(status === undefined ? boldOn : boldOff));

    return this;
  }

  text(str: string = '') {
    const arrStr = str.split('||');

    arrStr.forEach((str) => this.dataBuffer.push(this.encoder(`${str.trim()}\n`)));

    return this;
  }

  newLine() {
    this.dataBuffer.push(this.encoder('\n'));

    return this;
  }

  line(prefix: string, qty?: number) {
    this.dataBuffer.push(this.encoder(`${prefix.repeat(qty || 32)}\n`));

    return this;
  }

  products(
    products: { name: string; quantity: number; price: number; total: number }[],
    width: number = 32
  ) {
    products.forEach((product) => {
      this.dataBuffer.push(this.encoder(`${product.name}\n`));
      const qty = toRupiah(product.quantity);
      const price = toRupiah(product.price);
      const total = toRupiah(product.total);

      this.dataBuffer.push(
        this.encoder(
          `${qty} x ${price}${total.padStart(
            width - (qty.length + price.length + 3),
            ' '
          )}\n`
        )
      );
    });

    return this;
  }

  transactioDetail(details: { name: nameDetails; value: number }[], width: number = 32) {
    details.forEach((detail) => {
      const name = detail.name.padEnd(12, ' ');
      const value = toRupiah(detail.value);

      this.dataBuffer.push(
        this.encoder(`${name} :${value.padStart(width - (name.length + 2), ' ')}\n`)
      );
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

    this.dataBuffer.push(this.encoder(command));

    return this;
  }

  async print() {
    if (!this.characteristic) {
      throw new Error('Printer tidak ditemukan');
    }

    for (let i = 0; i < this.dataBuffer.length; i++) {
      try {
        await this.characteristic.writeValue(this.dataBuffer[i]);
      } catch (error) {
        throw error;
      }
    }

    // if (this.device && this.device.gatt) {
    //   this.device.gatt.disconnect();
    //   console.log('Bluetooth device disconnected');
    // }
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
