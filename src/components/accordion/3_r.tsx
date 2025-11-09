import { useState } from "react";
import cx from "./cx";
import { accordionData } from "./data";

const AccordionItem = ({
  id,
  title,
  description,
  current,
  toggle,
}: (typeof accordionData)[number] & {
  current: boolean;
  toggle: () => void;
}) => {
  return (
    <li key={id} className={cx("item", "item3", { current })}>
      <div className={cx("tab")} onClick={toggle}>
        {title}
      </div>
      <p className={cx("description")}>{description}</p>
    </li>
  );
};

const Accordion3 = () => {
  const [currentId, setCurrentId] = useState<string | null>(
    accordionData[0].id
  );

  const toggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <h3>
        #3. React <sub>현재 desc만 html 사용</sub>
      </h3>
      <ul className={cx("container")}>
        {accordionData.map((d) => (
          <AccordionItem
            key={d.id}
            {...d}
            current={currentId === d.id}
            toggle={toggleItem(d.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion3;
