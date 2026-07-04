import { useCallback, useRef } from "react";
import cx from "../cx";
import data from "../data";
import { LazyImage } from "@/components/lazyLoading/1_r";

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
  const watcherRef = useRef<(HTMLLIElement | null)[]>([]);

  const move = useCallback((direction: "prev" | "next") => {
    const elem: HTMLElement = document.createElement("div");
    elem.scrollIntoView({
      inline: "start",
      block: "nearest",
      behavior: "smooth",
    });
    elem.remove();
  }, []);
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
          />
        </ul>
        <button className={cx("nav-button", "prev", { on: true })} />
        <button className={cx("nav-button", "next", { on: true })} />
      </div>
    </>
  );
};

export default ScrollBox;
