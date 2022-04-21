export function convertBytecodeToHexString(bytecode: Uint8Array): string {
	let hexString = "";

	for (let i = 0; i < bytecode.length; i++) {
		hexString += bytecode[i].toString(16).padStart(2, "0");
	}

	return hexString.padStart(hexString.length + 2, "0x");
}
