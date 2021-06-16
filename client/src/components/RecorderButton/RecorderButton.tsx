import React from "react";
import { RecorderButtonProps } from "./RecorderButton.types";

export const RecorderButton: React.FC<RecorderButtonProps> = ({
  label,
  color = "green",
  onClick,
}) => {
  return (
    <button
      className={`px-3 py-2 my-1 self-center bg-${color}-500 text-white rounded-xl`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
