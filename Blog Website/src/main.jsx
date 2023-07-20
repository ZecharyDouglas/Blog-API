import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "../src/Styles/index.css";
import { Button } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <div className="bg-slate-200 h-[1000px] flex flex-col items-center">
        <nav className=" flex justify-between  border border-red-400 w-10/12 mt-10 p-5 rounded-md">
          <div>
            <Button className="mr-2" colorScheme="gray">
              View Posts
            </Button>
            <Button className="mr-2" colorScheme="gray">
              View Comments
            </Button>
          </div>

          <div>
            <Button className="mr-2" colorScheme="gray">
              Register
            </Button>
            <Button className="mr-2" colorScheme="blue">
              Login
            </Button>
            <Button colorScheme="red">Logout</Button>
          </div>
        </nav>
        <App />
      </div>
    </ChakraProvider>
  </React.StrictMode>
);
