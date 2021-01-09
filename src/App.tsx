import * as React from "react";
import { fabric } from "fabric";
import "./styles.css";

export default function App() {
  const canvasWidth = 500;
  const canvasHeight = 500;

  const [allow, setAllow] = React.useState<boolean>(true);
  const [canvas, setCanvas] = React.useState<fabric.Canvas>();
  const [area, setArea] = React.useState<fabric.Rect>();
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

        setCanvas(canvas);
      }
    );
  }, []);

  const rePositionButton = React.useCallback(
    (input: HTMLInputElement, obj: fabric.Object) => {
      const { top, left, width: oWidth, height: oHeight, scaleX, scaleY } = obj;

      const width = oWidth! * scaleX!;
      const height = oHeight! * scaleY!;
      const margin = 30;

      input.style.top = `${top! + margin * scaleY!}px`;
      input.style.left = `${left! + margin * scaleX!}px`;
      input.style.width = `${width! - margin * 2 * scaleX!}px`;
      input.style.height = `${height! - margin * 2 * scaleY!}px`;
    },
    []
  );

  return (
    <div style={{ position: "relative" }}>
      <canvas id="canvas" style={{ border: "1px solid gray" }}></canvas>
      <input
        id="url-input"
        type="text"
        style={{ display: "none", position: "absolute" }}
      />
      <a
        id="invisible-link"
        href="#"
        style={{ display: "block", position: "absolute" }}
      ></a>
      <button
        onClick={(e) => {
          e.preventDefault();

          if (!canvas) return;
          if (!allow) {
            alert("Only one link can be added.");
            return;
          }

          const area = new fabric.Rect({
            top: 10,
            left: 10,
            width: 200,
            height: 100,
            fill: "white",
            stroke: "gray",
            strokeWidth: 1,
            opacity: 0.7
          });

          canvas.add(area);
          setArea(area);

          const input = document.getElementById(
            "url-input"
          )! as HTMLInputElement;

          input.style.display = "block";
          rePositionButton(input, area);

          area.on("moving", () => {
            rePositionButton(input, area);
          });
          area.on("scaling", () => {
            console.log("scale");
            rePositionButton(input, area);
          });

          setAllow(false);
        }}
      >
        Add Link Area
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();

          if (!area) return;

          const input = document.getElementById(
            "url-input"
          ) as HTMLInputElement;
          input!.style.display = "none";

          const link = document.getElementById(
            "invisible-link"
          ) as HTMLLinkElement;
          link.href = input.value;
          link.style.top = `${area.top!}px`;
          link.style.left = `${area.left}px`;
          link.style.width = `${area.width! * area.scaleX!}px`;
          link.style.height = `${area.height! * area.scaleY!}px`;

          canvas?.remove(area);
        }}
      >
        Complete
      </button>
    </div>
  );
}
