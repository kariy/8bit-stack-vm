import fs from "fs";
import { CPU, TCPUConfig } from "../CPU";
import { OPCODE } from "../instructions";
import { convertBytecodeToHexString } from "../utils";

export function runProgram(program: Uint8Array, debug?: TCPUConfig): void {
	const cpu = new CPU(10, 10, debug);
	cpu.execute(program);
}

export function compileProgram(assemblyFile: string): Uint8Array {
	const assembly = readAssemblyFile(assemblyFile);
	const bytecode = assemblyToBytecode(assembly);

	return bytecode;
}

function assemblyToBytecode(assembly: string[]): Uint8Array {
	const bytecode: Uint8Array = new Uint8Array(assembly.length);

	for (let i = 0; i < assembly.length; i++) {
		const token = assembly[i];

		if (token.length === 0) continue;

		// (1) check if token cannot be parsed as string
		if (isNaN(parseInt(token))) {
			// (2) check if token is a valid opcode

			const opcode = OPCODE[token as keyof typeof OPCODE];

			if (opcode === undefined)
				throw new Error(`Unknown opcode: ${token}`);

			bytecode[i] = opcode;
			continue;
		}

		bytecode[i] = parseInt(token);
	}

	return bytecode;
}

function readAssemblyFile(pathToAssembly: string): string[] {
	const assemblyStr = fs.readFileSync(pathToAssembly, "utf-8");
	return assemblyStr.split(new RegExp(/[\n\r\s\Z]+/g));
}
