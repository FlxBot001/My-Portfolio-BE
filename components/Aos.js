import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Aos({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out', // Add easing effect
      once: true, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
      offset: 200, // Offset (in px) from the original trigger point
    });
  }, []);

  return <div>{children}</div>;
}