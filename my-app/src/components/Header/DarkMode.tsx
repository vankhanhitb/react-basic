import {useEffect, useState} from 'react';
import LightButton from "../../assets/website/light-mode-button.png";
import DarkButton from "../../assets/website/dark-mode-button.png";

type Theme = "light" | "dark";

export default function DarkMode() {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light",
    );
  }

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark",
    );
  }, [theme]);

  return (
    <div className="relative">
      <img 
        src={LightButton}
        alt="" 
        onClick={() => toggleTheme()}
        className={`w-12 cursor-pointer drop-shadow-[1px_1px_rgba(0,0,0,0.1)] transition duration-300 absolute right-0 z-10 ${
          theme === "dark" ? "opacity-0 hidden" : "opacity-100 visible"
        }`}
      />
      <img
        src={DarkButton}
        alt=""
        onClick={() => toggleTheme()}
        className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300"
      />
    </div>
  )
}
