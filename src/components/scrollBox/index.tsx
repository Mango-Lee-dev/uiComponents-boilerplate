import cx from "./cx";
import ScrollBox_React from "./react";
import ScrollBox_Vanilla from "./vanilla";

const ScrollBox = () => {
  return (
    <div
      className={cx("ScrollBoxPage")}
      style={{
        marginBottom: 100,
      }}
    >
      <h2>Scroll Box</h2>
      <ScrollBox_React />
      <ScrollBox_Vanilla />
    </div>
  );
};

export default ScrollBox;
