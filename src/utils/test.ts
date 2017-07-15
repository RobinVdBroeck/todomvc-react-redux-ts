import * as ava from "ava";

// T is type of the context
export function setup<T = {}>(
  setupContext?: () => T,
  afterEach?: (t: ava.GenericTestContext<ava.Context<T>>) => void
): ava.RegisterContextual<T> {
  if (typeof setupContext !== "undefined") {
    ava.test.beforeEach(t => {
      t.context = setupContext();
    });
  }
  if (typeof afterEach !== "undefined") {
    ava.test.afterEach.always(afterEach);
  }

  return ava.test;
}
