import { useEffect, useRef, useState } from "react";
import cx from "./cx";
import data from "./data";
import { measureLines } from "@/service/utils";

const LineClampedText = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isClamped, toggleClamped] = useState(false);

  useEffect(() => {
    if (text && textRef.current) {
      const measuredLines = measureLines(textRef.current, text);
      toggleClamped(measuredLines > 3);
    }
  }, [text]);

  return (
    <div className={cx("content", { clamped: isClamped })}>
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

const LineClamp1 = () => {
  return (
    <>
      <h3>
        #1 <sub>canvas - 3줄 말줄임</sub>
      </h3>
      {data.map((item, index) => (
        <LineClampedText text={item} key={`${index}-${item}`} />
      ))}
    </>
  );
};

export default LineClamp1;
