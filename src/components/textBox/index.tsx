import TextBox1 from "./1_r";
import TextBox2 from "./2_r";
import TextBox3 from "./3_r";
import cx from "./cx";

export default function TextBox() {
  return (
    <div className={cx("TextBoxes")}>
      <h2>Reactive Textarea</h2>
      <TextBox1 />
      <TextBox2 />
      <TextBox3 />
    </div>
  );
}
