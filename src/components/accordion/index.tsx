import Accordion1 from "./1_r";
import cx from "./cx";

const Accordion = () => {
  return (
    <div className={cx("Accordion")}>
      <h1>아코디언1</h1>
      <Accordion1 />
    </div>
  );
};

export default Accordion;
