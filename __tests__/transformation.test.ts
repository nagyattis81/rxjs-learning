import { Scheduler, cold, time } from "jest-marbles";
import {
  buffer,
  bufferCount,
  bufferTime,
  concatMap,
  exhaustMap,
  expand,
  groupBy,
  map,
  mergeMap,
  mergeScan,
  of,
  partition,
  reduce,
  scan,
  switchMap,
  take,
  toArray,
} from "rxjs";

describe("Transformation", () => {
  it("buffer", () => {
    const source$ = cold("  abcdefghi|");
    const inner$ = cold("   ---a----b|");
    const expected$ = cold("---a----b(c|", {
      a: ["a", "b", "c", "d"],
      b: ["e", "f", "g", "h", "i"],
      c: [],
    });
    expect(source$.pipe(buffer(inner$))).toBeObservable(expected$);
  });

  it("bufferCount", () => {
    const source$ = cold("  abcdefghi|");
    const expected$ = cold("--a--b--c|", {
      a: ["a", "b", "c"],
      b: ["d", "e", "f"],
      c: ["g", "h", "i"],
    });
    expect(source$.pipe(bufferCount(3))).toBeObservable(expected$);
  });

  it("bufferTime", () => {
    const source$ = cold("  abcdefghi|");
    const expected$ = cold("---a--b--(c|", {
      a: ["a", "b", "c"],
      b: ["d", "e", "f", "g"],
      c: ["h", "i"],
    });
    expect(
      source$.pipe(bufferTime(time("---|"), Scheduler.get()))
    ).toBeObservable(expected$);
  });

  it("concatMap", () => {
    const source$ = cold("   -a---b---c-d-e|");
    const inner$ = cold("    1234|");
    const expected$ = cold(" -12341234123412341234|");
    expect(source$.pipe(concatMap(() => inner$))).toBeObservable(expected$);
  });

  it("exhaustMap", () => {
    const source$ = cold("   -a---b---c-d-e|");
    const inner$ = cold("    1234|");
    const expected$ = cold(" -1234----1234-|");
    expect(source$.pipe(exhaustMap(() => inner$))).toBeObservable(expected$);
  });

  it("expand", () => {
    const source$ = of(2);
    const example$ = source$.pipe(
      expand((val) => {
        return of(1 + val);
      }),
      take(5)
    );
    expect(example$).toBeObservable(cold("(23456|"));
  });

  it("groupBy", () => {
    const source$ = cold("abcd|", {
      a: { name: "Sue", age: 25 },
      b: { name: "Joe", age: 30 },
      c: { name: "Frank", age: 25 },
      d: { name: "Sarah", age: 35 },
    });
    const expected$ = cold("----(abc|", {
      a: [
        { name: "Sue", age: 25 },
        { name: "Frank", age: 25 },
      ],
      b: [{ name: "Joe", age: 30 }],
      c: [{ name: "Sarah", age: 35 }],
    });
    expect(
      source$.pipe(
        groupBy((value) => value.age),
        mergeMap((group) => group.pipe(toArray()))
      )
    ).toBeObservable(expected$);
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

  it("mergeMap", () => {
    const source$ = cold("   -a---b---c-d-e|");
    const inner$ = cold("    12|");
    const expected$ = cold(" -12--12--121212|");
    expect(source$.pipe(mergeMap(() => inner$))).toBeObservable(expected$);
  });

  it("mergeScan", () => {
    const source$ = cold("  abcd|", { a: 1, b: 1, c: 1, d: 1 });
    const expected$ = cold("1234|");
    expect(
      source$.pipe(mergeScan((acc, val) => of(acc + val), 0))
    ).toBeObservable(expected$);
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

  it("reduce", () => {
    const values = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    const source$ = cold("  abcd|", values);
    const expected$ = cold("----(a|", {
      a: values.a + values.b + values.c + values.d,
    });
    expect(source$.pipe(reduce((acc, val) => acc + val))).toBeObservable(
      expected$
    );
  });

  it("scan", () => {
    const values = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    const source$ = cold("  abcd|", values);
    const expected$ = cold("abcd|", {
      a: 1,
      b: 1 + 2,
      c: 3 + 3,
      d: 6 + 4,
    });
    expect(source$.pipe(scan((acc, curr) => acc + curr, 0))).toBeObservable(
      expected$
    );
  });

  it("switchMap", () => {
    const source$ = cold("   -a---b---c-d-e|");
    const inner$ = cold("    123|");
    const expected$ = cold(" -123-123-1212123|");
    expect(source$.pipe(switchMap(() => inner$))).toBeObservable(expected$);
  });

  it("toArray", () => {
    expect(cold("abcd|").pipe(toArray())).toBeObservable(
      cold("----(a|", { a: ["a", "b", "c", "d"] })
    );
  });
});
