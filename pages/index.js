import { useState } from "react";

export default function Home() {
  const [coordinates, setCoordinates] = useState([]);
  const [undoStack, setUndoStack] = useState([]);

  function handlePlaceCircle(e) {
    console.log(e.clientX, e.clientY);
    if (e.clientY >= 87) {
      setCoordinates((prev) => [...prev, { x: e.clientX, y: e.clientY }]);
    }
  }
  function handleUndo() {
    if (coordinates.length > 0) {
      setUndoStack((prev) => [...prev, coordinates[coordinates.length - 1]]);

      setCoordinates((prev) => prev.slice(0, prev.length - 1));
    }
  }
  function handleRedo() {
    if (undoStack.length > 0) {
      setCoordinates((prev) => [...prev, undoStack[undoStack.length - 1]]);
      setUndoStack((prev) => prev.slice(0, undoStack.length - 1));
    }
  }
  console.log("coordinates", coordinates);
  console.log("undoStack", undoStack);
  return (
    <div
      className="min-h-screen w-screen bg-black relative"
      onClick={(e) => handlePlaceCircle(e)}
    >
      <button
        className="bg-white text-4xl rounded-2xl p-4 m-2"
        onClick={handleUndo}
      >
        UNDO
      </button>
      <button
        className="bg-white text-4xl rounded-2xl p-4 m-2"
        onClick={handleRedo}
      >
        REDO
      </button>
      {coordinates.map((coordinate, i) => (
        <div
          key={i}
          className="border-2 border-red-500 h-2 w-2 rounded-full absolute"
          style={{ top: `${coordinate.y}px`, left: `${coordinate.x}px` }}
          // className={`border-2 border-red-500 h-2 w-2 rounded-full absolute top-[${coordinate.y}px] left-[${coordinate.x}px]`}
        ></div>
      ))}
    </div>
  );
}
