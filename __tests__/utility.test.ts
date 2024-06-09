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
  timeInterval,
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

  it("repeat", () => {
    expect(cold("a|").pipe(repeat(3))).toBeObservable(cold("aaa|"));
  });

  it("repeatWhen", () => {
    const source1$ = cold("  ---a---a|");
    const source2$ = cold("  ab|");
    const expected$ = cold(" ab---ab--ab|");
    expect(source2$.pipe(repeatWhen(() => source1$))).toBeObservable(expected$);
  });

  it("timeInterval", () => {
    const source$ = cold("-a-b-c|");
    const expected$ = cold("-a-b-c|", {
      a: { interval: 10, value: "a" },
      b: { interval: 20, value: "b" },
      c: { interval: 20, value: "c" },
    });
    expect(source$.pipe(timeInterval(Scheduler.get()))).toBeObservable(
      expected$
    );
  });
});
