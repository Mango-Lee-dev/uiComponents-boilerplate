import { useEffect, useRef, useState } from "react";
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
  const [loadded, setLoadded] = useState(false);
  const { entires, observeRef } = useIntersectionObserver(imgRef, ioOptions);

  useEffect(() => {
    if ("loading" in HTMLImageElement.prototype) {
      observeRef.current?.disconnect();
      return;
    }

    const isVisible = entires[0]?.isIntersecting;
    if (isVisible) {
      const onLoad = () => {
        setLoadded(true);
      };
      imgRef.current!.addEventListener("load", onLoad);
      imgRef.current!.setAttribute("src", src);
      observeRef.current?.disconnect();
    }
  }, [src, entires]);

  return (
    <img
      ref={imgRef}
      src={src}
      width={width}
      height={height}
      alt=""
      className={cx("img", loadded ? "" : "lazy")}
      loading="lazy"
    />
  );
};

const builtInLazySupported = "loading" in HTMLImageElement.prototype;

const LazyLoad1 = () => {
  const Component = builtInLazySupported
    ? (props: any) => <img {...props} />
    : LazyImage;
  return (
    <>
      <h3>
        React<sub>#1</sub>
      </h3>
      {data.map((url, index) => (
        <Component src={url} key={`${index}-${url}`} width={600} height={320} />
      ))}
    </>
  );
};

export default LazyLoad1;
