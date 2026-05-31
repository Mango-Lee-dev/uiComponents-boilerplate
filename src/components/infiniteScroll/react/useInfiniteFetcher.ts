import { pickRandom, randomize, waitFor } from "@/service/utils";
import data from "../data";
import { useCallback, useState } from "react";

export type FetchState<T> = {
  data: T[][];
  state: "loading" | "fetched" | "idle" | "error";
};

export type Datum = {
  index: number;
  id: string;
  title: string;
  description: string;
};

const generatePageData = async () => {
  const randomData = pickRandom({ data, length: 20 });
  await waitFor(randomize({ min: 300, max: 1500, step: 50 }));
  return randomData;
};

const useInfiniteFetcher = () => {
  const [state, setState] = useState<FetchState<Datum[]>>({
    data: [],
    state: "idle",
  });

  const fetchNextPage = useCallback(async () => {
    setState((prev) => ({ ...prev, state: "loading" }));

    const nextPageData = await generatePageData();

    setState((prev) => {
      const nextData = [...(prev.data || []), nextPageData];

      return {
        data: nextData,
        state: "fetched",
      };
    });
  }, []);

  return {
    ...state,
    fetchNextPage,
  };
};

export default useInfiniteFetcher;
