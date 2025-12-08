import data from "./data";
import cx from "./cx";
import { useEffect } from "react";

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  return (
    <details key={id} className={cx("details")} data-tooltip={id}>
      <summary className={cx("summary")} data-tooltip-summary>
        {title}
      </summary>
      <div className={cx("tooltip")} onClick={(e) => e.stopPropagation()}>
        {description}
      </div>
    </details>
  );
};

const Tooltip3 = () => {
  useEffect(() => {
    const closeAllTooltips = (e: Event) => {
      const target = e.target as HTMLElement;
      document.querySelectorAll(`[data-tooltip]`).forEach((el) => {
        if (el !== target.parentElement) el.removeAttribute("open");
      });
    };
    document.addEventListener("click", closeAllTooltips);
    return () => {
      document.removeEventListener("click", closeAllTooltips);
    };
  }, []);
  return (
    <>
      <h3>
        #3. React <sub>details 태그 사용</sub>
      </h3>
      {data.map((d) => (
        <Tooltip {...d} key={d.id} />
      ))}
    </>
  );
};

export default Tooltip3;
