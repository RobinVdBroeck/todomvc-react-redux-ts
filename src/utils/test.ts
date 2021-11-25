import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import test, { ExecutionContext, TestInterface } from "ava";
import sinon from "sinon";

export function setup<T>(
  setupContext?: () => T,
  afterEach?: (t: T) => void
): TestInterface<T> {
  Enzyme.configure({ adapter: new Adapter() });
  if (typeof setupContext !== "undefined") {
    test.beforeEach((t: ExecutionContext<T>) => {
      t.context = setupContext();
    });
  }
  if (typeof afterEach !== "undefined") {
    test.afterEach.always((t: ExecutionContext<T>) => {
      sinon.restore();
      afterEach(t.context);
    });
  }

  return test;
}
