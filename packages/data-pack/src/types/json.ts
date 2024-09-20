import { cached } from "../lib/cached";
import { defineType } from "../lib/defineType";
import str from "./str";

export default cached(() => {
  const _str = str();

  return defineType({
    name: 'Json',
    read() {
      return JSON.parse(this.read(_str));
    },
    write(data) {
      this.write(_str, JSON.stringify(data));
    },
    equal(value) {
      try {
        JSON.stringify(value);
        return true;
      } catch (e) {
        return false;
      }
    }
  });
});