import { cold } from "jest-marbles";
import { map, partition, switchMap } from "rxjs";

describe("Transformation", () => {
  xit("buffer", () => {
    // TODO
  });

  xit("bufferCount", () => {
    // TODO
  });

  xit("bufferTime", () => {
    // TODO
  });

  xit("bufferToggle", () => {
    // TODO
  });

  xit("bufferWhen", () => {
    // TODO
  });

  xit("concatMap", () => {
    // TODO
  });

  xit("concatMapTo", () => {
    // TODO
  });

  xit("exhaustMap", () => {
    // TODO
  });

  xit("expand", () => {
    // TODO
  });

  xit("groupBy", () => {
    // TODO
  });

  it("map", () => {
    const values = { a: 1, b: 2, c: 3, d: 4 };
    const marbles = "abcd|";
    const source$ = cold(marbles, values);
    const expected$ = cold(marbles, {
      a: "R=2",
      b: "R=4",
      c: "R=6",
      d: "R=8",
    });
    expect(
      source$.pipe(map((value: number): string => `R=${value * 2}`))
    ).toBeObservable(expected$);
  });

  xit("mapTo", () => {
    // TODO
  });

  xit("mergeMap", () => {
    // TODO
  });

  xit("mergeScan", () => {
    // TODO
  });

  it("partition", () => {
    const source$ = cold("abcd|", { a: 1, b: 2, c: 3, d: 4 });
    const [evenObservable$, oddObservable$] = partition(
      source$,
      (value) => value % 2 === 0
    );
    expect(evenObservable$).toBeObservable(cold(" -a-b|", { a: 2, b: 4 }));
    expect(oddObservable$).toBeObservable(cold("  a-b-|", { a: 1, b: 3 }));
  });

  xit("pluck", () => {
    // TODO
  });

  xit("reduce", () => {
    // TODO
  });

  xit("scan", () => {
    // TODO
  });

  it("switchMap", () => {
    const values = { a: 1, b: 2, x: 3, y: 4 };
    const source1$ = cold("  a-b|", values);
    const source2$ = cold("  -x-y|", values);
    const expected$ = cold(" -a-b-c|", {
      a: values.x,
      b: values.x,
      c: values.y,
    });
    expect(source1$.pipe(switchMap(() => source2$))).toBeObservable(expected$);
  });

  xit("switchMapTo", () => {
    // TODO
  });

  xit("toArray", () => {
    // TODO
  });

  xit("window", () => {
    // TODO
  });

  xit("windowCount", () => {
    // TODO
  });

  xit("windowTime", () => {
    // TODO
  });

  xit("windowToggle", () => {
    // TODO
  });

  xit("windowWhen", () => {
    // TODO
  });
});
