export function handleGamePrizes(prizes, prizesRepeats) {
	let prizesOperation = [];
	let prizesResult = [];
	let repeats = 0;
	while (prizesOperation.length < 4) {
		prizesOperation = prizesOperation.concat([...prizes]);
		repeats++;
	}

	for (let index = 0; index < prizesRepeats; index++) {
		prizesResult = prizesResult.concat(prizesOperation);
	}

	return { prizesResult, repeats };
}