import { useEffect, useRef } from "react";
import cx from "../cx";
import data from "../data";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const ioOptions: IntersectionObserverInit = {
  threshold: 0,
};

const LazyImage = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const { entires, observeRef } = useIntersectionObserver(imgRef, ioOptions);

  useEffect(() => {
    const isVisible = entires[0]?.isIntersecting;
    if (isVisible) {
      imgRef.current!.src = src;
    }
  }, [src, entires]);
  return (
    <img
      ref={imgRef}
      src=""
      width={width}
      height={height}
      alt=""
      className={cx("img", "lazy")}
    />
  );
};

const LazyLoad1 = () => {
  return (
    <>
      <h2>
        지연로딩<sub>#1</sub>
      </h2>
      {data.map((url, index) => (
        <LazyImage src={url} key={`${index}-${url}`} width={600} height={320} />
      ))}
    </>
  );
};

export default LazyLoad1;
