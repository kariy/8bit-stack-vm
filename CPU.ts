import { Stack } from "./Stack";
import { Memory } from "./Memory";
import { INSTRUCTIONS } from "./instructions";

interface ICPU {
	readonly stack: Stack;

	readonly memory: Memory;

	pc: number;

	execute(instruction: Uint8Array): void;
}

export class CPU implements ICPU {
	public readonly stack: Stack;

	public readonly memory: Memory;

	public pc: number;

	private FLAGS = {
		STOP: false,
	};

	constructor(stackSize: number, memorySize: number) {
		this.pc = 0;
		this.stack = new Stack(stackSize);
		this.memory = new Memory(memorySize);
	}

	public execute(program: Uint8Array): void {
		while (!this.FLAGS.STOP) {
			if (this.pc >= program.length) break;

			console.log(
				`Executing instruction ${this.pc} : ${program[this.pc]}`
			);

			switch (program[this.pc]) {
				case INSTRUCTIONS.STOP: {
					this.FLAGS.STOP = true;
					break;
				}

				case INSTRUCTIONS.PUSH: {
					const _value = new Uint8Array([program[this.pc + 1]]);

					this.stack.push(_value);
					this.pc++;

					break;
				}

				case INSTRUCTIONS.POP: {
					this.stack.pop();
					break;
				}

				case INSTRUCTIONS.ADD: {
					const a = this.stack.pop();
					const b = this.stack.pop();
					const _result = a[0] + b[0];

					this.stack.push(new Uint8Array([_result]));

					break;
				}

				case INSTRUCTIONS.MSTORE: {
					const _offset = this.stack.pop();
					const _value = this.stack.pop();

					this.memory.store(_offset[0], _value);

					break;
				}

				default:
					throw new Error("Unknown instruction");
			}

			this.pc++;

			console.log(this.stack.buffer);
		}

		console.log(`Memory : `, this.memory.buffer);
	}
}
