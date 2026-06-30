"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.9, 0.8] : [1, 1.05]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div
      className="h-auto lg:h-[52rem] flex items-center justify-center relative p-2 md:p-10"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-20 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

import { CardContainer, CardBody } from "./ThreeDCard";

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <CardContainer containerClassName="max-w-6xl mt-21 mx-auto h-auto lg:h-[40rem] w-full" className="w-full h-full">
      <CardBody>
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            boxShadow:
              "0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05), 0 12px 24px rgba(0, 0, 0, 0.05)",
            transformStyle: "preserve-3d",
          }}
          className="h-full w-full border border-[#0B1020]/10 p-2 bg-[#F3F2EF] rounded-[24px] shadow-2xl"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-white border border-[#0B1020]/8" style={{ transformStyle: "preserve-3d" }}>
            {children}
          </div>
        </motion.div>
      </CardBody>
    </CardContainer>
  );
};
