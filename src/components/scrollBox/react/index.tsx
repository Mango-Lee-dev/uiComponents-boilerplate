import { useCallback, useEffect, useRef, useState } from "react";
import cx from "../cx";
import data from "../data";
import { LazyImage } from "@/components/lazyLoading/1_r";
import useIntersectionObserver from "@/hooks/useIntersectionObserverV2";

type Direction = "prev" | "next";

const DefaultButtonState: { prev: boolean; next: boolean } = {
  prev: true,
  next: true,
};

const Item = ({
  id,
  description,
  imgUrl,
}: {
  id: string;
  description: string;
  imgUrl: string;
}) => (
  <div>
    <LazyImage src={imgUrl} width={250} height={400} />
    <div>{description}</div>
  </div>
);

const ScrollBox = () => {
  const [buttonEnabled, setButtonEnabled] = useState<{
    prev: boolean;
    next: boolean;
  }>(DefaultButtonState);
  const watcherRef = useRef<(HTMLLIElement | null)[]>([]);
  const { entries: watcherEntries } = useIntersectionObserver(watcherRef);

  const move = useCallback((direction: "prev" | "next") => {
    const elem: HTMLElement = document.createElement("div");
    elem.scrollIntoView({
      inline: "start",
      block: "nearest",
      behavior: "smooth",
    });
    elem.remove();
  }, []);

  useEffect(() => {
    setButtonEnabled(() => {
      // watcher가 화면에 보이면 해당 방향의 끝에 도달한 것이므로 버튼을 끈다.
      const newState = { ...DefaultButtonState };
      watcherEntries.forEach((e) => {
        const direction = (e.target as HTMLLIElement).dataset
          .direction as Direction;
        newState[direction] = false;
      });
      return newState;
    });
  }, [watcherEntries]);

  return (
    <>
      <h3>ScrollBox - React</h3>
      <div className={cx("scrollBox")}>
        <ul className={cx("list")}>
          <li
            className={cx("observer")}
            ref={(r) => {
              watcherRef.current[0] = r;
            }}
            data-direction="prev"
          />
          {data.map((item) => (
            <li key={item.id} className={cx("item")}>
              <Item {...item} />
            </li>
          ))}
          <li
            className={cx("observer")}
            ref={(r) => {
              watcherRef.current[1] = r;
            }}
            data-direction="next"
          />
        </ul>
        <button
          className={cx("nav-button", "prev", { on: buttonEnabled.prev })}
          onClick={() => move("prev")}
        />
        <button
          className={cx("nav-button", "next", { on: buttonEnabled.next })}
          onClick={() => move("next")}
        />
      </div>
    </>
  );
};

export default ScrollBox;
