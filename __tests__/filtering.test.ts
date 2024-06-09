import { cold } from "jest-marbles";
import {
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  find,
  first,
  ignoreElements,
  last,
  single,
  skip,
  skipUntil,
  skipWhile,
  take,
  takeLast,
  takeUntil,
  takeWhile,
} from "rxjs";

describe("Filtering", () => {
  it("distinct", () => {
    const source$ = cold("  --1234512345|");
    const expected$ = cold("--12345-----|)");
    expect(source$.pipe(distinct())).toBeObservable(expected$);
  });

  it("distinctUntilChanged", () => {
    const source$ = cold("   112223|");
    const expected$ = cold(" 1-2--3|)");
    expect(source$.pipe(distinctUntilChanged())).toBeObservable(expected$);
  });

  it("distinctUntilKeyChanged", () => {
    const values = {
      a: { name: "Brian" },
      b: { name: "Joe" },
      c: { name: "Joe" },
      d: { name: "Sue" },
    };
    const source$ = cold("abcd|", values);
    const expected$ = cold("ab-d|", values);
    expect(source$.pipe(distinctUntilKeyChanged("name"))).toBeObservable(
      expected$
    );
  });

  it("filter", () => {
    expect(
      cold("123456|").pipe(
        filter((value: number): boolean => value > 2),
        filter((value: number): boolean => value % 2 === 0)
      )
    ).toBeObservable(cold("---4-6|"));
  });

  it("find", () => {
    expect(
      cold("123456|").pipe(find((value: number) => value % 3 === 0))
    ).toBeObservable(cold("--(3|)"));
  });

  it("first", () => {
    expect(cold("123456|").pipe(first())).toBeObservable(cold("(1|)"));
  });

  it("ignoreElements", () => {
    expect(cold("123456|").pipe(ignoreElements())).toBeObservable(
      cold(" ------|")
    );
    expect(cold("123456#").pipe(ignoreElements())).toBeObservable(
      cold(" ------#")
    );
  });

  it("last", () => {
    expect(cold("123456|").pipe(last())).toBeObservable(cold("------(6|)"));
  });

  it("single", () => {
    expect(
      cold("abcdef|").pipe(single((value: string) => value === "d"))
    ).toBeObservable(cold("------(d|)"));
  });

  it("skip", () => {
    const source$ = cold("   123456|");
    const expected$ = cold(" ---456|)");
    expect(source$.pipe(skip(3))).toBeObservable(expected$);
  });

  it("skipUntil", () => {
    const source1$ = cold("  123456|");
    const source2$ = cold("  ---4--|");
    const expected$ = cold(" ---456|)");
    expect(source1$.pipe(skipUntil(source2$))).toBeObservable(expected$);
  });

  it("skipWhile", () => {
    const source$ = cold("   123456|");
    const expected$ = cold(" --3456|)");
    expect(
      source$.pipe(skipWhile((value: number) => value <= 2))
    ).toBeObservable(expected$);
  });

  it("take", () => {
    const source$ = cold("   123456|");
    const expected$ = cold(" 1(2|)");
    expect(source$.pipe(take(2))).toBeObservable(expected$);
  });

  it("takeLast", () => {
    const source$ = cold("   123456|");
    const expected$ = cold(" ------(56|)");
    expect(source$.pipe(takeLast(2))).toBeObservable(expected$);
  });

  it("takeUntil", () => {
    const source$ = cold("   123456|");
    const destroy$ = cold("  --(1|");
    const expected$ = cold(" 12|");
    expect(source$.pipe(takeUntil(destroy$))).toBeObservable(expected$);
  });

  it("takeWhile", () => {
    const source$ = cold("   123456|");
    const expected$ = cold(" 1234|");
    expect(
      source$.pipe(takeWhile((value: number) => value <= 4))
    ).toBeObservable(expected$);
  });
});
