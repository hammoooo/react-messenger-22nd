import { useFriends } from "../../../store/friendsStore";
//import Avatar from "../../../components/Avatar";
import { Link } from "react-router-dom";
import BigAvatar from "@/assets/bigAvatar.svg?react";

export default function MeCard() {
  const me = useFriends((s) => s.me);
  if (!me) return null;

  return (
    <Link
      to={`/profile/${encodeURIComponent(me.name)}`}
      className="flex items-center gap-3 px-4 py-2"
    >
      {/* <Avatar src={me.avatar} alt={me.name} /> */}
      {/* <img src="/images/bigAvatar.svg" alt={me.name} /> */}
      <BigAvatar className="h-10 w-10 shrink-0" role="img" />
      <div className="min-w-0 flex-1 mt-200">
        <p className="truncate text-[18px] font-semibold leading-tight text-gray-800">
          {me.name}
        </p>
        <p className="truncate text-[13px] text-gray-500">{me.status}</p>
      </div>

      {/* 멀프, 음악 보류 */}

      {/* {me.music && (
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-gray-200 px-2 py-1 text-[11px] text-gray-600">
          <span className="max-w-[140px] truncate">
            {me.music.title}
            {me.music.artist ? ` - ${me.music.artist}` : ""}
          </span>
        </div>
      )} */}
    </Link>
  );
}
