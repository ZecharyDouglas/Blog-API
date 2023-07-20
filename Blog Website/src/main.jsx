import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "../src/Styles/index.css";
import { Button } from "@chakra-ui/react";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";

function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <ChakraProvider>
      <div className=" flex flex-col items-center">
        <nav className="flex  shadow-xl justify-between border border-black w-full mt-10 p-5 rounded-md">
          <div>
            <Button className="mr-2" colorScheme="yellow">
              View Posts
            </Button>
            <Button className="mr-2" colorScheme="yellow">
              View Comments
            </Button>
          </div>

          <div>
            <Button
              className="mr-2"
              colorScheme="yellow"
              onClick={() => setRegisterOpen(true)}
            >
              Register
            </Button>
            <Button
              className="mr-2"
              colorScheme="yellow"
              onClick={() => setLoginOpen(true)}
            >
              Login
            </Button>
            <Button colorScheme="yellow">Logout</Button>
          </div>
        </nav>
        {registerOpen && (
          <Register
            isOpen={registerOpen}
            onClose={() => setRegisterOpen(false)}
          />
        )}
        {loginOpen && (
          <Login isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        )}
      </div>
    </ChakraProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-yellow-200 h-[1000px] ">
      <Header />
      <div className="flex flex-col items-center">
        <App />
      </div>
    </div>
  </React.StrictMode>
);
