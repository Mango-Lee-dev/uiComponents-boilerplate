import Tab1 from "./1_r";
import Tab2 from "./2_r";
import Tab3 from "./3_r";
import Tab4 from "./4_r";
import cx from "./cx";

const TabMenus = () => {
  return (
    <div className={cx("TabMenus")}>
      <h1>탭메뉴</h1>
      <Tab1 />
      <Tab2 />
      <Tab3 />
      <Tab4 />
    </div>
  );
};

export default TabMenus;
