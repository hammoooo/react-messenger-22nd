import { useNavigate } from "react-router-dom";
import ProfileLeftArrow from "@/assets/profile/profileLeftArrow.svg?react";
import GiftIcon from "@/assets/gift.svg?react";
import QrIcon from "@/assets/qr.svg?react";
import SettingIcon from "@/assets/setting.svg?react";

export default function ProfileHeader() {
  const nav = useNavigate();
  return (
    <header className="!py-3 flex justify-between items-center pt-[env(safe-area-inset-top)]">
      <button
        type="button"
        onClick={() => nav(-1)}
        className="w-8 h-8 grid place-items-center active:scale-95 rounded"
        title="뒤로"
      >
        <ProfileLeftArrow className="w-5 h-5" role="img" />
      </button>

      <div className="flex gap-x-3 ">
        {[
          { Icon: GiftIcon, alt: "선물" },
          { Icon: QrIcon, alt: "qr" },
          { Icon: SettingIcon, alt: "설정" },
        ].map(({ Icon, alt }) => (
          <button
            key={alt}
            type="button"
            className="w-6 h-[24px] active:scale-95 transition"
          >
            <Icon className="pointer-events-none w-6 h-6" role="img" />
          </button>
        ))}
      </div>
    </header>
  );
}
