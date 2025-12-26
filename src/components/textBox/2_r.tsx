import { useEffect, useRef } from "react";
import cx from "./cx";
import { measureLines } from "@/service/utils";

const TextBox2 = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const elem = textareaRef.current;
    const handleInput = () => {
      if (!elem) return;
      const val = elem.value;
      const lines = Math.min(Math.max(measureLines(elem, val), 3), 15);
      elem.rows = lines;
    };
    if (elem) elem.addEventListener("input", handleInput);
    return () => {
      if (elem) elem.removeEventListener("input", handleInput);
    };
  }, [textareaRef]);
  return (
    <>
      <h3>
        #2<sub>uncontrolled textarea</sub>
      </h3>
      <div className={cx("container")}>
        <textarea className={cx("textarea")} ref={textareaRef} rows={3} />
      </div>
    </>
  );
};

export default TextBox2;
