"use client";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <footer ref={ref} className="h-[50vh] flex justify-center ">
      {isInView && (
        <div className="size-full max-w-2xl h-full flex flex-col items-center justify-center text-center overflow-hidden">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <p className="text-7xl font-bold">
              Developed by <br />
              <span className="text-[#5046e6]">EchoEd AI</span>
            </p>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <h2 className="mt-2 text-lg text-muted-foreground">
              Your campus. Your language. Your way.
            </h2>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div className="mt-6 space-y-2 flex gap-5">
              <p>
                <a target="_blank" href="mailto:nirajsalunke07@gmail.com">
                  <img
                    alt="mail"
                    src="https://skillicons.dev/icons?i=gmail&perline=1"
                  />
                </a>
              </p>
              <p>
                <a target="_blank" href="https://www.npmjs.com/~ctrlaltniraj">
                  <img
                    alt="npm"
                    src="https://skillicons.dev/icons?i=npm&perline=1"
                  />
                </a>
              </p>
            </div>
          </BoxReveal>
        </div>
      )}
    </footer>
  );
}
