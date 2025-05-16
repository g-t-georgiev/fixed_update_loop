// filepath: /src/index.js

/*
 * Starting with the semicolon is in case whatever line of code above this example
 * relied on automatic semicolon insertion (ASI). The browser could accidentally
 * think this whole example continues from the previous line. The leading semicolon
 * marks the beginning of our new line if the previous one was not empty or terminated.
 *
 * Let us also assume that MyGame is previously defined.
 *
 * MyGame.lastRender keeps track of the last provided requestAnimationFrame timestamp.
 * MyGame.lastTick keeps track of the last update time. Always increments by tickLength.
 * MyGame.tickLength is how frequently the game state updates. It is 20 Hz (50ms) here.
 *
 * timeSinceTick is the time between requestAnimationFrame callback and last update.
 * numTicks is how many updates should have happened between these two rendered frames.
 *
 * render() is passed tFrame because it is assumed that the render method will calculate
 *          how long it has been since the most recently passed update tick for
 *          extrapolation (purely cosmetic for fast devices). It draws the scene.
 *
 * update() calculates the game state as of a given point in time. It should always
 *          increment by tickLength. It is the authority for game state. It is passed
 *          the DOMHighResTimeStamp for the time it represents (which, again, is always
 *          last update + MyGame.tickLength unless a pause feature is added, etc.)
 *
 * setInitialState() Performs whatever tasks are leftover before the main loop must run.
 *                   It is just a generic example function that you might have added.
 */

; (async () => {
	
	const MAX_UPDATES_PER_FRAME = 5; // Or another reasonable value
	const MyGame = (await import('./MyGame.js')).default; // Import the MyGame module
	// const GameWorker = new Worker('../gameWorker.js', { type: 'module' }); // Create GameWorker instance

	// let isUpdating = false;

	// GameWorker.onmessage = function (e) {
	// 	let data = e.data;
	// 	let type = data.type;
	// 	let payload = data.payload;
	// 	if (type === 'updated') {
	// 		MyGame.lastTick = payload.lastTick;
	// 		// Call update for each tick
	// 		if (payload.updates && Array.isArray(payload.updates)) {
	// 			for (const update of payload.updates) {
	// 				MyGame.update(update.tick);
	// 			}
	// 		} else {
	// 			MyGame.update(MyGame.lastTick);
	// 		}
	// 		isUpdating = false;
	// 	}
	// };

	function main(tFrame) {

		MyGame.stopMain = window.requestAnimationFrame(main);
		
		const nextTick = MyGame.lastTick + MyGame.tickLength;
		let numTicks = 0;

		// If tFrame < nextTick then 0 ticks need to be updated (0 is default for numTicks).
		// If tFrame = nextTick then 1 tick needs to be updated (and so forth).
		// Note: As we mention in summary, you should keep track of how large numTicks is.
		// If it is large, then either your game was asleep, or the machine cannot keep up.
		if (tFrame > nextTick) {
			const timeSinceTick = tFrame - MyGame.lastTick;
			numTicks = Math.floor(timeSinceTick / MyGame.tickLength);
		}

		queueUpdates(numTicks);
		MyGame.render(tFrame);
		MyGame.lastRender = tFrame;
	}

	MyGame.setInitialState();
	// GameWorker.postMessage({
	// 	type: 'init',
	// 	payload: {
	// 		lastTick: MyGame.lastTick,
	// 		tickLength: MyGame.tickLength
	// 	}
	// });

	startMain();

	function startMain() {
		MyGame.stopMain = window.requestAnimationFrame(main); // Start the cycle
	}

	function stopMain() {
		window.cancelAnimationFrame(MyGame.stopMain);
	}

	function queueUpdates(numTicks) {
		if (numTicks > MAX_UPDATES_PER_FRAME) {
			
			stopMain(); // Stop the main loop to prevent excessive updates
			MyGame.reset(); // Reset the game state if too many updates are needed

			// Optionally, you could also notify the user or log a message here
			// For example, you could log a warning or error message
			alert(`Too many updates (${numTicks}), game was pauased. Click ok to continue.`);
			
			startMain(); // Restart the main loop
			return;
		}
		
		for (let i = 0; i < numTicks; i++) {
			MyGame.lastTick += MyGame.tickLength; // Now lastTick is this tick.
			MyGame.update(MyGame.lastTick);
		}

		// if (numTicks > 0 && !isUpdating) {
		// 	isUpdating = true;
		// 	GameWorker.postMessage({
		// 		type: 'update',
		// 		payload: { numTicks }
		// 	});
		// }
	}
})();
// This is a self-invoking function that creates a new scope to avoid polluting the global namespace.