import { useEffect, useRef } from "react";
import cx from "../cx";
import useInfiniteFetcher, { Datum } from "./useInfiniteFetcher";

const ListItem = ({
  id,
  number,
  title,
  description,
}: Datum & { number: number }) => {
  return (
    <li>
      <p>
        <strong>
          {number}. {title}
        </strong>
      </p>
      <div>{description}</div>
    </li>
  );
};

const InfiniteScrollR = () => {
  const { fetchNextPage, state, data } = useInfiniteFetcher();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNextPage();
  }, []);
  return (
    <>
      <h2>무한 스크롤</h2>
      <h3>#1. React - scroll로 감지하는 방식</h3>
      <ul>
        {data.map((page, i) =>
          page.map((item, j) => (
            <ListItem {...item} number={i * 20 + j + 1} key={`${i}_${j}`} />
          )),
        )}
      </ul>
      <div ref={moreRef} className={cx("spinner")} />
      {state === "loading" && <div className={cx("spinner")} />}
    </>
  );
};

export default InfiniteScrollR;
