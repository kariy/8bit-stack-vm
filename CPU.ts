import { Stack } from "./Stack";
import { Memory } from "./Memory";
import { OPCODE } from "./instructions";

interface ICPU {
	readonly stack: Stack;

	readonly memory: Memory;

	pc: number;

	execute(instruction: Uint8Array): void;
}

export type TCPUConfig = {
	enable: boolean;
	showStack: boolean;
	showMemory: boolean;
};

export class CPU implements ICPU {
	public readonly stack: Stack;

	public readonly memory: Memory;

	public pc: number;

	private _debug: TCPUConfig = {
		enable: false,
		showStack: true,
		showMemory: true,
	};

	/**
	 *
	 * @param stackSize size of the stack
	 * @param memorySize size of the memory in bytes
	 */
	constructor(stackSize: number, memorySize: number, debug?: TCPUConfig) {
		this.pc = 0;
		this.stack = new Stack(stackSize);
		this.memory = new Memory(memorySize);

		if (debug) Object.assign(this._debug, debug);
	}

	public execute(program: Uint8Array): void {
		while (this.pc >= 0 && this.pc < program.length) {
			this._beforeExecuteInstruction();

			this._executeInstruction(program);

			this._afterExecuteInstruction();
		}
	}

	private _executeInstruction(instructions: Uint8Array): void {
		switch (instructions[this.pc]) {
			case OPCODE.STOP: {
				this.pc = -1;
				break;
			}

			case OPCODE.PUSH: {
				const _value = new Uint8Array([instructions[this.pc + 1]]);

				this.stack.push(_value);
				this.pc++;

				break;
			}

			case OPCODE.POP: {
				this.stack.pop();
				break;
			}

			case OPCODE.ADD: {
				const a = this.stack.pop();
				const b = this.stack.pop();
				const _result = a[0] + b[0];

				this.stack.push(new Uint8Array([_result]));

				break;
			}

			case OPCODE.MSTORE: {
				const _offset = this.stack.pop();
				const _value = this.stack.pop();

				this.memory.store(_offset, _value);

				break;
			}

			case OPCODE.MLOAD: {
				const _valueInMemory = this.memory.load(this.stack.pop());
				this.stack.push(_valueInMemory);
				break;
			}

			default:
				throw new Error("Unknown instruction");
		}
	}

	private _beforeExecuteInstruction(instructions?: Uint8Array): void {
		if (this._debug.enable) {
			if (instructions) {
				console.log(`PC : [ ${this.pc} ]`);
				console.log(
					`Instruction : [ ${OPCODE[instructions[this.pc]]} ]`
				);
			}
		}
	}

	private _afterExecuteInstruction(instructions?: Uint8Array): void {
		this.pc++;

		if (this._debug.enable) {
			if (this._debug.showStack)
				console.log("Stack :", this.stack.buffer);

			if (this._debug.showMemory)
				console.log("Memory :", this.memory.buffer);

			console.log("");
		}
	}
}
