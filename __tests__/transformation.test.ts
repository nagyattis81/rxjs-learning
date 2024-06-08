import { cold } from "jest-marbles";
import {
  groupBy,
  map,
  mapTo,
  mergeMap,
  partition,
  pluck,
  reduce,
  scan,
  switchMap,
  toArray,
} from "rxjs";

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

  it("mapTo", () => {
    expect(cold("1234|").pipe(mapTo("*"))).toBeObservable(cold("****|"));
    expect(cold("1234|").pipe(map(() => "*"))).toBeObservable(cold("****|"));
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

  it("pluck", () => {
    const source$ = cold("abcd|", {
      a: { name: "Sue", age: 25 },
      b: { name: "Joe", age: 30 },
      c: { name: "Frank", age: 25 },
      d: { name: "Sarah", age: 35 },
    });
    expect(source$.pipe(pluck("name"))).toBeObservable(
      cold("abcd|", { a: "Sue", b: "Joe", c: "Frank", d: "Sarah" })
    );
    expect(source$.pipe(map((value) => value.name))).toBeObservable(
      cold("abcd|", { a: "Sue", b: "Joe", c: "Frank", d: "Sarah" })
    );
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

  it("toArray", () => {
    expect(cold("abcd|").pipe(toArray())).toBeObservable(
      cold("----(a|", { a: ["a", "b", "c", "d"] })
    );
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
