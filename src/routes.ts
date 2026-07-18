import Accordion from "@/components/accordion";
import TabMenus from "./components/tabMenu";
import Tooltips from "./components/tooltip";
import TextBox from "./components/textBox";
import LineClamp from "./components/lineClamp";
import LazyLoading from "./components/lazyLoading";
import LazyLoad1R from "./components/lazyLoading/1_r";
import LazyLoadingVanilla from "./components/lazyLoading/1_v";
import InfiniteScrollR from "./components/infiniteScroll/react";
import InfiniteScrollV from "./components/infiniteScroll/vanilla";
import ScrollBox from "./components/scrollBox";
import ScrollSpy from "./components/scrollSpy/react";

export const routePaths = [
  "/",
  "/accordion",
  "/tabMenu",
  "/tooltip",
  "/textBox",
  "/lineClamp",
  "/lazyLoading",
  "/lazyLoading/1_r",
  "/lazyLoading/1_v",
  "/infiniteScroll/react",
  "/infiniteScroll/vanilla",
  "/scrollBox",
  "/scrollSpy",
  "/snackbar",
  "/modal",
  "/popover",
  "/imageSlide",
  "/carousel",
  "/gallery",
  "/selectBox",
  "/autoComplete",
  "/dnd",
] as const;
export type ROUTE_PATH = (typeof routePaths)[number];

type BaseRoute = {
  key: ROUTE_PATH;
  link: ROUTE_PATH;
  name: string;
};
export type ParentRoute = BaseRoute & {
  children: ROUTE_PATH[];
};
export type ChildRoute = BaseRoute & {
  children: ((props: unknown) => JSX.Element) | null;
};
export type ROUTE = ParentRoute | ChildRoute;

export const routes: Record<ROUTE_PATH, ROUTE> = {
  "/": {
    key: "/",
    link: "/",
    name: "root",
    children: [
      "/accordion",
      "/tabMenu",
      "/tooltip",
      "/textBox",
      "/lineClamp",
      "/lazyLoading",
      "/lazyLoading/1_r",
      "/lazyLoading/1_v",
      "/infiniteScroll/react",
      "/infiniteScroll/vanilla",
      "/scrollBox",
      "/scrollSpy",
      "/snackbar",
      "/modal",
      "/popover",
      "/imageSlide",
      "/carousel",
      "/gallery",
      "/selectBox",
      "/autoComplete",
      "/dnd",
    ],
  },
  "/accordion": {
    key: "/accordion",
    link: "/accordion",
    name: "01. 아코디언",
    children: Accordion,
  },
  "/tabMenu": {
    key: "/tabMenu",
    link: "/tabMenu",
    name: "02. 탭메뉴",
    children: TabMenus,
  },
  "/tooltip": {
    key: "/tooltip",
    link: "/tooltip",
    name: "03. 툴팁",
    children: Tooltips,
  },
  "/textBox": {
    key: "/textBox",
    link: "/textBox",
    name: "04. 반응형 텍스트박스",
    children: TextBox,
  },
  "/lineClamp": {
    key: "/lineClamp",
    link: "/lineClamp",
    name: "05. 여러줄 말줄임",
    children: LineClamp,
  },
  "/lazyLoading": {
    key: "/lazyLoading",
    link: "/lazyLoading",
    name: "06. 지연 로딩",
    children: LazyLoading,
  },
  "/lazyLoading/1_r": {
    key: "/lazyLoading/1_r",
    link: "/lazyLoading/1_r",
    name: "06-1. 지연 로딩 (React)",
    children: LazyLoad1R,
  },
  "/lazyLoading/1_v": {
    key: "/lazyLoading/1_v",
    link: "/lazyLoading/1_v",
    name: "06-2. 지연 로딩 (Vanilla)",
    children: LazyLoadingVanilla,
  },
  "/infiniteScroll/react": {
    key: "/infiniteScroll/react",
    link: "/infiniteScroll/react",
    name: "07. 무한 스크롤",
    children: InfiniteScrollR,
  },
  "/infiniteScroll/vanilla": {
    key: "/infiniteScroll/vanilla",
    link: "/infiniteScroll/vanilla",
    name: "07-1. 무한 스크롤 (Vanilla)",
    children: InfiniteScrollV,
  },
  "/scrollBox": {
    key: "/scrollBox",
    link: "/scrollBox",
    name: "08. 횡 스크롤 박스",
    children: ScrollBox,
  },
  "/scrollSpy": {
    key: "/scrollSpy",
    link: "/scrollSpy",
    name: "09. 스크롤 스파이",
    children: ScrollSpy,
  },
  "/snackbar": {
    key: "/snackbar",
    link: "/snackbar",
    name: "10. 스낵바",
    children: null,
  },
  "/modal": {
    key: "/modal",
    link: "/modal",
    name: "11. 모달",
    children: null,
  },
  "/popover": {
    key: "/popover",
    link: "/popover",
    name: "12. 팝오버",
    children: null,
  },
  "/imageSlide": {
    key: "/imageSlide",
    link: "/imageSlide",
    name: "13. 이미지 슬라이드",
    children: null,
  },
  "/carousel": {
    key: "/carousel",
    link: "/carousel",
    name: "14. 캐러셀",
    children: null,
  },
  "/gallery": {
    key: "/gallery",
    link: "/gallery",
    name: "15. 갤러리",
    children: null,
  },
  "/selectBox": {
    key: "/selectBox",
    link: "/selectBox",
    name: "16. 셀렉트 박스",
    children: null,
  },
  "/autoComplete": {
    key: "/autoComplete",
    link: "/autoComplete",
    name: "17. 자동 완성",
    children: null,
  },
  "/dnd": {
    key: "/dnd",
    link: "/dnd",
    name: "18. D&D 리스트",
    children: null,
  },
};

export const isParentRoute = (route: ROUTE): route is ParentRoute =>
  Array.isArray(route.children);

export const gnbRootList = (routes["/"] as ParentRoute).children.map(
  (r) => routes[r],
);
