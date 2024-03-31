import "./App.css";
import Todos from "./components/Todos";
import TodoContextProvider from "./context/todo-context/TodoContextProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="app md:p-8 p-2 bg-glass relative font-montserrat">
        <TodoContextProvider>
          <Todos />
          <Toaster
            toastOptions={{
              className: "bg-red-500",
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
            }}
          />
        </TodoContextProvider>
      </div>
    </>
  );
}

export default App;
