// Copyright 2021-2024 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

declare global {
  interface ArrayBufferConstructor {
    new(byteLength: number, options?: { maxByteLength?: number; }): ArrayBuffer;
  }
  interface ArrayBuffer {
    resize(newByteLength: number): void;
    maxByteLength: number;
  }
}

export class GrowableArrayBuffer {
  private buffer: ArrayBuffer;
  private head: number = 0;

  constructor(initialSize: number = 0) {
    const maxByteLength = Math.max(Math.ceil((initialSize + 1) * 1.5), 32 * 1024);
    this.buffer = new ArrayBuffer(0, { maxByteLength });
  }

  public get byteLength(): number {
    return this.buffer.byteLength - this.head;
  }

  append(chunk: Uint8Array): void {
    const n = this.buffer.byteLength + chunk.byteLength;
    if (n > this.buffer.maxByteLength) {
      const maxByteLength = Math.ceil(this.buffer.maxByteLength * 1.8);
      const buffer = new ArrayBuffer(this.buffer.byteLength, { maxByteLength });
      new Uint8Array(buffer).set(new Uint8Array(this.buffer));
      this.buffer = buffer;
    }
    this.buffer.resize(n);
    new Uint8Array(this.buffer).set(chunk, n - chunk.byteLength);
  }

  peek(n: number): DataView | undefined {
    if (this.byteLength < n) {
      return undefined;
    }
    return new DataView(this.buffer, this.head, n);
  }

  consume(n: number): Uint8Array {
    const data = new Uint8Array(this.buffer, this.head, n);
    this.head += n;
    return data;
  }
}
