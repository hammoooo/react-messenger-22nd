// import type { Message } from "@/types";
// import { useFriends } from "../../../store/friendsStore";
// import { toTimeLabelChat } from "@/utils/time";

// export default function MessageBubble({ m }: { m: Message }) {
//   const me = useFriends((s) => s.me);
//   const users = useFriends((s) => s.friends);

//   const myId = me?.id ?? "me";
//   const isMine = m.userId === myId || m.userId === "me";

//   const sender = isMine
//     ? me
//     : users.find((u) => u.id === m.userId) ?? {
//         name: "알수없음",
//         avatar: "/images/avatar.svg",
//       };

//   const time = m.createdAt ? toTimeLabelChat(m.createdAt) : "";

//   const bubbleBase =
//     "w-fit max-w-[180px] rounded-lg !py-2 !px-4 text-body-6 text-gray-900 whitespace-pre-line break-words";

//   if (isMine) {
//     return (
//       <div className="mb-3 flex w-full items-end justify-end gap-2 px-4">
//         <time className="text-caption text-gray-600">{time}</time>
//         {/* <div className=" rounded-lg bg-yellow-500 !py-2 !px-4 text-body-6 text-gray-900 whitespace-pre-line">
//           {m.text}
//         </div> */}
//         <div className={`${bubbleBase} bg-yellow-800`}>{m.text}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="mb-3 flex w-full items-end gap-2 px-4">
//       {/* <img src={sender?.avatar} className="h-9 w-9 object-cover" /> */}
//       <img src="/images/avatar.svg" className="h-9 w-9 object-cover z-10" />
//       {/* <div className=" rounded-lg bg-gray-300 !py-2 !px-4 text-body-6 text-gray-900 whitespace-pre-line">
//         {m.text}
//       </div> */}
//       <div className={`${bubbleBase} bg-gray-300 -ml-3 pl-5 relative z-0`}>
//         {m.text}
//       </div>
//       <time className="text-caption text-gray-600">{time}</time>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import type { Message } from "@/types";
import { useFriends } from "../../../store/friendsStore";
import { toTimeLabelChat } from "@/utils/time";

/** 말풍선이 2줄 이상인지 감지하는 훅 */
function useIsMultiLine(dep?: unknown) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [multi, setMulti] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const cs = window.getComputedStyle(el);
      const lh =
        parseFloat(cs.lineHeight || "") ||
        parseFloat(cs.fontSize || "16") * 1.2;
      const padY =
        parseFloat(cs.paddingTop || "0") + parseFloat(cs.paddingBottom || "0");
      const contentH = el.scrollHeight - padY;
      setMulti(contentH > lh * 1.3);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [dep]);

  return { ref, multi };
}

export default function MessageBubble({
  m,
  /** 바로 위 메시지가 '내' 말풍선인지 여부 (리스트에서 넘겨주세요) */
  prevIsMine = false,
}: {
  m: Message;
  prevIsMine?: boolean;
}) {
  const me = useFriends((s) => s.me);
  const users = useFriends((s) => s.friends);

  const myId = me?.id ?? "me";
  const isMine = m.userId === myId || m.userId === "me";

  const sender = isMine
    ? me
    : users.find((u) => u.id === m.userId) ?? {
        name: "알수없음",
        avatar: "/images/avatar.svg",
      };

  const time = m.createdAt ? toTimeLabelChat(m.createdAt) : "";

  const bubbleBase =
    "w-fit max-w-[180px] rounded-lg !py-2 !px-4 text-body-6 text-gray-900 whitespace-pre-line break-words";

  if (isMine) {
    return (
      <div className="mb-3 flex w-full items-end justify-end gap-2 px-4">
        <time className="text-caption text-gray-600">{time}</time>
        <div className={`${bubbleBase} bg-yellow-800`}>{m.text}</div>
      </div>
    );
  }

  // 상대 말풍선: 2줄 이상 + 바로 위가 내 말풍선일 때만 여백 확보
  const { ref: bubbleRef, multi } = useIsMultiLine(m.text);
  const needOffset = multi && prevIsMine;

  return (
    <div
      className={`mb-3 flex w-full items-end gap-2 px-4 ${
        needOffset ? "pt-5" : ""
      }`}
    >
      <img
        src="/images/avatar.svg"
        className="h-9 w-9 object-cover z-10 shrink-0"
        alt=""
      />
      <div
        ref={bubbleRef}
        className={`${bubbleBase} bg-gray-300 -ml-3 pl-5 ${
          needOffset ? "mt-5" : ""
        }`}
      >
        {m.text}
      </div>
      <time className="text-caption text-gray-600">{time}</time>
    </div>
  );
}
