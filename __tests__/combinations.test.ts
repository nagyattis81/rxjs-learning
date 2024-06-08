import { cold } from "jest-marbles";
import { combineLatest, forkJoin, pairwise, race, zip } from "rxjs";

describe("combinations", () => {
  it("combineLatest", () => {
    const values = { a: 1, b: 2, x: 3, y: 4 };
    const source1$ = cold("a-b|", values);
    const source2$ = cold("-x-y|", values);
    const expected$ = cold("-abc|", {
      a: [values.a, values.x],
      b: [values.b, values.x],
      c: [values.b, values.y],
    });
    expect(combineLatest([source1$, source2$])).toBeObservable(expected$);
  });

  it("forkJoin", () => {
    const values = { a: 1, b: 2, x: 3, y: 4 };
    const source1$ = cold("a-b|", values);
    const source2$ = cold("-x-y|", values);
    const expected$ = cold("----(a|)", {
      a: [values.b, values.y],
    });
    expect(forkJoin([source1$, source2$])).toBeObservable(expected$);
  });

  it("zip", () => {
    const values = { a: 1, b: 2, x: 3, y: 4 };
    const source1$ = cold("a-b|", values);
    const source2$ = cold("-x-y|", values);
    const expected$ = cold("-a-(b|)", {
      a: [values.a, values.x],
      b: [values.b, values.y],
    });
    expect(zip([source1$, source2$])).toBeObservable(expected$);
  });

  it("race", () => {
    const values = { a: 1, b: 2, x: 3, y: 4 };
    const source1$ = cold("a-b|", values);
    const source2$ = cold("-x-y|", values);
    const expected$ = cold("a-b|", {
      a: values.a,
      b: values.b,
    });
    expect(race([source1$, source2$])).toBeObservable(expected$);
  });

  it("pairwise", () => {
    const values = { a: 1, b: 2, c: 3, d: 4 };
    const source$ = cold("abcd|", values);
    const expected$ = cold("-abc|", {
      a: [values.a, values.b],
      b: [values.b, values.c],
      c: [values.c, values.d],
    });
    expect(source$.pipe(pairwise())).toBeObservable(expected$);
  });
});
