import VanillaWrapper from "@/components/vanillaWrapper";
import cx from "../cx";
import { Datum } from "../react/useInfiniteFetcher";

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
  const $list = document.createElement("ul");
  const $spinner = document.createElement("div");
  $spinner.classList.add(cx("spinner"));
};

const InfiniteScrollV = () => {
  return (
    <div>
      <VanillaWrapper title="무한스크롤 " initiator={initiator} />
    </div>
  );
};

export default InfiniteScrollV;
