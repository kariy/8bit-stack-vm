import { CPU } from "./CPU";
import { Memory } from "./Memory";

const cpu = new CPU(10, 10);

const bytecode = new Uint8Array([
	0x01, 0x45, 0x01, 0x01, 0x03, 0x01, 0x01, 0x05,
]);

cpu.execute(bytecode);
