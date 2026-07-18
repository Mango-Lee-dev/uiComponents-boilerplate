import cx from "../cx";
import data from "../data";

const ScrollSpy = () => {
  return (
    <div className={cx("ScrollSpy")}>
      <header className={cx("floatingHeader")}>
        <h3 className={cx("title")}>Scroll Spy #1</h3>
        <ul className={cx("nav")}>
          {data.map(({ index, id }) => (
            <li key={id} className={cx("navItem")}>
              <button>{index + 1}</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default ScrollSpy;
