import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { useChatting } from "../../store/chatStore";
import MessageBubble from "./components/MessageBubble";

export default function Chat() {
  const { roomId = "room-22" } = useParams(); // default
  const init = useChatting((s) => s.init);
  const rooms = useChatting((s) => s.rooms);
  const map = useChatting((s) => s.messages);
  const isLoading = useChatting((s) => s.isLoading);
  //  const me = useFriends((s) => s.me); // users.json에서 로딩됨

  useEffect(() => {
    init(roomId);
  }, [init, roomId]);

  const room = useMemo(
    () => rooms.find((r) => r.id === roomId),
    [rooms, roomId]
  );
  const list = map[roomId] ?? [];

  // 스크롤 최하단 고정
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [list.length]);

  return (
    <div className="mx-auto w-full max-w-[375px] min-h-screen bg-yellow-300">
      <div ref={ref} className=" overflow-y-auto !space-y-5">
        {/* <div className="h-2" /> */}

        {isLoading ? (
          <p className="px-4 py-8 text-center text-gray-600">불러오는 중…</p>
        ) : (
          list.map((m) => <MessageBubble key={m.id} m={m} />)
        )}

        {/* <div className="h-3" /> */}
      </div>
    </div>
  );
}
