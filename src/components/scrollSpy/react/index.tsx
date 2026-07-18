import cx from "../cx";
import data from "../data";

const ListItem = ({
  id,
  number,
  title,
  description,
}: {
  id: string;
  number: number;
  title: string;
  description: string;
}) => {
  return (
    <li id={id} data-number={number}>
      <p>
        <strong>
          {number}. {title}
        </strong>
      </p>
      <div>
        {description.split("\r\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </li>
  );
};

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
      <ul>
        {data.map((item) => (
          <ListItem {...item} number={item.index + 1} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default ScrollSpy;
