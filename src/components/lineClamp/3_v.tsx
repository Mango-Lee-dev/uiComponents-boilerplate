import VanillaWrapper from "../vanillaWrapper";
import cx from "./cx";
import data from "./data";

const clampedElemBuilder = (text: string, wrapper: HTMLDivElement) => {
  let isClamped = true;

  const toggleClamped = (e: Event | null, force?: boolean) => {
    isClamped = typeof force === "boolean" ? force : !isClamped;
    content.classList.toggle(cx("clamped"), isClamped);
    if (isClamped) {
      content.append(buttonMore);
    } else {
      content?.removeChild(buttonMore);
    }
  };

  const cloneElem = document.createElement("div");
  cloneElem.classList.add(cx("text-clone"));
  cloneElem.textContent = text;

  const textElem = document.createElement("div");
  textElem.classList.add(cx("text"));
  textElem.textContent = text;
  textElem.style.webkitLineClamp = "3";

  const buttonMore = document.createElement("button");
  buttonMore.classList.add(cx("buttonMore"));
  buttonMore.addEventListener("click", toggleClamped, {
    once: true,
  });

  const content = document.createElement("div");
  content.classList.add(cx("content"));
  content.append(cloneElem, textElem);

  const handleMutate = () => {
    const lineHeight = parseInt(getComputedStyle(textElem).lineHeight);
    const lines = cloneElem.offsetHeight / lineHeight;
    toggleClamped(null, lines > 3);
  };

  const observer = new MutationObserver(() => {
    if (document.contains(content)) {
      handleMutate();
      observer.disconnect();
    }
  });

  observer.observe(wrapper, {
    childList: true,
    subtree: true,
  });

  return content;
};

const initiator = (wrapper: HTMLDivElement) => {
  const elems = data.map((text) => clampedElemBuilder(text, wrapper));
  wrapper.append(...elems);
};
const LineClamp3_V = () => <VanillaWrapper initiator={initiator} title="#3" />;

export default LineClamp3_V;
