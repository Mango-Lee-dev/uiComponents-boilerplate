import cx from "../cx";
import useInfiniteFetcher from "./useInfiniteFetcher";

const ListItem = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  return (
    <li key={id}>
      <p>{title}</p>
      <p>{description}</p>
    </li>
  );
};

const InfiniteScrollR = () => {
  const { fetchNextPage, state, data } = useInfiniteFetcher();
  console.log(data);
  return (
    <>
      <h2>무한 스크롤</h2>
      <h3>#1. React - scroll로 감지하는 방식</h3>
      <ul>
        {data.flat().map(({ id, title, description }, i) => (
          <ListItem key={i} id={id} title={title} description={description} />
        ))}
      </ul>
      <div className={cx("spinner")} />
    </>
  );
};

export default InfiniteScrollR;
