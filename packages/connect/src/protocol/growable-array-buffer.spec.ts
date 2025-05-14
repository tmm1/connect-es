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

import { GrowableArrayBuffer } from "./growable-array-buffer.js";

describe("GrowableArrayBuffer", function () {
  it("should append, peek and consume", function () {
    const buffer = new GrowableArrayBuffer(0);
    expect(buffer.byteLength).toBe(0);

    buffer.append(new Uint8Array([1, 2, 3]));
    expect(buffer.byteLength).toBe(3);

    const peeked = buffer.peek(3);
    expect(buffer.byteLength).toBe(3);
    expect(peeked?.getUint8(0)).toBe(1);
    expect(peeked?.getUint8(1)).toBe(2);
    expect(peeked?.getUint8(2)).toBe(3);

    expect(buffer.consume(3)).toEqual(new Uint8Array([1, 2, 3]));
    expect(buffer.byteLength).toBe(0);
  });

  it("should grow", function () {
    const buffer = new GrowableArrayBuffer(0);
    expect(buffer.byteLength).toBe(0);
    buffer.append(new Uint8Array([1, 2, 3]));
    buffer.append(new Uint8Array([1, 2, 3]));
    buffer.append(new Uint8Array([1, 2, 3]));
    expect(buffer.byteLength).toBe(9);
    expect(buffer.consume(1)).toEqual(new Uint8Array([1]));
    expect(buffer.byteLength).toBe(8);
    expect(buffer.consume(3)).toEqual(new Uint8Array([2, 3, 1]));
  });

  it("should resize", function () {
    const buf16k = new Uint8Array(16 * 1024);
    buf16k.set(new Uint8Array([1, 2, 3]));

    const buffer = new GrowableArrayBuffer(0);
    buffer.append(buf16k);
    expect(buffer.byteLength).toBe(16 * 1024);
    buffer.append(buf16k);
    expect(buffer.byteLength).toBe(32 * 1024);
    buffer.append(buf16k);
    expect(buffer.byteLength).toBe(48 * 1024);
    buffer.append(buf16k);
    expect(buffer.byteLength).toBe(64 * 1024);

    const peeked = buffer.peek(3);
    expect(peeked?.getUint8(0)).toBe(1);
    expect(peeked?.getUint8(1)).toBe(2);
    expect(peeked?.getUint8(2)).toBe(3);

    expect(buffer.consume(1)).toEqual(new Uint8Array([1]));
    const peeked2 = buffer.peek(3);
    expect(peeked2?.getUint8(0)).toBe(2);
    expect(peeked2?.getUint8(1)).toBe(3);
    expect(peeked2?.getUint8(2)).toBe(0);
  });
});
