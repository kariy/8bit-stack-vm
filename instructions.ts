export enum INSTRUCTIONS {
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
	MLOAD,
}
