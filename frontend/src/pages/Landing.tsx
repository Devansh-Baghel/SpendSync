import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/register");
  }, []);

  return (
    <>
      <Navbar />
      <Button>Click Me</Button>
    </>
  );
}

export default Landing;
