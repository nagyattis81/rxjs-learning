import { Scheduler, cold, time } from "jest-marbles";
import { EMPTY, interval, of, range, take, throwError, timer } from "rxjs";

describe("Creation", () => {
  xit("ajax", () => {
    // TODO
  });

  xit("create", () => {
    // TODO
  });

  xit("defer", () => {
    // TODO
  });

  it("EMPTY", () => {
    expect(EMPTY).toBeObservable(cold("|"));
  });

  xit("from", () => {
    // TODO
  });

  xit("fromEvent", () => {
    // TODO
  });

  xit("generate", () => {
    // TODO
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
