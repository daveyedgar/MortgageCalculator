

import copy from 'recursive-copy';

import { argv } from 'node:process';

const args = process.argv;
const src = args[2];
const dest = args[3];

var options = {overwrite: true,};

try {
	const results = await copy(src, dest, options);
	console.info('Copied ' + results.length + ' files');
} catch (error) {
	console.error('Copy failed: ' + error);
}
console.log(src, dest);
