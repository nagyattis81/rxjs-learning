import { cold } from "jest-marbles";
import {
  combineLatest,
  concat,
  endWith,
  forkJoin,
  merge,
  pairwise,
  race,
  startWith,
  withLatestFrom,
  zip,
} from "rxjs";

describe("Combination", () => {
  xit("combineAll", () => {
    // TODO
  });

  it("combineLatest", () => {
    const values = { a: 1, b: 2, x: 3, y: 4 };
    const source1$ = cold("  a-b|", values);
    const source2$ = cold("  -x-y|", values);
    const expected$ = cold(" -abc|", {
      a: [values.a, values.x],
      b: [values.b, values.x],
      c: [values.b, values.y],
    });
    expect(combineLatest([source1$, source2$])).toBeObservable(expected$);
  });

  it("concat", () => {
    const values = { a: 1, b: 2, c: 3, d: 4 };
    const source1$ = cold("  ab|", values);
    const source2$ = cold("  cd|", values);
    const expected$ = cold(" abcd|", values);
    expect(concat(source1$, source2$)).toBeObservable(expected$);
  });

  xit("concatAll", () => {
    // TODO
  });

  it("endWith", () => {
    const values = { a: 1, b: 2, c: 3, d: 4 };
    const source = cold("abc|", values);
    const expected$ = cold("abc(d|", values);
    expect(source.pipe(endWith(4))).toBeObservable(expected$);
  });

  it("forkJoin", () => {
    const values = { a: 1, b: 2, x: 3, y: 4 };
    const source1$ = cold("  a-b|", values);
    const source2$ = cold("  -x-y|", values);
    const expected$ = cold(" ----(a|)", {
      a: [values.b, values.y],
    });
    expect(forkJoin([source1$, source2$])).toBeObservable(expected$);
  });

  it("merge", () => {
    const values = { a: 1, b: 2, x: 3, y: 4 };
    const source1$ = cold("  a---b-|", values);
    const source2$ = cold("  --x--y|", values);
    const expected$ = cold(" a-x-by|", values);
    expect(merge(source1$, source2$)).toBeObservable(expected$);
  });

  xit("mergeAll", () => {
    // TODO
  });

  it("pairwise", () => {
    const values = { a: 1, b: 2, c: 3, d: 4 };
    const source$ = cold("   abcd|", values);
    const expected$ = cold(" -abc|", {
      a: [values.a, values.b],
      b: [values.b, values.c],
      c: [values.c, values.d],
    });
    expect(source$.pipe(pairwise())).toBeObservable(expected$);
  });

  it("race", () => {
    const values = { a: 1, b: 2, x: 3, y: 4 };
    const source1$ = cold("  a-b|", values);
    const source2$ = cold("  -x-y|", values);
    const expected$ = cold(" a-b|", {
      a: values.a,
      b: values.b,
    });
    expect(race([source1$, source2$])).toBeObservable(expected$);
  });

  it("startWith", () => {
    const values = { a: 1, b: 2, c: 3, d: 4 };
    const source = cold("-bcd|", values);
    const expected$ = cold("abcd|", values);
    expect(source.pipe(startWith(1))).toBeObservable(expected$);
  });

  it("withLatestFrom", () => {
    const values = { a: 1, b: 2, c: 3, d: 4 };
    const source1$ = cold("  ab|", values);
    const source2$ = cold("  cd|", values);
    const expected$ = cold(" ab|", {
      a: [values.a, values.c],
      b: [values.b, values.d],
    });
    expect(source1$.pipe(withLatestFrom(source2$))).toBeObservable(expected$);
  });

  it("zip", () => {
    const values = { a: 1, b: 2, x: 3, y: 4 };
    const source1$ = cold("  a-b|", values);
    const source2$ = cold("  -x-y|", values);
    const expected$ = cold(" -a-(b|)", {
      a: [values.a, values.x],
      b: [values.b, values.y],
    });
    expect(zip([source1$, source2$])).toBeObservable(expected$);
  });
});
