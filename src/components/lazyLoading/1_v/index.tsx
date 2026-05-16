import VanillaWrapper from "@/components/vanillaWrapper";
import data from "../data";
import cx from "../cx";
import lazyLoad from "./lazyLoad";

const lazyImageBuilder = (src: string, width: number, height: number) => {
  const $elem = document.createElement("img");
  $elem.classList.add(cx("lazy"));
  $elem.setAttribute("width", `${width}px`);
  $elem.setAttribute("height", `${height}px`);

  const onLoad = () => {
    $elem.classList.remove(cx("lazy"));
  };

  $elem.addEventListener("load", onLoad, { once: true });
  lazyLoad($elem, src);
  return $elem;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $img = data.map((src) => lazyImageBuilder(src, 600, 320));
  wrapper.append(...$img);
};

const LazyLoading_V = () => (
  <>
    <h2>
      지연로딩
      <sub>VanillaJS</sub>
    </h2>
    <VanillaWrapper initiator={initiator} />
  </>
);

export default LazyLoading_V;
