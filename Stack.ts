export class Stack {
	public size: number;

	public buffer: Buffer;

	public totalItems: number;

	private top: number;

	constructor(size: number) {
		this.buffer = Buffer.alloc(size);

		this.top = -1;
		this.totalItems = 0;
		this.size = this.buffer.length;
	}

	push(value: Uint8Array): void {
		if (this.top + 1 === this.size)
			return console.error("Error : Stack overflow");

		this.top++;
		this.totalItems++;
		this.buffer.writeUint8(value[0], this.top);
	}

	/**
	 *
	 * @returns the popped `value` at the top of the stack
	 */
	pop(): Uint8Array {
		const _value = new Uint8Array([this.buffer[this.top]]);

		this.buffer.writeUint8(0, this.top);

		this.top--;
		this.totalItems--;

		return _value;
	}

	/**
	 *
	 * @param offset offset from the top of the stack
	 * @returns value in the stack at `offset`
	 */
	peek(offset: number = 0): Uint8Array {
		const _offset = this.top - offset;
		return new Uint8Array([this.buffer[_offset]]);
	}
}
