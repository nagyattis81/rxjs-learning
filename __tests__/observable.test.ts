import { cold } from "jest-marbles";
import { Observable, Subscriber } from "rxjs";

describe("Observable", () => {
  it("simple", () => {
    const observable$ = new Observable<number>(
      (subscribe: Subscriber<number>) => {
        subscribe.next(3);
        subscribe.complete();
      }
    );
    expect(observable$).toBeObservable(cold("(3|"));
  });

  it("error", () => {
    const observable$ = new Observable((subscribe: Subscriber<unknown>) => {
      subscribe.error("error");
    });
    expect(observable$).toBeObservable(cold("#"));
  });
});
