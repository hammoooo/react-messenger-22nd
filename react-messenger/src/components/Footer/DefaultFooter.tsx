import { useNavigate } from "react-router-dom";

type ActiveKey = "friends" | "chat" | "openchat" | "shopping" | "more";

export function DefaultFooter({
  active,
  onTab,
}: {
  active: ActiveKey;
  onTab?: (key: ActiveKey) => void;
}) {
  const navigate = useNavigate();

  const tabs: { key: ActiveKey; src: string; alt: string }[] = [
    { key: "friends", src: "/images/tab/tabFriends.svg", alt: "친구" },
    { key: "chat", src: "/images/tab/tabChatting.svg", alt: "채팅" },
    { key: "openchat", src: "/images/tab/tabOpenChat.svg", alt: "오픈채팅" },
    { key: "shopping", src: "/images/tab/tabShopping.svg", alt: "쇼핑" },
    { key: "more", src: "/images/tab/tabMore.svg", alt: "더보기" },
  ];

  return (
    // <nav className="fixed inset-x-0 w-full bottom-0 z-10 bg-transparent">
    <nav className="sticky bottom-0 z-10 bg-transparent">
      <div className="rounded-t-[16px] bg-yellow-800">
        <div className="h-[88px] !px-7 !pt-4 pb-[env(safe-area-inset-bottom)]">
          <div className="grid grid-cols-5 gap-x-[15px] h-14 w-full">
            {tabs.map((t) => {
              const isActive = t.key === active;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => {
                    if (t.key === "chat") {
                      navigate("/chatting");
                    } else if (t.key === "friends") {
                      navigate("/");
                    }
                    onTab?.(t.key);
                  }}
                  className={[
                    "w-[50px] h-[48px]",
                    "active:scale-95 transition",
                  ].join(" ")}
                >
                  <img
                    src={t.src}
                    alt={t.alt}
                    className={[
                      "pointer-events-none",
                      isActive ? "opacity-100" : "opacity-40",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
