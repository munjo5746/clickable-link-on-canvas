import * as React from "react";
import { fabric } from "fabric";
import "./styles.css";

export default function App() {
  const canvasWidth = 500;
  const canvasHeight = 500;
  React.useEffect(() => {
    const canvas = new fabric.Canvas("canvas");
    canvas.setDimensions({
      width: canvasWidth,
      height: canvasHeight
    });

    fabric.Image.fromURL(
      "https://www.americommerce.com/Shared/Themes/SparkPay2015-5-15/images/10-sales-promos-banner.png",
      (img) => {
        img.scaleToWidth(canvasWidth);

        canvas.add(img);
      }
    );
  }, []);
  return <canvas id="canvas" style={{ border: "1px solid gray" }}></canvas>;
}
