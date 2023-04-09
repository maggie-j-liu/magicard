import { motion, useAnimation } from "framer-motion";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useReactToPrint } from "react-to-print";

const cardVariants = {
  closed: {
    transform: "rotateX(10deg) translateY(100%)",
  },
  open: {
    transform: "rotateX(170deg) translateY(100%)",
  },
};

const textVariants = {
  closed: {
    opacity: 1,
  },
  open: {
    opacity: 0,
  },
};

const Card = ({ message = "", preview, qrCode }) => {
  const [title, setTitle] = useState("greetings!");
  const controls = useAnimation();
  const [open, setOpen] = useState(false);
  const [letter, setLetter] = useState("hi john. how are you?");
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleLetterChange = (e) => {
    setLetter(e.target.value);
  };
  return (
    <div className="py-16 px-8 overflhow-x-hidden">
      <button onClick={handlePrint}>Print this out!</button>
      <div
        className="relative flex flex-col items-center w-full"
        style={{ perspective: 1000 }}
      >
        <div
          className="overflow-visible hidden print:block w-full h-[30rem] bg-white"
          ref={componentRef}
        >
          <div className="border-slate-500 border-4 w-full flex flex-col items-center justify-center h-[5.5in]">
            <h1 className="rotate-180 text-center font-bold font-serif text-2xl">
              {title}
            </h1>
          </div>
          <div className="h-[5.5in]"></div>
          <div className="h-[11in] w-screen flex flex-col items-center justify-center">
            <div className="h-[5.5in] flex flex-col items-center justify-center">
              <p className="text-sm text-center">
                scan for a special message ✨
              </p>
              <img
                src={qrCode}
                className={"border-2 text-center border-black rounded-lg"}
              />
            </div>
            <div className="h-[5.5in]">
              <div className="">
                <img src={preview} />
              </div>
            </div>
          </div>
        </div>
        Cover:{" "}
        <input
          type="text"
          onChange={handleTitleChange}
          className="z-50"
          defaultValue={title}
        />
        <div className="absolute w-full sm:w-2/3 max-w-2xl aspect-video flex flex-col items-center justify-center">
          <motion.div
            variants={textVariants}
            initial="closed"
            animate={controls}
            transition={{
              duration: 2,
            }}
            className="absolute bottom-1 flex flex-col items-center"
          ></motion.div>
        </div>
        <motion.div
          onTap={() => {
            if (open) {
              setOpen(false);
              controls.start("closed");
            } else {
              setOpen(true);
              controls.start("open");
            }
          }}
          variants={cardVariants}
          initial="closed"
          animate={controls}
          transition={{
            duration: 3,
          }}
          className="cursor-pointer relative w-full sm:w-2/3 max-w-2xl aspect-video z-10"
          style={{
            transformOrigin: "center bottom",
            transform: "translateY(100%)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-white"
              style={{
                transform: "rotateX(180deg)",
              }}
            >
              <div className="flex justify-center items-center">
                <div className="w-1/4">
                  <p className="mt-12 text-sm text-center">Scan me! </p>
                  <img
                    src={qrCode}
                    className={"border-2 border-black roudned-lg"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 bg-white"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="overflow-hidden relative w-full h-full p-2 sm:p-4">
              <div className="border-slate-500 border-4 w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-center font-bold font-serif  sm:text-xl ">
                  {title} {/* make this editable */}
                </h1>
              </div>
            </div>
          </div>
        </motion.div>
        <div
          className="overflow-auto w-full sm:w-2/3 max-w-2xl aspect-video will-change-transform bg-white"
          style={{
            transformOrigin: "center top",
            transform: "rotateX(10deg)",
          }}
        >
          <div className="flex justify-center items-center max-w-none whitespace-pre-wrap p-2 sm:p-4 pt-0 text-xs sm:text-base w-full h-full prose">
            <div className="w-3/4 h-full -mt-4 ">
              <img src={preview} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
