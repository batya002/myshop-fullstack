import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Switch,
} from "../ui";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header>
      <div className="container max-w-section">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="/src/assets" alt="logo" />
          </Link>
          <nav>
            <ul className="flex gap-x-10 items-center">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <img
                src="/user.svg"
                alt="user logo"
                width={40}
                height={40}
                className="cursor-pointer"
                onClick={() => setOpen(true)}
              />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-center">Menu</SheetTitle>
              </SheetHeader>
              <ul className="p-4 flex flex-col gap-y-3">
                <li>
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    Profile
                  </Link>
                </li>
                <li className="flex justify-between items-center">
                  <p>change mode</p>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </li>
                <li>
                  <button onClick={() => setOpen(false)}>Logout</button>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
