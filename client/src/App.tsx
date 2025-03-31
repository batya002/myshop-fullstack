import { SignIn, SignUp } from "@/components/auth";
import { Home, Products, Users } from "@/pages";
import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </>
  );
}
