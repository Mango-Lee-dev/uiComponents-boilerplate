import { pickRandom } from "@/service/utils";
import data from "../data";

export type FetchState<T> = {
  data: T[][];
  state: "loading" | "fetched" | "idle" | "error";
};

const generatePageData = (page: number) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return pickRandom({ data, length: 20 });
};

const useInfiniteFetcher = () => {
  const pageData = generatePageData(1);
  return {
    fetchNextPage: () => {},
    state: "fetched",
    data: [pageData],
  };
};

export default useInfiniteFetcher;
