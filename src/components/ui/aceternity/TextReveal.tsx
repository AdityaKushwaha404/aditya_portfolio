import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";

type TextRevealProps = {
  text?: string;
  lines?: string[];
  className?: string;
};

export const TextReveal = ({ text, lines, className }: TextRevealProps) => {
  const displayLines = lines || (text ? [text] : []);

  return (
    <span className={cn("block", className)}>
      {displayLines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden py-1">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: idx * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        </span>
      ))}
    </span>
  );
};
