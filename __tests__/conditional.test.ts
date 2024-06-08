import { cold } from "jest-marbles";
import { every } from "rxjs";

describe("Conditional", () => {
  xit("defaultIfEmpty", () => {
    // TODO
  });

  it("every", () => {
    const source = cold("abcde|", { a: 1, b: 2, c: 3, d: 4, e: 5 });
    const expected$ = cold("---(a|)", { a: false });
    expect(source.pipe(every((value) => value < 4))).toBeObservable(expected$);
  });

  xit("iif", () => {
    // TODO
  });

  xit("sequenceequal", () => {
    // TODO
  });
});
