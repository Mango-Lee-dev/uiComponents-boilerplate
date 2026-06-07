export type Datum = {
  index: number;
  id: string;
  title: string;
  description: string;
};

export type FetchState<T> = {
  data: T[][];
  state: "loading" | "fetched" | "idle" | "error";
};
