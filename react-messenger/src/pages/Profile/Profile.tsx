import { useParams } from "react-router-dom";
import BigAvatar from "@/assets/bigAvatar.svg?react";
import ProfileRightArrow from "@/assets/profile/profileRightArrow.svg?react";

export default function Profile() {
  const { name } = useParams<{ name?: string }>();

  return (
    // <div className="mx-auto min-h-screen w-[375px] select-none bg-white">
    <div
      className="
        min-h-[calc(100dvh-158px-env(safe-area-inset-bottom))] flex flex-col justify-end
      "
    >
      <div>
        <div className="flex flex-col items-center !pt-85  !gap-3">
          <section className="w-[324px] h-[124px] rounded-2xl bg-gray-300 !p-3 flex items-center gap-3">
            <div className="shrink-0 w-20 h-20 grid place-items-center">
              <BigAvatar role="img" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-headline-2 font-bold text-gray-800 truncate">
                {name}
              </p>

              {/* 추후에 유저정보 받아오면 업데이트 */}
              <p className="mt-1 text-[13px] text-gray-600 truncate">
                상태메세지
              </p>
            </div>

            <ProfileRightArrow className="w-6 h-6" role="img" />
          </section>
          <button className=" w-[324px] !mb-5 rounded-2xl active:scale-[0.99]">
            <img
              src="/images/profile/profileSNS.svg"
              alt="profileSNS"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
