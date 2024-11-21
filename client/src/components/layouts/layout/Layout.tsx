import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* <Header routes={routes} /> */}
      <main className="p-6 flex-1">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
