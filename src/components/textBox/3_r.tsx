import { useEffect, useRef } from "react";
import cx from "./cx";
import { measureLines } from "@/service/utils";

const TextBox3 = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cloneRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const elem = textareaRef.current;
    const clone = cloneRef.current;
    const handleInput = () => {
      if (!elem) return;
      const val = elem.value;
      clone!.value = val;
      elem.rows = Math.min(
        Math.max(clone!.scrollHeight / clone!.clientHeight, 3),
        15
      );
    };
    if (elem) elem.addEventListener("input", handleInput);
    return () => {
      if (elem) elem.removeEventListener("input", handleInput);
    };
  }, [textareaRef]);
  return (
    <>
      <h3>
        #3<sub>unconrolled. clone elem</sub>
      </h3>
      <div className={cx("container")}>
        <textarea className={cx("clone")} ref={cloneRef} rows={1} readOnly />
        <textarea
          className={cx("textarea")}
          ref={textareaRef}
          rows={3}
          readOnly
        />
      </div>
    </>
  );
};

export default TextBox3;
