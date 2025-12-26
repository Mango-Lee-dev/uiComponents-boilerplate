export const measureLines = (elem: HTMLTextAreaElement, val: string) => {
  if (!elem || !val) return 0;
  const canvas = document.createElement("canvas");
  const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d")!;
  const style = window.getComputedStyle(elem);
  canvasContext.font = `${style.getPropertyValue(
    "font-size"
  )} ${style.getPropertyValue("font-family")}`;

  const measuredLines = val.split("\n").reduce((r, c) => {
    return (
      r +
      Math.max(
        Math.ceil(canvasContext.measureText(c).width / elem!.offsetWidth), // 1줄로 쭉 나열했을때의 길이(px) 측정
        1
      )
    );
  }, 0);
  return measuredLines;
};
