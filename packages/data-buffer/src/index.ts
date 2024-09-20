
export class DataBuffer {
  static BUFFER_SIZE = 1024 * 1024;

  private _cursor = 0;
  private _end = 0;

  private _mem: ArrayBuffer = new ArrayBuffer(1024 * 1024);
  private _dv = new DataView(this._mem);
  private _ua = new Uint8Array(this._mem);
  private _enc = new TextEncoder();
  private _dec = new TextDecoder();

  get byteLength() {
    return this._end + 1;
  }

  get buffer() {
    return this._mem.slice(0, this._end);
  }


  get cursor() {
    return this._cursor;
  }

  set cursor(v) {
    this._cursor = v;
    if (v > this._end)
      this._end = v;
  }

  constructor(data: number | ArrayBuffer = 0) {
    if (typeof data === 'number') {
      this.cursor = 0;
      this._end = data - 1;
    }

    if (data instanceof ArrayBuffer) {
      this.write(data);
      this.cursor = 0;
    }
  }

  start() {
    this._cursor = 0;
  }

  reset() {
    this.start();
    this._end = 0;
  }

  // Cursor move
  private _cm(cursor?: number, move?: number) {
    if (typeof cursor === 'number')
      this._cursor = cursor;

    cursor = this._cursor;

    if (typeof move === 'number')
      this.cursor += move;

    return cursor;
  }

  // Read buffer
  read(c?: number, offset = this.byteLength - (c ?? this.cursor)) {
    const start = this._cm(c, offset);
    return this.buffer.slice(start, this.cursor);
  }

  // Read Varint
  readVarint() {
    let result = 0;
    let shift = 0;

    while (true) {
      const byte = this._ua[this.cursor++];
      result |= (byte & 0x7F) << shift;
      shift += 7;

      if ((byte & 0x80) === 0) {
        break;
      }
    }

    return result;
  }

  // Read LEB128
  readLEB128() {
    let result = 0n;
    let shift = 0;

    while (true) {
      const byte = this._ua[this.cursor++];
      result |= BigInt(byte & 0x7F) << BigInt(shift);
      shift += 7;

      if ((byte & 0x80) === 0) {
        break;
      }
    }

    return result;
  }

  // Write LEB128
  writeLEB128(value: bigint) {
    let bigValue = BigInt(value);

    while (bigValue > 0x7Fn) {
      this._ua[this.cursor++] = Number((bigValue & 0x7Fn) | 0x80n);
      bigValue >>= 7n;
    }

    this._ua[this.cursor++] = Number(bigValue & 0x7Fn);
  }

  // Read Varint
  writeVarint(value: number) {
    while (value > 0x7F) {
      this._ua[this.cursor++] = (value & 0x7F) | 0x80;
      value >>>= 7;
    }
    this._ua[this.cursor++] = value & 0x7F;
  }

  // Read boolean
  readboolean(c?: number, m = 1) {
    return !!this.readint8(c, m);
  }

  // Read 8 bit
  readint8(c?: number, m = 1) {
    const cursor = this._cm(c, m);
    return this._dv.getInt8(cursor);
  }
  readuint8(c?: number, m = 1) {
    const cursor = this._cm(c, m);
    return this._dv.getUint8(cursor);
  }

  // Read 16 bit
  readint16(c?: number, m = 2) {
    const cursor = this._cm(c, m);
    return this._dv.getInt16(cursor);
  }
  readuint16(c?: number, m = 2) {
    const cursor = this._cm(c, m);
    return this._dv.getUint16(cursor);
  }

  // Read 32 bit
  readint32(c?: number, m = 4) {
    const cursor = this._cm(c, m);
    return this._dv.getInt32(cursor);
  }
  readuint32(c?: number, m = 4) {
    const cursor = this._cm(c, m);
    return this._dv.getUint32(cursor);
  }

  // Read float
  readfloat32(c?: number, m = 4) {
    const cursor = this._cm(c, m);
    return this._dv.getFloat32(cursor);
  }
  readfloat64(c?: number, m = 8) {
    const cursor = this._cm(c, m);
    return this._dv.getFloat64(cursor);
  }

  // Read bigint
  readbigint64(c?: number, m = 8) {
    const cursor = this._cm(c, m);
    return this._dv.getBigInt64(cursor);
  }
  readbiguint64(c?: number, m = 8) {
    const cursor = this._cm(c, m);
    return this._dv.getBigUint64(cursor);
  }

  // Read string
  readstring(c?: number) {
    const size = this.readuint32(c);
    return this._dec.decode(
      this.read(undefined, size)
    );
  }

  // Write buffer
  write(value: ArrayBuffer | Uint8Array, c?: number) {
    if (value instanceof ArrayBuffer)
      value = new Uint8Array(value);

    if (value instanceof Uint8Array) {
      if (typeof c === 'number')
        this._cursor = c;

      const start = this._cursor;
      this.cursor += value.length;
      this._ua.set(value, start);
    }
  }

  // Write boolean
  writeboolean(value: boolean, c?: number, m = 1) {
    this.writeuint8(+value, c, m);
  }

  // Write 8 bit
  writeint8(value: number, c?: number, m = 1) {
    const cursor = this._cm(c, m);
    this._dv.setInt8(cursor, value);
  }
  writeuint8(value: number, c?: number, m = 1) {
    const cursor = this._cm(c, m);
    this._dv.setUint8(cursor, value);
  }

  // Write 16 bit
  writeint16(value: number, c?: number, m = 2) {
    const cursor = this._cm(c, m);
    this._dv.setInt16(cursor, value);
  }
  writeuint16(value: number, c?: number, m = 2) {
    const cursor = this._cm(c, m);
    this._dv.setUint16(cursor, value);
  }

  // Write 32 bit
  writeint32(value: number, c?: number, m = 4) {
    const cursor = this._cm(c, m);
    this._dv.setInt32(cursor, value);
  }
  writeuint32(value: number, c?: number, m = 4) {
    const cursor = this._cm(c, m);
    this._dv.setUint32(cursor, value);
  }

  // Write Float
  writefloat32(value: number, c?: number, m = 4) {
    const cursor = this._cm(c, m);
    this._dv.setFloat32(cursor, value);
  }
  writefloat64(value: number, c?: number, m = 8) {
    const cursor = this._cm(c, m);
    this._dv.setFloat64(cursor, value);
  }

  // Write Bigint
  writebigint64(value: bigint, c?: number, m = 8) {
    const cursor = this._cm(c, m);
    this._dv.setBigInt64(cursor, value);
  }
  writebiguint64(value: bigint, c?: number, m = 8) {
    const cursor = this._cm(c, m);
    this._dv.setBigUint64(cursor, value);
  }

  // Write string
  writestring(value: string, c?: number) {
    const buffer = this._enc.encode(value);
    this.writeuint32(buffer.length, c);
    this.write(buffer);
  }
}
