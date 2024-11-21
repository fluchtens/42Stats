import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";

export function Layout() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <main className="p-6 flex-1">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
