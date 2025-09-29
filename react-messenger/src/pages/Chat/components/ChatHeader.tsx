import { useLocation, useNavigate } from "react-router-dom";

export default function ChatHeader() {
  const nav = useNavigate();
  const location = useLocation();
  const { title } = (location.state ?? {}) as { title?: string };

  return (
    <header className="sticky top-0 z-10 !pt-2 backdrop-blur">
      <div className="relative flex items-center justify-between px-4 py-3 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => nav(-1)}
            className="rounded p-1 active:scale-95"
          >
            <img
              src="/images/profile/profileLeftArrow.svg"
              className="h-6 w-6"
            />
          </button>
        </div>
        <h1 className="absolute inset-0 flex items-center justify-center text-body-1 !font-semibold text-gray-800">
          {title}
        </h1>
        <div className="flex items-center gap-4">
          <button className="h-6 w-6 active:scale-95">
            <img src="/images/magnifying.svg" alt="검색" />
          </button>
          <button className="h-6 w-6 active:scale-95">
            <img src="/images/burger.svg" alt="메뉴" />
          </button>
        </div>
      </div>
    </header>
  );
}
