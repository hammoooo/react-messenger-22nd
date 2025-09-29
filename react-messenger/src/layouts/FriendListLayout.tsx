import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { DefaultFooter } from "../components/Footer/DefaultFooter";
import { useState } from "react";

export default function FriendListLayout() {
  const [tab, setTab] = useState<
    "friends" | "chat" | "openchat" | "shopping" | "more"
  >("friends");
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />

      {/* <hr className="!mx-4 !my-4 h-px bg-gray-400 origin-top scale-y-10" /> */}

      <main className="flex-1 overflow-y-auto min-h-0">
        <Outlet />
      </main>

      <DefaultFooter active={tab} onTab={setTab} />
    </div>
  );
}
