import { useState } from "react";
import cx from "./cx";
import { tabData } from "./data";

const TabItem = ({
  id,
  title,
  description,
  current,
  toggle,
}: {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: () => void;
}) => {
  return (
    <li className={cx("item", { current })}>
      <div className={cx("tab")} onClick={toggle}>
        {title}
      </div>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

const Tab3 = () => {
  const [currentId, setCurrentId] = useState<string | null>(tabData[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <h3>
        #3. React<sub>한 list 안에 title/desc 둘 다 넣기</sub>
      </h3>
      <div className={cx("container", "tabMenu3")}>
        <ul className={cx("tabList")}>
          {tabData.map((d) => (
            <TabItem
              {...d}
              key={d.id}
              current={currentId === d.id}
              toggle={toggleItem(d.id)}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Tab3;
