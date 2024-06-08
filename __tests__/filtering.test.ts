import { cold } from "jest-marbles";
import {
  Observable,
  distinctUntilChanged,
  filter,
  first,
  last,
  skip,
  skipUntil,
  skipWhile,
  take,
  takeLast,
  takeUntil,
  takeWhile,
} from "rxjs";

describe("Filtering", () => {
  xit("audit", () => {
    // TODO
  });

  xit("auditTime", () => {
    // TODO
  });

  xit("debounce", () => {
    // TODO
  });

  xit("debounceTime", () => {
    // TODO
  });

  xit("distinct", () => {
    // TODO
  });

  it("distinctUntilChanged", () => {
    const values = { a: 1, b: 1, c: 2, d: 2, e: 2, f: 3 };
    const source$: Observable<number> = cold("abcdef|", values);
    const expected$ = cold("a-b--c|)", {
      a: values.a,
      b: values.c,
      c: values.f,
    });
    expect(source$.pipe(distinctUntilChanged())).toBeObservable(expected$);
  });

  xit("distinctUntilKeyChanged", () => {
    // TODO
  });

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

  xit("find", () => {
    // TODO
  });

  it("first", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source$: Observable<number> = cold("abcdef|", values);
    const expected$ = cold("(a|)", values);
    expect(source$.pipe(first())).toBeObservable(expected$);
  });

  xit("ignoreElements", () => {
    // TODO
  });

  it("last", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source$: Observable<number> = cold("abcdef|", values);
    const expected$ = cold("------(f|)", values);
    expect(source$.pipe(last())).toBeObservable(expected$);
  });

  xit("sample", () => {
    // TODO
  });

  xit("single", () => {
    // TODO
  });

  it("skip", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source$: Observable<number> = cold("abcdef|", values);
    const expected$ = cold("---def|)", values);
    expect(source$.pipe(skip(3))).toBeObservable(expected$);
  });

  it("skipUntil", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source1$: Observable<number> = cold("abcdef|", values);
    const source2$: Observable<number> = cold("---d--|", values);
    const expected$ = cold("---def|)", values);
    expect(source1$.pipe(skipUntil(source2$))).toBeObservable(expected$);
  });

  it("skipWhile", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source$: Observable<number> = cold("abcdef|", values);
    const expected$ = cold("--cdef|)", values);
    expect(
      source$.pipe(skipWhile((value: number) => value <= 2))
    ).toBeObservable(expected$);
  });

  it("take", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source$: Observable<number> = cold("abcdef|", values);
    const expected$ = cold("a(b|)", values);
    expect(source$.pipe(take(2))).toBeObservable(expected$);
  });

  it("takeLast", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source$: Observable<number> = cold("abcdef|", values);
    const expected$ = cold("------(ef|)", values);
    expect(source$.pipe(takeLast(2))).toBeObservable(expected$);
  });

  it("takeUntil", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source$: Observable<number> = cold("abcdef|", values);
    const destroy$: Observable<number> = cold("--(a|)", values);
    const expected$ = cold("ab|", values);
    expect(source$.pipe(takeUntil(destroy$))).toBeObservable(expected$);
  });

  it("takeWhile", () => {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const source$: Observable<number> = cold("abcdef|", values);
    const expected$ = cold("abcd|", values);
    expect(
      source$.pipe(takeWhile((value: number) => value <= 4))
    ).toBeObservable(expected$);
  });

  xit("throttle", () => {
    // TODO
  });

  xit("throttleTime", () => {
    // TODO
  });
});
