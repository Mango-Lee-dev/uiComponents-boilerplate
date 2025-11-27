import Tab1 from "./1_r";
import Tab2 from "./2_r";
import cx from "./cx";

const TabMenus = () => {
  return (
    <div className={cx("TabMenus")}>
      <h1>탭메뉴</h1>
      <Tab1 />
      <Tab2 />
    </div>
  );
};

export default TabMenus;
