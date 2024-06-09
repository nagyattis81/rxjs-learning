import { Scheduler, cold, time } from "jest-marbles";
import {
  delay,
  delayWhen,
  finalize,
  repeat,
  repeatWhen,
  tap,
  Notification,
  of,
  dematerialize,
} from "rxjs";

describe("Utility", () => {
  it("tap", () => {
    const mockFunction = jest.fn().mockImplementation((value: number) => value);
    expect(
      cold("abc|", { a: 1, b: 2, c: 3 }).pipe(tap(mockFunction))
    ).toSatisfyOnFlush(() => {
      expect(mockFunction).toHaveBeenCalledTimes(3);
      expect(mockFunction).toHaveBeenCalledWith(1);
      expect(mockFunction).toHaveBeenCalledWith(2);
      expect(mockFunction).toHaveBeenCalledWith(3);
      expect(mockFunction).not.toHaveBeenCalledWith(4);
    });
  });

  it("delay", () => {
    expect(
      cold("a|").pipe(delay(time("---|"), Scheduler.get()))
    ).toBeObservable(cold("---(a|"));
  });

  it("delayWhen", () => {
    expect(cold("a|").pipe(delayWhen(() => cold("---b|")))).toBeObservable(
      cold("---(a|")
    );
  });

  it("dematerialize", () => {
    const source1$ = of(Notification.createNext("a")).pipe(dematerialize());
    expect(source1$).toBeObservable(cold("(a|"));
  });

  it("finalize", () => {
    const mockFunction = jest.fn();
    expect(cold("a|").pipe(finalize(mockFunction))).toSatisfyOnFlush(() => {
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
  });

  xit("let", () => {
    // TODO
  });

  it("repeat", () => {
    expect(cold("a|").pipe(repeat(3))).toBeObservable(cold("aaa|"));
  });

  it("repeatWhen", () => {
    const source1$ = cold("  ---a---a|");
    const source2$ = cold("  ab|");
    const expected$ = cold(" ab---ab--ab|");
    expect(source2$.pipe(repeatWhen(() => source1$))).toBeObservable(expected$);
  });

  xit("timeInterval", () => {
    // TODO
  });

  xit("timeout", () => {
    // TODO
  });

  xit("timeoutWith", () => {
    // TODO
  });

  xit("toPromise", () => {
    // TODO
  });
});
