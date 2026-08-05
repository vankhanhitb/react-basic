import { useState } from "react";

import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import MobileMenu from "./components/Header/MobileMenu";

function App() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpenMenu((currentValue) => !currentValue);
  }

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white">
      <Header toggleMenu={toggleMenu} />
      <Main />
      <Footer />
      {/* Mobile Menu */}
      <MobileMenu isOpenMenu={isOpenMenu} onClose={closeMenu} />
    </div>
  )
}

export default App
