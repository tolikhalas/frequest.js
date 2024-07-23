import "./App.css";
import "react-toastify/ReactToastify.css";

import CustomInput from "./components/CustomInput";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <main className="space-y-2">
      <h1>Set frequency 📆</h1>
      <CustomInput />
      <ToastContainer />
    </main>
  );
}

export default App;
