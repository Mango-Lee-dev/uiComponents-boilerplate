import { SyntheticEvent, useState } from "react";
import cx from "./cx";
import { measureLines } from "@/service/utils";

const TextBox1 = () => {
  const [text, setText] = useState("");
  const [lines, setLines] = useState(3);

  const handleChange = (e: SyntheticEvent) => {
    const elem = e.target as HTMLTextAreaElement;
    const val = elem.value;
    const calculatedLines = measureLines(elem, val);
    const lines = Math.min(Math.max(calculatedLines, 3), 15); //  최소 3줄 최대 15줄
    setText(val);
    setLines(lines);
  };
  return (
    <>
      <h3>
        #1<sub>controlled canvas</sub>
      </h3>
      <div className={cx("container")}>
        <textarea
          className={cx("textarea")}
          value={text}
          onChange={handleChange}
          rows={Math.min(lines, 15)}
        />
      </div>
    </>
  );
};

export default TextBox1;
