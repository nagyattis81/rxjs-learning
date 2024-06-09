import { Scheduler, cold, time } from "jest-marbles";
import {
  EMPTY,
  defer,
  from,
  generate,
  interval,
  of,
  range,
  take,
  throwError,
  timer,
} from "rxjs";

describe("Creation", () => {
  it("defer", () => {
    expect(defer(() => of(1, "A", 2, "B"))).toBeObservable(cold("(1A2B|"));
  });

  it("EMPTY", () => {
    expect(EMPTY).toBeObservable(cold("|"));
  });

  it("from", () => {
    expect(from([1, "A", 3, 4])).toBeObservable(cold("(1A34|"));
  });

  it("generate", () => {
    const result$ = generate(
      0,
      (x) => x < 3,
      (x) => x + 1,
      (x) => x
    );
    expect(result$).toBeObservable(cold("(012|"));
  });

  it("interval", () => {
    expect(interval(3, Scheduler.get()).pipe(take(3))).toBeObservable(
      cold("01(2|")
    );
  });

  it("of", () => {
    expect(of("H")).toBeObservable(cold("(H|"));
  });

  it("range", () => {
    expect(range(1, 9)).toBeObservable(cold("(123456789|"));
  });

  it("throw", () => {
    expect(throwError(() => "error")).toBeObservable(cold("#"));
  });

  it("timer", () => {
    expect(timer(time("---|"), Scheduler.get())).toBeObservable(cold("---(0|"));
  });
});
