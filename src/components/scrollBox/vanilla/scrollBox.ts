import data from "../data";
import cx from "../cx";
import { lazyImageBuilder } from "@/components/lazyLoading/1_v";
import vanillaIntersectionObserverV2 from "@/hooks/vanilla/intersectionObserverV2";

type ItemElemType = HTMLLIElement | null;
type Direction = "prev" | "next";
type ButtonStates = Record<Direction, boolean>;

const DefaultButtonStates: ButtonStates = {
  prev: true,
  next: true,
};

const getVisibileEdgeItems = (
  $list: HTMLUListElement,
  $items: ItemElemType[],
) => {
  const { left: lLeft, right: lRight } = $list.getBoundingClientRect();
  const isVisible = ($item: ItemElemType) => {
    const { left, right } = $item?.getBoundingClientRect() || {
      left: 0,
      right: 0,
    };
    // 전부 화면상에 존재하는 조건: left >= lLeft && right <= lRight
    // 애매하게 걸친 경우까지 인정하는 조건: left <=lRight && right >= lLeft
    return left <= lRight && right >= lLeft; // 애매하게 보이는 경우까지 모두 포함시킴.
  };
  const leftIndex = Math.max($items.findIndex(isVisible), 0);
  const rightIndex = Math.min(
    $items.findLastIndex(isVisible),
    $items.length - 1,
  );
  return { left: $items[leftIndex], right: $items[rightIndex] };
};

const generateListItem = ({
  id,
  description,
  imageUrl,
}: {
  id: string;
  description: string;
  imageUrl: string;
}) => {
  const $li = document.createElement("li");
  const $lazyImage = lazyImageBuilder(imageUrl, 250, 400);
  const $span = document.createElement("span");
  $span.textContent = description;
  $li.append($lazyImage, $span);
  return $li;
};

const vanillaScrollBox = () => {
  const setButtonEnabled = (state: ButtonStates) => {
    $prevBtn.classList.toggle(cx("on"), state.prev);
    $nextBtn.classList.toggle(cx("on"), state.next);
  };

  const move = (direction: Direction) => {
    const { left, right } = getVisibileEdgeItems($list, $items);
    const elem = direction === "prev" ? left : right; // 보여지는 맨 끝 아이템!
    elem?.scrollIntoView({
      inline: direction === "prev" ? "end" : "start", // 가로위치 'start' | 'end' | 'nearest' | 'center'
      block: "nearest", // 세로위치 'start' | 'end' | 'nearest' | 'center'
      behavior: "smooth", // 애니메이션 유무. smooth: O / instant: X / auto: 알아서...
    });
  };

  const $list = document.createElement("ul");
  $list.classList.add(cx("list"));

  const $prev = document.createElement("li");
  $prev.classList.add(cx("observer"));
  $prev.setAttribute("data-direction", "prev");

  const $next = document.createElement("li");
  $next.classList.add(cx("observer"));
  $next.setAttribute("data-direction", "next");

  const $items = data.map((item, i) => {
    const $item = document.createElement("li");
    $item.classList.add(cx("item"));
    $item.append(
      generateListItem({
        id: item.id,
        description: item.description,
        imageUrl: item.imgUrl,
      }),
    );
    return $item;
  });

  $list.append($prev, ...$items, $next);

  const $prevBtn = document.createElement("button");
  $prevBtn.addEventListener("click", () => move("prev"));
  $prevBtn.classList.add(cx("nav-button"), cx("prev"));

  const $nextBtn = document.createElement("button");
  $nextBtn.addEventListener("click", () => move("next"));
  $nextBtn.classList.add(cx("nav-button"), cx("next"));

  const $container = document.createElement("div");
  $container.classList.add(cx("scrollBox"));
  $container.append($list, $prevBtn, $nextBtn);

  vanillaIntersectionObserverV2([$prev, $next], {}, (entries) => {
    if (!entries.length) {
      setButtonEnabled(DefaultButtonStates);
    }
    const newState = { ...DefaultButtonStates };

    entries.forEach((entry) => {
      const direction = (entry.target as HTMLElement).dataset
        .direction as Direction;
      newState[direction] = false;
    });
    setButtonEnabled(newState);
  });
  return $container;
};

export default vanillaScrollBox;
