import { useNavigate } from "react-router-dom";
import ProfileLeftArrow from "@/../public/images/profile/profileLeftArrow.svg?react";

export default function ProfileHeader() {
  const nav = useNavigate();
  return (
    <header className="!mx-2 !py-3 flex justify-between items-center pt-[env(safe-area-inset-top)]">
      <button
        type="button"
        onClick={() => nav(-1)}
        className="w-8 h-8 grid place-items-center active:scale-95 rounded"
        title="뒤로"
      >
        {/* <img
          src="/images/profile/profileLeftArrow.svg"
          alt=""
          className="w-5 h-5"
        /> */}
        <ProfileLeftArrow className="w-5 h-5" role="img" />
      </button>

      <div className="flex gap-x-3 ">
        {[
          { src: "/images/gift.svg", alt: "선물" },
          { src: "/images/qr.svg", alt: "qr" },
          { src: "/images/setting.svg", alt: "설정" },
        ].map((i) => (
          <button
            key={i.src}
            type="button"
            className="w-6 h-[24px] active:scale-95 transition"
          >
            <img src={i.src} alt={i.alt} className="pointer-events-none" />
          </button>
        ))}
      </div>
    </header>
  );
}
