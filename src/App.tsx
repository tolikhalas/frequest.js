import "./App.css";
import "react-toastify/ReactToastify.css";

import CustomInput from "./components/CustomInput";
import { ToastContainer } from "react-toastify";
import StatusBar from "./components/StatusBar";

function App() {
  return (
    <main className="space-y-2">
      <StatusBar />
      <h1>Set frequency 📆</h1>
      <CustomInput />
      <ToastContainer />
    </main>
  );
}

export default App;
