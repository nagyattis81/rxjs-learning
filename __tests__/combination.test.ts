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
    const source2$ = cold("    cd|", values);
    const expected$ = cold(" abcd|", values);
    expect(concat(source1$, source2$)).toBeObservable(expected$);
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
    const source1$ = cold("  1---3-|");
    const source2$ = cold("  --2--4|");
    const expected$ = cold(" 1-2-34|");
    expect(merge(source1$, source2$)).toBeObservable(expected$);
  });

  it("pairwise", () => {
    const source$ = cold("   1234|");
    const expected$ = cold(" -abc|", {
      a: ["1", "2"],
      b: ["2", "3"],
      c: ["3", "4"],
    });
    expect(source$.pipe(pairwise())).toBeObservable(expected$);
  });

  it("race", () => {
    const source1$ = cold("  1-3|");
    const source2$ = cold("  -2-4|");
    const expected$ = cold(" 1-3|");
    expect(race([source1$, source2$])).toBeObservable(expected$);
  });

  it("startWith", () => {
    const source = cold("   -234|");
    const expected$ = cold("1234|");
    expect(source.pipe(startWith(1))).toBeObservable(expected$);
  });

  it("withLatestFrom", () => {
    const source1$ = cold("  12|");
    const source2$ = cold("  34|");
    const expected$ = cold(" ab|", {
      a: ["1", "3"],
      b: ["2", "4"],
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
