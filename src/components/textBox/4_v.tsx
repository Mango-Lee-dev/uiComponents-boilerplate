import { measureLines } from "@/service/utils";
import VanillaWrapper from "../vanillaWrapper";
import cx from "./cx";

const initiator = (wrapper: HTMLDivElement) => {
  const $text = document.createElement("textarea");
  $text.classList.add(cx("textarea"));
  $text.rows = 3;

  const handleInput = () => {
    const val = $text.value;
    const lines = Math.min(Math.max(measureLines($text, val), 3), 15);
    $text.rows = lines;
  };

  if ($text) $text.addEventListener("input", handleInput);

  const $cont = document.createElement("div");
  $cont.classList.add(cx("container"));
  $cont.appendChild($text);
  wrapper.appendChild($cont);
};

const TextBox4V = () => <VanillaWrapper initiator={initiator} title="#4" />;
export default TextBox4V;
