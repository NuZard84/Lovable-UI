"use client";

import ShinyText from "@/UI/ShinyText";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface LinkItem {
  label: string;
  path: string;
}

interface TabPosition {
  left: number;
  width: number;
  opacity: number;
}

interface NavTabProps {
  link: LinkItem;
  setPosition: React.Dispatch<React.SetStateAction<TabPosition>>;
  isActive: boolean;
  hasWhiteBackground: boolean;
  onHover: () => void;
}

interface TabCursorProps {
  position: TabPosition;
}

export default function Navbar() {
  const links = [
    { label: "Docs", path: "/docs" },

    { label: "playground", path: "/playground" },
    // { label: "Examples", path: "/examples" },
  ];

  const [position, setPosition] = useState<TabPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only try to highlight an active tab if we're not on the root route
    if (pathname !== "/") {
      const activeTab = navRef.current?.querySelector(`[data-active="true"]`);
      if (activeTab) {
        const { offsetLeft, offsetWidth } = activeTab as HTMLElement;
        setPosition({
          left: offsetLeft,
          width: offsetWidth,
          opacity: 1,
        });
      } else {
        // Reset position if no active tab
        setPosition({
          left: 0,
          width: 0,
          opacity: 0,
        });
      }
    } else {
      // Reset position on home page
      setPosition({
        left: 0,
        width: 0,
        opacity: 0,
      });
    }
  }, [pathname]);

  return (
    <nav className="bg-black/30 backdrop-blur-sm text-white px-6 py-3 fixed top-5 z-[99] w-[65%] left-1/2 -translate-x-1/2 rounded-full">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              className="w-6 h-6 bg-[var(--bg-blue)] rounded flex items-center justify-center text-black text-[16px] font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LU
            </motion.div>
          </Link>

          {/* Nav links */}
          <div
            ref={navRef}
            className="flex gap-2 relative"
            onMouseLeave={() => {
              setHoveredIndex(null);

              if (pathname !== "/") {
                const activeTab =
                  navRef.current?.querySelector(`[data-active="true"]`);
                if (activeTab) {
                  const { offsetLeft, offsetWidth } = activeTab as HTMLElement;
                  setPosition({
                    left: offsetLeft,
                    width: offsetWidth,
                    opacity: 1,
                  });
                }
              } else {
                setPosition({
                  left: 0,
                  width: 0,
                  opacity: 0,
                });
              }
            }}
          >
            {links.map((link, index) => {
              const isActive = pathname.startsWith(link.path);
              const hasWhiteBackground =
                hoveredIndex !== null ? hoveredIndex === index : isActive;

              return (
                <NavTab
                  key={index}
                  link={link}
                  setPosition={setPosition}
                  isActive={isActive}
                  hasWhiteBackground={hasWhiteBackground}
                  onHover={() => setHoveredIndex(index)}
                />
              );
            })}

            <TabCursor position={position} />
          </div>
        </div>

        {/* Right side */}
        {false && (
          <div className="flex items-center space-x-4">
            <ShinyText
              text="Get Prem +"
              speed={3}
              isHoverEnable={true}
              hoverClass="hover:text-blue-300"
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
    </nav>
  );
}

const NavTab = ({
  link,
  setPosition,
  isActive,
  hasWhiteBackground,
  onHover,
}: NavTabProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative"
      data-active={isActive}
      onMouseEnter={() => {
        if (!ref?.current) return;
        onHover();

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
    >
      <Link
        href={link.path}
        className="relative z-10 block px-3 py-1.5 transition-colors duration-300"
      >
        <span
          className={`transition-colors duration-150 ${
            hasWhiteBackground ? "text-black" : "text-white"
          }`}
        >
          {link.label}
        </span>
      </Link>
    </div>
  );
};

const TabCursor = ({ position }: TabCursorProps) => {
  return (
    <motion.div
      animate={{
        ...position,
      }}
      className="absolute z-0 h-full rounded-full bg-white bottom-0"
      transition={{ duration: 0.15, ease: "easeOut" }}
    />
  );
};

// "use client";

// import ShinyText from "@/UI/ShinyText";
// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function Navbar() {
//   const links = [
//     { label: "Docs", path: "/docs" },
//     { label: "Examples", path: "/examples" },
//     { label: "playground", path: "/playground" },
//   ];

//   return (
//     <nav className="bg-black/30  backdrop-blur-sm text-white px-6 py-3 fixed top-5 z-[99]   w-[65%] left-1/2 -translate-x-1/2 rounded-full">
//       <div className="max-w-screen-xl mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-6">
//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <motion.div
//               className="w-6 h-6 bg-[var(--bg-blue)] rounded flex items-center justify-center text-black text-[16px] font-bold"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               LU
//             </motion.div>
//           </Link>

//           {/* Nav links */}
//           <div className="flex gap-6">
//             {links.map((link, index) => (
//               <div key={index}>
//                 <motion.div
//                   className="relative group"
//                   whileHover="hover"
//                   initial="rest"
//                   animate="rest"
//                 >
//                   <Link
//                     href={link.path}
//                     className="text-[var(--font-gray)] group-hover:text-[var(--font-white)] transition-colors duration-300"
//                   >
//                     <motion.span
//                       variants={{
//                         rest: {
//                           textShadow: "0px 0px 0px rgba(255,255,255,0)",
//                         },
//                         hover: {
//                           textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
//                         },
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {link.label}
//                     </motion.span>

//                     {/* Underline animation */}
//                     <motion.div
//                       className="absolute left-0 -bottom-1 h-[2px] bg-[var(--font-white)] rounded"
//                       variants={{
//                         rest: { width: 0 },
//                         hover: { width: "100%" },
//                       }}
//                       transition={{
//                         duration: 0.3,
//                         ease: "easeInOut",
//                       }}
//                     />
//                   </Link>
//                 </motion.div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right side */}
//         {false && (
//           <div className="flex items-center space-x-4">
//             <ShinyText
//               text="Get Prem +"
//               speed={3}
//               isHoverEnable={true}
//               hoverClass="hover:text-blue-300"
//               className="cursor-pointer"
//             />
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }
