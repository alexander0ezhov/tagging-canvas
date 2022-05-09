import TaggingCanvas from "./classes/TaggingCanvas";

const node = <HTMLCanvasElement>document.getElementById("canvas");
node.style.border = "1px solid gray";

const taggingCanvas = new TaggingCanvas({
  node,
});

document.getElementById("blue-btn")?.addEventListener("click", () => {
  taggingCanvas.setActiveTag({ label: "blue", color: "#0000ff" });
});

document.getElementById("red-btn")?.addEventListener("click", () => {
  taggingCanvas.setActiveTag({ label: "red", color: "#FF0000" });
});
