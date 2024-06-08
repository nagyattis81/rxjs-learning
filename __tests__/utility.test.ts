import { cold } from "jest-marbles";
import { finalize, tap } from "rxjs";

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

  xit("delay", () => {
    // TODO
  });

  xit("delayWhen", () => {
    // TODO
  });

  xit("dematerialize", () => {
    // TODO
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

  xit("repeat", () => {
    // TODO
  });

  xit("repeatWhen", () => {
    // TODO
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
