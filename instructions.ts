export enum OPCODE {
	STOP = 0x00,
	PUSH,
	POP,
	ADD,
	SUB,

	/**
	 * @input1 `offset` in the memory
	 * @input2 `value` to be written to the memory
	 */
	MSTORE,

	/**
	 *
	 * Will load 1 byte from the memory at the given offset and push to the stack
	 *
	 * @input1 `offset` in the memory
	 */
	MLOAD,
}
