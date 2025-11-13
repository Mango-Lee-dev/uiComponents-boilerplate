import cx from "./cx";
import { accordionData } from "./data";

const AccordionItem = ({
  id,
  title,
  description,
  initialChecked,
}: (typeof accordionData)[number] & {
  initialChecked: boolean;
}) => {
  return (
    <li key={id} className={cx("item", "item5")}>
      <input
        type="radio"
        name="accordion"
        id={id}
        className={cx("input")}
        defaultChecked={initialChecked}
      />
      <label htmlFor={id} className={cx("tab")}>
        {title}
      </label>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

const Accordion5 = () => {
  return (
    <>
      <h3>
        #5. React <sub>html input + radio 사용</sub>
      </h3>
      <ul className={cx("container")}>
        {accordionData.map((d) => (
          <AccordionItem key={d.id} {...d} initialChecked={d.id === "1"} />
        ))}
      </ul>
    </>
  );
};

export default Accordion5;
