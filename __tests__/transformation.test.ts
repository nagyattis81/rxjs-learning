import { cold } from "jest-marbles";
import { map, switchMap } from "rxjs";

describe("transformation", () => {
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

  it("switchMap", () => {
    const values = { a: 1, b: 2, x: 3, y: 4 };
    const source1$ = cold("a-b|", values);
    const source2$ = cold("-x-y|", values);
    const expected$ = cold("-a-b-c|", {
      a: values.x,
      b: values.x,
      c: values.y,
    });
    expect(source1$.pipe(switchMap(() => source2$))).toBeObservable(expected$);
  });
});
