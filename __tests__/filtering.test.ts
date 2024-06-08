import { cold } from "jest-marbles";
import { Observable, filter, first, last, takeUntil } from "rxjs";

describe("filtering", () => {
  it("filter", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source$: Observable<number> = cold("abcdef|", values);
    const expected$ = cold("---d-f|", values);
    expect(
      source$.pipe(
        filter((value: number): boolean => value > 2),
        filter((value: number): boolean => value % 2 === 0)
      )
    ).toBeObservable(expected$);
  });

  it("takeuntil", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source$: Observable<number> = cold("abcdef|", values);
    const destroy$: Observable<number> = cold("--(a|)", values);
    const expected$ = cold("ab|", values);
    expect(source$.pipe(takeUntil(destroy$))).toBeObservable(expected$);
  });

  it("first", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source$: Observable<number> = cold("abcdef|", values);
    const expected$ = cold("(a|)", values);
    expect(source$.pipe(first())).toBeObservable(expected$);
  });

  it("last", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source$: Observable<number> = cold("abcdef|", values);
    const expected$ = cold("------(f|)", values);
    expect(source$.pipe(last())).toBeObservable(expected$);
  });
});
