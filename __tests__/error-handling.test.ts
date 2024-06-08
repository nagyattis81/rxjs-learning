import { cold } from "jest-marbles";
import { catchError, of, retry } from "rxjs";

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

  xit("retryWhen", () => {
    // TODO
  });
});
