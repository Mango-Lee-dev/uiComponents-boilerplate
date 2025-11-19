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

const Tab1 = () => {
  const [currentId, setCurrentId] = useState<string | null>(tabData[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };

  const currentData =
    tabData.find((d) => d.id === currentId)?.description || "";
  return (
    <>
      <h3>
        #1. React<sub>현재 desc만 html로 그리기</sub>
      </h3>
      <div className={cx("container")}>
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
        <div className={cx("description")}>{currentData}</div>
      </div>
    </>
  );
};

export default Tab1;
