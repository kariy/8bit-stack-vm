export class Memory {
	public readonly buffer: Buffer;

	constructor(size: number) {
		this.buffer = Buffer.alloc(size);

		// memory at `offset` 0 is the AP
		// it stores the offset of the next unused cell
		this.buffer[0] = 0x01;
	}

	get size(): number {
		return this.buffer.length;
	}

	get ap() {
		return this.buffer[0];
	}

	store(offset: Uint8Array, value: Uint8Array): void {
		const _offset = offset[0];
		this.checkOffsetInRange(_offset);

		this.buffer.writeUint8(value[0], _offset);

		const _nextUnusedCell = this.buffer[this.ap];

		if (_offset > _nextUnusedCell) this.buffer[this.ap] = _offset + 1;
	}

	load(offset: Uint8Array): Uint8Array {
		const _offset = offset[0];
		this.checkOffsetInRange(_offset);
		return new Uint8Array([this.buffer[_offset]]);
	}

	private checkOffsetInRange(offset: number): void {
		if (offset >= this.size) throw new Error("Memory out of bounds");
	}
}
