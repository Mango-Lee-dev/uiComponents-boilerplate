/**
 * Scroll Spy #1 — React (scroll event 방식)
 *
 * Intersection Observer 대신 스크롤 위치와 각 섹션의 절대 좌표를 비교해
 * "지금 보고 있는 섹션"을 찾아 상단 네비를 동기화한다.
 *
 * 흐름 요약:
 * 1) mount / resize 시 각 섹션의 문서 기준 절대 Y·높이를 itemsRef에 캐시
 * 2) 스크롤 시 ViewportContext가 viewportTop을 갱신
 * 3) scrollTop이 어느 섹션의 "활성 구간"에 있는지 find → currentIndex 갱신
 * 4) 네비 클릭 시 해당 섹션의 절대 Y로 window.scrollTo
 */
import { useCallback, useEffect, useRef, useState } from "react";
import cx from "./cx";
import data from "./data";
import ViewportContextProvider, {
  useViewportRect,
} from "@/context/viewportContext";

/** sticky 헤더(.title) 높이 — 스크롤 보정에 사용 */
const HeaderHeight = 60;

const ListItem = ({
  id,
  number,
  title,
  description,
}: {
  id: string;
  number: number;
  title: string;
  description: string;
}) => {
  return (
    // id는 getElementById로 위치를 측정할 때 사용
    <li id={id} data-number={number}>
      <p>
        <strong>
          {number}. {title}
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

/**
 * 섹션별 위치 캐시 정보
 * - top: 문서 맨 위 기준 절대 Y (getBoundingClientRect().top + scrollTop)
 * - height: 섹션 높이
 * - elem이 아직 없으면 null
 */
type ItemInfo = {
  index: number;
  top: number;
  height: number;
  elem: HTMLElement;
} | null;

const ScrollSpy = () => {
  /**
   * viewportTop: scrollingElement.getBoundingClientRect().top
   * 페이지를 내리면 문서 상단이 뷰포트 위로 올라가므로 음수가 된다.
   * → 실제 scrollTop = viewportTop * -1
   *
   * scrollHeight는 현재 로직에서 쓰이지 않지만, Context가 함께 내려준다.
   */
  const { top: viewportTop, scrollHeight } = useViewportRect();

  /** 현재 활성 섹션 인덱스 — 네비의 current 클래스에 반영 */
  const [currentIndex, setCurrentIndex] = useState(0);

  /** 섹션별 절대 좌표 캐시 (매 스크롤마다 DOM 재측정하지 않기 위함) */
  const itemsRef = useRef<ItemInfo[]>([]);

  /** 상단 가로 네비의 각 <li> — 활성 탭을 가운데로 스크롤할 때 사용 */
  const navsRef = useRef<(HTMLLIElement | null)[]>([]);

  /**
   * 현재 스크롤 위치에 해당하는 섹션을 찾아 currentIndex를 갱신한다.
   *
   * 활성 판정 구간 (섹션 중심 기준 ± height/2, sticky 헤더 보정 포함):
   *   [item.top - HeaderHeight - height/2 ,  item.top - HeaderHeight + height/2)
   *
   * 헤더가 콘텐츠를 가리므로 HeaderHeight만큼 빼서,
   * "헤더 바로 아래" 기준으로 어느 섹션이 중심에 가까운지 본다.
   */
  const setCurrentItem = useCallback(() => {
    // viewportTop은 음수 → 부호를 뒤집어 실제 스크롤량으로 변환
    const scrollTop = viewportTop * -1;

    const target = itemsRef.current.find(
      (item) =>
        item &&
        scrollTop >= item.top - HeaderHeight - item.height / 2 &&
        scrollTop < item.top - HeaderHeight + item.height / 2,
    );

    if (target) {
      setCurrentIndex(target.index);
      // 가로 스크롤 네비에서 활성 탭이 보이도록 가운데로 이동
      navsRef.current[target.index]?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "instant",
      });
    }
  }, [viewportTop]);

  /**
   * 네비 버튼 클릭 → 해당 섹션으로 부드럽게 스크롤
   * 절대 top에서 헤더 높이를 빼서, 섹션 제목이 sticky 헤더 아래에 오도록 맞춤
   */
  const handleNavClick = useCallback((index: number) => {
    const itemY = (itemsRef.current[index]?.top || 0) - HeaderHeight;
    window.scrollTo({
      top: itemY,
      behavior: "smooth",
    });
  }, []);

  /**
   * 섹션 절대 좌표 캐시 구축 + 레이아웃 변경 시 재계산
   *
   * getBoundingClientRect().top 은 "뷰포트 기준" 위치이므로,
   * 현재 scrollTop을 더해야 "문서 기준 절대 Y"가 된다.
   *
   * ResizeObserver: 이미지 로드 등으로 문서 높이가 바뀌면 좌표를 다시 잰다.
   */
  useEffect(() => {
    const calculateItems = () => {
      // map 안에서 매번 읽지 않도록 한 번만 저장
      const scrollTop = document.scrollingElement!.scrollTop;
      itemsRef.current = data.map((d, i) => {
        const $item = document.getElementById(d.id);
        if (!$item) return null;
        const { top, height } = $item.getBoundingClientRect();
        // 절대 Y = 뷰포트 기준 top + 현재 스크롤량
        return { elem: $item, top: top + scrollTop, height, index: i };
      });
    };
    calculateItems();

    const resizeObserver = new ResizeObserver(calculateItems);
    resizeObserver.observe(document.scrollingElement!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /**
   * ViewportContext가 scroll 이벤트로 viewportTop을 갱신할 때마다
   * 현재 활성 섹션을 다시 판별한다.
   */
  useEffect(() => {
    setCurrentItem();
  }, [viewportTop]);

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
              className={cx("navItem", { current: currentIndex === index })}
              key={id}
              ref={(r) => {
                navsRef.current[index] = r;
              }}
            >
              <button onClick={() => handleNavClick(index)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </header>
      <ul>
        {data.map((item) => (
          <ListItem {...item} number={item.index + 1} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

/** ViewportContext로 스크롤/리사이즈 구독을 감싼 진입점 */
const ScrollSpy1 = () => {
  return (
    <ViewportContextProvider>
      <ScrollSpy />
    </ViewportContextProvider>
  );
};
export default ScrollSpy1;
