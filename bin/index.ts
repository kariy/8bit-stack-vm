#!/usr/bin/env ts-node

import fs from "fs";
import { TCPUConfig } from "../CPU";
import { convertBytecodeToHexString } from "../utils";
import { compileProgram, runProgram } from "./command";

const yargs = require("yargs");

const argv = yargs
	.usage("Usage: $0 [options] <command>")
	.command("run", "Run a program")
	.command("compile", "Compile assembly code to program readably bytecode")
	.demandCommand(1, "")
	.options({
		program: {
			describe: "File path to program",
			type: "string",
		},
		d: {
			alias: "debug",
			describe: "Show execution details",
			default: false,
			type: "boolean",
		},
		nomemory: {
			describe: "Disable memory debugging output",
			default: false,
			type: "boolean",
		},
		nostack: {
			describe: "Disable stack debugging output",
			default: false,
			type: "boolean",
		},
	})
	.help().argv;

// console.log(argv);

// console.log(process.cwd());

switch (argv._[0]) {
	case "run": {
		const debugConfig: TCPUConfig = {
			enable: argv.debug,
			showStack: !argv.nostack,
			showMemory: !argv.nomemory,
		};

		try {
			const program = compileProgram(argv.program);
			runProgram(program, debugConfig);
			break;
		} catch (e) {
			break;
		}
	}
	case "compile": {
		const bytecode = compileProgram(fs.realpathSync(argv.program));
		console.log(convertBytecodeToHexString(bytecode));
		break;
	}
}
