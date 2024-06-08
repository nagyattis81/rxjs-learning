import { cold } from "jest-marbles";
import { defaultIfEmpty, every, iif, mergeMap, of } from "rxjs";

describe("Conditional", () => {
  it("defaultIfEmpty", () => {
    const exampleOne$ = of().pipe(defaultIfEmpty("a"));
    const expected$ = cold("(a|)");
    expect(exampleOne$).toBeObservable(expected$);
  });

  it("every", () => {
    const source = cold("    abcde|", { a: 1, b: 2, c: 3, d: 4, e: 5 });
    const expected$ = cold(" ---(a|)", { a: false });
    expect(source.pipe(every((value) => value < 4))).toBeObservable(expected$);
  });

  it("iif", () => {
    const x$ = of("A");
    const r$ = of("B");
    const source$ = cold("1243|");
    const expected$ = cold("ABBA|");
    expect(
      source$.pipe(mergeMap((v) => iif(() => v % 2 === 0, r$, x$)))
    ).toBeObservable(expected$);
  });

  xit("sequenceEqual", () => {
    // TODO
  });
});
