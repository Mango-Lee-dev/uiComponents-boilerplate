import Accordion1 from "./1_r";
import Accordion2 from "./2_r";
import cx from "./cx";

const Accordion = () => {
  return (
    <div className={cx("Accordion")}>
      <h1>아코디언1</h1>
      <Accordion1 />
      <Accordion2 />
    </div>
  );
};

export default Accordion;
