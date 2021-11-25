import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import * as ava from "ava";

// T is type of the context
export function setup<T = {}>(
  setupContext?: () => T,
  afterEach?: (t: T) => void
): ava.RegisterContextual<T> {
  Enzyme.configure({ adapter: new Adapter() });
  if (typeof setupContext !== "undefined") {
    ava.test.beforeEach((t) => {
      t.context = setupContext();
    });
  }
  if (typeof afterEach !== "undefined") {
    ava.test.afterEach.always((t) => {
      afterEach(t.context);
    });
  }

  return ava.test;
}
