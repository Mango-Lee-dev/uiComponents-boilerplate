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
    <li className={cx("tab", { current })} key={id} onClick={toggle}>
      {title}
    </li>
  );
};

const Tab2 = () => {
  const [currentId, setCurrentId] = useState<string | null>(tabData[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <h3>
        #2. React<sub>다 그려놓고 hidden/show 처리</sub>
      </h3>
      <div className={cx("container", "tabMenu2")}>
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
        {tabData.map((d) => (
          <div className={cx("description", { current: currentId === d.id })}>
            {d.description}
          </div>
        ))}
      </div>
    </>
  );
};

export default Tab2;
