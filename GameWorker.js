let lastTick;
let tickLength;

function initialize({ lastTick: lt, tickLength: tl }) {
    lastTick = lt;
    tickLength = tl;
}

self.onmessage = function (e) {
    const { type, payload } = e.data;

    if (type === 'init') {
        initialize(payload);
    } else if (type === 'update') {
        let { numTicks } = payload;
        let updates = [];
        for (let i = 0; i < numTicks; i++) {
            lastTick += tickLength;
            // TODO: Replace this with your actual game update logic
            updates.push({ tick: lastTick });
        }
        self.postMessage({ type: 'updated', payload: { lastTick, updates } });
    }
};

export default self;