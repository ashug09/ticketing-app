import { Loader } from "@mantine/core";
import React from "react";

export default function Loading() {
  return (
    <div className="relative">
      <div className="absolute z-50  bg-white h-screen w-screen">
        <Loader
          className="mx-auto absolute top-[50%]  h-screen w-screen"
          color="blue"
          type="dots"
        />
      </div>
    </div>
  );
}
