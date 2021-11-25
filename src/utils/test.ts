import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import test, { TestInterface } from "ava";
import sinon from "sinon";

export function setup<T = {}>(
  setupContext?: () => T,
  afterEach?: (t: T) => void
): TestInterface<any> {
  Enzyme.configure({ adapter: new Adapter() });
  if (typeof setupContext !== "undefined") {
    test.beforeEach((t) => {
      t.context = setupContext();
    });
  }
  if (typeof afterEach !== "undefined") {
    test.afterEach.always((t) => {
      sinon.restore();
      afterEach(t.context as any);
    });
  }

  return test;
}
