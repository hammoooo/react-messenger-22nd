import { Outlet } from "react-router-dom";
import ChatHeader from "@/pages/Chat/components/ChatHeader";
import ChatInput from "@/pages/Chat/components/ChatInput";
//import Notch from "@/components/Notch";

export default function ChatLayout() {
  return (
    <div className="w-full h-full bg-yellow-300">
      <div>
        {/* <Notch /> */}
        <img src="/images/nnotch.svg" />
        <ChatHeader />

        <main className="!pb-[calc(84px+env(safe-area-inset-bottom))]">
          <Outlet />
        </main>
      </div>

      <ChatInput />
    </div>
  );
}
