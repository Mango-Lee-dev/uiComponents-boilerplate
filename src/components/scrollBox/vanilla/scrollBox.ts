import data from "../data";
import cx from "../cx";
import { lazyImageBuilder } from "@/components/lazyLoading/1_v";

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
  $prevBtn.classList.add(cx("nav-button", "prev"));

  const $nextBtn = document.createElement("button");
  $nextBtn.classList.add(cx("nav-button", "next"));

  const $container = document.createElement("div");
  $container.classList.add(cx("scrollBox"));
  $container.append($list, $prevBtn, $nextBtn);
  return $container;
};
