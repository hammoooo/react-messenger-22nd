import ChatIcon from "@/assets/profile/profileChatting.svg?react";
import EditIcon from "@/assets/profile/profileEdit.svg?react";
import PungIcon from "@/assets/profile/profilePung.svg?react";

type ActiveKey = "selfchat" | "edit" | "pung";

export default function ProfileFooter({
  active,
  onTab,
}: {
  active?: ActiveKey;
  onTab?: (key: ActiveKey) => void;
}) {
  const tabs: {
    key: ActiveKey;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    alt: string;
  }[] = [
    { key: "selfchat", Icon: ChatIcon, alt: "나와의 채팅" },
    { key: "edit", Icon: EditIcon, alt: "프로필 편집" },
    { key: "pung", Icon: PungIcon, alt: "펑 보관함" },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 w-[375px] bg-transparent">
      <div className="rounded-t-[16px] bg-yellow-800">
        <div className="h-[108px] !px-[50px] !pt-7 pb-[env(safe-area-inset-bottom)]">
          <div className="grid grid-cols-3 h-14 w-full place-items-center">
            {tabs.map((t) => {
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => onTab?.(t.key)}
                  className={[
                    "w-[64px] h-[58px]",
                    "active:scale-95 transition",
                  ].join(" ")}
                >
                  <t.Icon
                    className="pointer-events-none opacity-100"
                    role="img"
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
