import { removeSlices, addSlice, partitionSlices } from '../slice';

describe('removeSlices()', () => {
  it('returns one slice', () => {
    expect(removeSlices({ start: 1, end: 2 }, [])).toEqual([
      { start: 1, end: 2 },
    ]);
  });
  it('returns same as input no intersection', () => {
    expect(
      removeSlices({ start: 3, end: 4 }, [
        { start: 1, end: 2 },
        { start: 5, end: 6 },
      ]),
    ).toEqual([{ start: 3, end: 4 }]);
  });
  it('returns middle section', () => {
    expect(
      removeSlices({ start: 2, end: 6 }, [
        { start: 1, end: 3 },
        { start: 5, end: 7 },
      ]),
    ).toEqual([{ start: 3, end: 5 }]);
  });
  it('also returns middle section', () => {
    expect(
      removeSlices({ start: 1, end: 6 }, [
        { start: 1, end: 2 },
        { start: 5, end: 6 },
      ]),
    ).toEqual([{ start: 2, end: 5 }]);
  });
  it('splits into two', () => {
    expect(removeSlices({ start: 2, end: 6 }, [{ start: 3, end: 5 }])).toEqual([
      { start: 2, end: 3 },
      { start: 5, end: 6 },
    ]);
  });
  it('full intersect', () => {
    expect(removeSlices({ start: 2, end: 3 }, [{ start: 1, end: 4 }])).toEqual(
      [],
    );
  });
  it('matching intersect', () => {
    expect(removeSlices({ start: 2, end: 3 }, [{ start: 2, end: 3 }])).toEqual(
      [],
    );
  });
});

describe('addSlice()', () => {
  it('adds slice to empty slices', () => {
    expect(addSlice({ start: 1, end: 2 }, [])).toEqual([{ start: 1, end: 2 }]);
  });
  it('adds slice to non-intersecting slices', () => {
    const actual = addSlice({ start: 1, end: 2 }, [{ start: 3, end: 4 }]);
    expect(actual.length).toBe(2);
    expect(actual).toContainEqual({ start: 1, end: 2 });
    expect(actual).toContainEqual({ start: 3, end: 4 });
  });
  it('adds slice to start of intersecting slices', () => {
    expect(addSlice({ start: 1, end: 2 }, [{ start: 2, end: 4 }])).toEqual([
      { start: 1, end: 4 },
    ]);
  });
  it('adds slice to end of intersecting slices', () => {
    expect(addSlice({ start: 4, end: 5 }, [{ start: 2, end: 4 }])).toEqual([
      { start: 2, end: 5 },
    ]);
  });
  it('adds slice in middle to join intersecting slices', () => {
    expect(
      addSlice({ start: 2, end: 3 }, [
        { start: 1, end: 2 },
        { start: 3, end: 4 },
      ]),
    ).toEqual([{ start: 1, end: 4 }]);
  });
  it('adds slice already in slices', () => {
    expect(addSlice({ start: 1, end: 2 }, [{ start: 1, end: 2 }])).toEqual([
      { start: 1, end: 2 },
    ]);
  });
});

describe('partitionSlices()', () => {
  it('does not partition if not needed', () => {
    expect(
      partitionSlices([{ start: 1, end: 3 }, { start: 7, end: 9 }], 3),
    ).toEqual([{ start: 1, end: 3 }, { start: 7, end: 9 }]);
  });
  it('partitions to maxLength', () => {
    expect(partitionSlices([{ start: 1, end: 5 }], 2)).toEqual([
      { start: 1, end: 3 },
      { start: 3, end: 5 },
    ]);
  });
  it('partitions multiple to maxLength', () => {
    expect(
      partitionSlices([{ start: 1, end: 5 }, { start: 7, end: 11 }], 2),
    ).toEqual([
      { start: 1, end: 3 },
      { start: 3, end: 5 },
      { start: 7, end: 9 },
      { start: 9, end: 11 },
    ]);
  });
});
