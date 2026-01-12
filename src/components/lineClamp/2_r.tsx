import { useEffect, useRef, useState } from "react";
import cx from "./cx";
import data from "./data";

const LINE_CLAMP_LINES = 3;

const LineClampedText = ({ text, lines }: { text: string; lines: number }) => {
  const cloneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isClamped, toggleClamped] = useState(false);

  useEffect(() => {
    if (textRef.current && cloneRef.current) {
      toggleClamped(
        (cloneRef.current.offsetHeight - 20) /
          parseFloat(getComputedStyle(textRef.current).lineHeight) >
          lines
      );
    }
  }, [text, lines]);
  return (
    <div className={cx("content", { clamped: isClamped })}>
      <div className={cx("text-clone")} ref={cloneRef} />
      <div
        className={cx("text")}
        ref={textRef}
        style={{
          WebkitLineClamp: 3,
        }}
      >
        {text}
      </div>
      {isClamped && (
        <button
          className={cx("buttonMore")}
          onClick={() => toggleClamped(false)}
        />
      )}
    </div>
  );
};

const LineClamp2 = () => {
  return (
    <>
      <h3>
        #1 <sub>canvas - 3줄 말줄임</sub>
      </h3>
      {data.map((item, index) => (
        <LineClampedText
          text={item}
          lines={LINE_CLAMP_LINES}
          key={`${index}-${item}`}
        />
      ))}
    </>
  );
};

export default LineClamp2;
