import VanillaWrapper from "@/components/vanillaWrapper";

const initiator = (wrapper: HTMLDivElement) => {};

const InfiniteScrollV = () => {
  return (
    <div>
      <VanillaWrapper title="무한스크롤 " initiator={initiator} />
    </div>
  );
};

export default InfiniteScrollV;
