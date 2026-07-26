import { useEffect, useRef, useState } from "react";
import cx from "./cx";
import data from "./data";
import useIntersectionObserver from "@/hooks/useIntersectionObserverV2";

type ListItemProps = {
  id: string;
  index: number;
  title: string;
  description: string;
};

const ListItem = ({ id, index, title, description }: ListItemProps) => {
  return (
    <li id={id} data-number={index + 1} data-index={index}>
      <p>
        <strong>
          {index + 1}. {title}
        </strong>
      </p>
      <div>
        {description.split("\r\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </li>
  );
};

const HeaderHeight = 60;

const IOOptions: IntersectionObserverInit = {
  rootMargin: `${HeaderHeight}px 0px 0px 0px`,
  threshold: 0.5,
};

type Elem = HTMLElement | null;

const ScrollSpy2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navRef = useRef<(HTMLLIElement | null)[]>([]);
  const itemsRef = useRef<Elem[]>([]);
  const entries = useIntersectionObserver(itemsRef, IOOptions);

  useEffect(() => {
    itemsRef.current = data.map((d, i) => document.getElementById(d.id));
  }, []);

  return (
    <div className={cx("ScrollSpy")}>
      {/* sticky 헤더: 스크롤해도 상단에 고정 */}
      <header className={cx("floatingHeader")}>
        <h3 className={cx("title")}>
          스크롤 스파이 #1. React<sub>scroll event</sub>
        </h3>
        {/* overflow-x: auto 인 가로 네비 — 활성 탭은 current 클래스 + scrollIntoView */}
        <ul className={cx("nav")}>
          {data.map(({ index, id }) => (
            <li
              className={cx("navItem")}
              key={id}
              ref={(r) => {
                navRef.current[index] = r;
              }}
            >
              <button>{index + 1}</button>
            </li>
          ))}
        </ul>
      </header>
      <ul>
        {data.map((item) => (
          <ListItem {...item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default ScrollSpy2;
