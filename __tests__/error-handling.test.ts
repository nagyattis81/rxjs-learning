import { cold } from "jest-marbles";
import { catchError, of, retry, retryWhen } from "rxjs";

describe("Error Handling", () => {
  it("catchError", () => {
    const source$ = cold("   ab#");
    const expected$ = cold(" ab(c|)", { a: "a", b: "b", c: "I caught: error" });
    expect(
      source$.pipe(catchError((value) => of(`I caught: ${value}`)))
    ).toBeObservable(expected$);
  });

  it("retry", () => {
    const source$ = cold("   ab#");
    const expected$ = cold(" ababab#)");
    expect(source$.pipe(retry(2))).toBeObservable(expected$);
  });

  it("retryWhen", () => {
    const source1$ = cold("  ab#");
    const source2$ = cold("  ---r---r-|");
    const expected$ = cold(" ab---ab--ab|");
    expect(source1$.pipe(retryWhen(() => source2$))).toBeObservable(expected$);
  });
});
