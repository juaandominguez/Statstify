import { RefObject } from "react";

const handleNextClick = (ref: RefObject<HTMLElement>, windowWidth: number) => {
  if (ref.current) {
    const scrollAmount = windowWidth >= 900 ? 1000 : 200;
    ref.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
};

const handlePreviousClick = (
  ref: RefObject<HTMLElement>,
  windowWidth: number,
) => {
  if (ref.current) {
    const scrollAmount = windowWidth >= 900 ? 1000 : 200;
    ref.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  }
};

export { handleNextClick, handlePreviousClick };
