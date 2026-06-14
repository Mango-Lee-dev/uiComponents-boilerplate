import VanillaWrapper from "@/components/vanillaWrapper";
import cx from "../cx";
import { Datum } from "../react/useInfiniteFetcher";
import infiniteFetcher, { FetchState } from "./infiniteFetcher";
import vanillaIntersectionObserver from "@/hooks/vanilla/intersectionObserver";

const generateListItem = ({
  id,
  number,
  title,
  description,
}: Datum & { number: number }) => {
  const $li = document.createElement("li");
  $li.insertAdjacentHTML(
    "beforeend",
    `
    <p>
      <strong>
        ${number}. ${title}
      </strong>
    </p>
    <div>${description}</div>
  `,
  );
  return $li;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $more = document.createElement("div");
  $more.style.height = "1px";
  const $list = document.createElement("ul");
  const $spinner = document.createElement("div");
  $spinner.classList.add(cx("spinner"));

  let prevState: FetchState = "idle";
  let page = 0;

  const handleFetch = (state: FetchState, data?: Datum[]) => {
    if (prevState === state) return;
    prevState = state;

    if (state === "loading")
      wrapper.insertAdjacentElement("beforeend", $spinner);
    else $spinner.remove();

    if (state === "fetched" && data) {
      const list = data.map((item, i) =>
        generateListItem({
          ...item,
          number: page * 20 + i + 1,
        }),
      );

      $list.append(...list);
      page += 1;
      wrapper.insertAdjacentElement("beforeend", $list);
    }
  };

  const handleIntersect = ([entry]: IntersectionObserverEntry[] = []) => {
    const isIntersecting = entry?.isIntersecting;

    if (isIntersecting && prevState !== "loading") infiniteFetcher(handleFetch);
  };

  wrapper.append($list, $more);
  vanillaIntersectionObserver($more, { threshold: 1 }, handleIntersect);
};

const InfiniteScrollV = () => {
  return (
    <div>
      <VanillaWrapper title="무한스크롤 " initiator={initiator} />
    </div>
  );
};

export default InfiniteScrollV;
