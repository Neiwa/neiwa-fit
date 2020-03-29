/* eslint-disable no-param-reassign */
export function removeSlices(slice, slicesToRemove) {
  const { start, end } = slice;
  let slices = [slice];
  slicesToRemove.forEach(sliceToRemove => {
    slices.forEach(requestSlice => {
      if (
        sliceToRemove.start <= start &&
        start <= sliceToRemove.end &&
        sliceToRemove.end <= end
      ) {
        requestSlice.start = sliceToRemove.end;
      } else if (
        start <= sliceToRemove.start &&
        sliceToRemove.start <= end &&
        end <= sliceToRemove.end
      ) {
        requestSlice.end = sliceToRemove.start;
      } else if (start <= sliceToRemove.start && sliceToRemove.end <= end) {
        requestSlice.end = sliceToRemove.start;
        slices.push({ start: sliceToRemove.end, end });
      } else if (sliceToRemove.start <= start && end <= sliceToRemove.end) {
        requestSlice.start = null;
        requestSlice.end = null;
      }
    });
    slices = slices.filter(e => e.start !== null && e.start !== e.end);
  });
  return slices;
}

export function addSlice(newSlice, slices) {
  const intersectingSlices = slices.filter(
    slice =>
      (slice.start <= newSlice.start && newSlice.start <= slice.end) ||
      (slice.start <= newSlice.end && newSlice.end <= slice.end),
  );

  switch (intersectingSlices.length) {
    case 0: {
      slices.push(newSlice);
      break;
    }
    case 1: {
      const { start, end } = intersectingSlices[0];
      if (start <= newSlice.start && newSlice.start <= end) {
        intersectingSlices[0].end = newSlice.end;
      }
      if (start <= newSlice.end && newSlice.end <= end) {
        intersectingSlices[0].start = newSlice.start;
      }
      break;
    }
    case 2: {
      slices = slices.filter(
        slice =>
          !(
            (slice.start <= newSlice.start && newSlice.start <= slice.end) ||
            (slice.start <= newSlice.end && newSlice.end <= slice.end)
          ),
      );
      intersectingSlices.sort((l, r) => l.start - r.start);
      slices.push({
        start: intersectingSlices[0].start,
        end: intersectingSlices[1].end,
      });
      break;
    }
    default: {
      // eslint-disable-next-line no-console
      console.error('Too many intersecting slices');
      break;
    }
  }
  return slices;
}
