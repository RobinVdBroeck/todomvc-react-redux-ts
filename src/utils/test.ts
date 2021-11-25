import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import test from "ava";

export function setup<T = {}>(
  setupContext?: () => T,
  afterEach?: (t: T) => void
): any {
  Enzyme.configure({ adapter: new Adapter() });
  if (typeof setupContext !== "undefined") {
    test.beforeEach((t) => {
      t.context = setupContext();
    });
  }
  if (typeof afterEach !== "undefined") {
    test.afterEach.always((t) => {
      afterEach(t.context as any);
    });
  }

  return test;
}
