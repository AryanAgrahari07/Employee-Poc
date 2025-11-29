import React from "react";

export default function ErrorState({ message = "Something went wrong" }: any) {
  return (
    <div className="p-4 text-red-600 text-center">
      {message}
    </div>
  );
}
