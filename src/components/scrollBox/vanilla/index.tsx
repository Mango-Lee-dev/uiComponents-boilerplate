import VanillaWrapper from "@/components/vanillaWrapper";
import vanillaScrollBox from "./scrollBox";

const initiator = (warpper: HTMLElement) => {
  const $scrollBox = vanillaScrollBox();
  warpper.append($scrollBox);
};

const ScrollBox_Vanilla = () => (
  <VanillaWrapper initiator={initiator} title="Scroll Box Vanilla" />
);

export default ScrollBox_Vanilla;
