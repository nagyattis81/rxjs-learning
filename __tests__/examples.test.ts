import { cold } from "jest-marbles";
import { catchError, first, take } from "rxjs";

describe("Examples", () => {
  it("first vs. take", () => {
    const source$ = cold("|");

    expect(
      source$.pipe(
        first(),
        catchError(() => "error")
      )
    ).toBeObservable(cold("(error|"));

    expect(source$.pipe(take(1))).toBeObservable(cold("|"));
  });
});
