import Accordion1 from "./1_r";
import Accordion2 from "./2_r";
import Accordion3 from "./3_r";
import Accordion4V from "./4_r";
import cx from "./cx";

const Accordion = () => {
  return (
    <div className={cx("Accordion")}>
      <h1>아코디언1</h1>
      <Accordion1 />
      <Accordion2 />
      <Accordion3 />
      <Accordion4V />
    </div>
  );
};

export default Accordion;
