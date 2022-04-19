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

	store(offset: number, value: Uint8Array): void {
		this.checkOffsetInRange(offset);

		this.buffer.writeUint8(value[0], offset);

		const _nextUnusedCell = this.buffer[this.ap];

		if (offset > _nextUnusedCell) this.buffer[this.ap] = offset + 1;
	}

	load(offset: number): Uint8Array {
		this.checkOffsetInRange(offset);

		return new Uint8Array([this.buffer[offset]]);
	}

	private checkOffsetInRange(offset: number): void {
		if (offset >= this.size) throw new Error("Memory out of bounds");
	}
}
