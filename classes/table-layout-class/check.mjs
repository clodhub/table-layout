import { assert, load } from './runtime.mjs';
const m = await load('web/index.ts');
assert.equal(m.clampSeats(1), 2);
assert.equal(m.clampSeats(20), 9);
assert.equal(m.screenClass(400, 800), 'portrait');
assert.equal(m.screenClass(1200, 600), 'landscape');
assert.equal(m.relativeSeat(2, 2, 6), 0);
assert.equal(m.relativeSeat(1, 2, 6), 5);
assert.equal(m.screenClass(1200, 600, true), 'tv');
for (let seats = 2; seats <= 9; seats++) for (const orientation of ['portrait', 'landscape', 'tv']) {
  const options = { seats, orientation, width: 800, height: 500 };
  const layout = m.tableLayout(options);
  assert.deepEqual(m.tableLayout(options), layout);
  assert.equal(layout.seatSpots.length, seats);
  assert.equal(layout.board.length, 5);
  assert.equal(new Set(layout.seatSpots.map(spot => `${spot.x}:${spot.y}`)).size, seats);
  assert.ok(layout.cardWidth.shown >= layout.cardWidth.hidden && layout.cardWidth.hidden > 0);
  for (const point of [layout.pot, layout.deck, layout.burn, ...layout.board, ...layout.seatSpots]) {
    assert.ok(Number.isFinite(point.x) && Number.isFinite(point.y));
    assert.ok(point.x >= 0 && point.x <= 1 && point.y >= 0 && point.y <= 1);
  }
}
assert.ok(m.clockwiseTarget(Math.PI * 1.9, 0.1) >= Math.PI * 1.9);
