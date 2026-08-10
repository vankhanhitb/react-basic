import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-row bg-gray-900">
      <ToastContainer />
      <Navigation />
      <main className="max-w-[calc(100% - 15)] w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
