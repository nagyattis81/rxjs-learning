import { cold } from "jest-marbles";
import { catchError, of } from "rxjs";

describe("Error Handling", () => {
  it("catchError", () => {
    const source$ = cold("ab#");
    const expected$ = cold("ab(c|)", { a: "a", b: "b", c: "I caught: error" });
    expect(
      source$.pipe(catchError((value) => of(`I caught: ${value}`)))
    ).toBeObservable(expected$);
  });

  xit("retry", () => {
    // TODO
  });

  xit("retryWhen", () => {
    // TODO
  });
});
