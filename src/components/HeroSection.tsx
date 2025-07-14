import React from "react";

export default function HeroSection() {
  return (
    <section className="w-full bg-base-100 shadow-md rounded-xl p-6 md:p-8 mb-8">
      <div className="container mx-auto flex flex-col items-center text-center gap-4">
        <h1
          className="text-2xl md:text-4xl lg:text-5xl font-bold truncate max-w-[90vw] tooltip"
          data-tip="Find public services in seconds."
        >
          Find public services in seconds.
        </h1>
        <p className="text-base md:text-lg text-base-content/70 max-w-2xl">
          Browse verified forms, schemes, and portals from SarkaarSathi.
        </p>
      </div>
    </section>
  );
}
