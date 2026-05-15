import LazyLoad1 from "./1_r";
import cx from "./cx";

const LazyLoading = () => {
  return (
    <div className={cx("LazyLoading")}>
      <h2>지연 로딩</h2>
      <LazyLoad1 />
    </div>
  );
};

export default LazyLoading;
