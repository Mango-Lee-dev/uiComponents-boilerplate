import VanillaWrapper from "@/components/vanillaWrapper";

const initiator = (warpper: HTMLElement) => {
  warpper.append();
};

const ScrollBox_Vanilla = () => (
  <VanillaWrapper initiator={initiator} title="Scroll Box Vanilla" />
);

export default ScrollBox_Vanilla;
