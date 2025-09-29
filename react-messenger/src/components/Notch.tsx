// Notch.tsx
import { useEffect, useRef, useState } from "react";
import * as time from "../utils/time";

// ─────────────────────────────────────────────────────────────
// time.ts 어댑터: 네 파일의 함수 이름이 무엇이든 최대한 맞춰 호출
// (nowHHmm / hhmm / formatNow 등 흔한 이름을 지원, 없으면 로컬 포맷)
function getTimeFromTimeTs(): string {
  const t = time as any;
  if (typeof t.nowHHmm === "function") return t.nowHHmm();
  if (typeof t.hhmm === "function") return t.hhmm();
  if (typeof t.formatNow === "function") return t.formatNow("HH:mm");
  if (typeof t.nowText === "function") return t.nowText();
  // fallback: 로컬 포맷 "9:41"
  const d = new Date();
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(d)
    .replace(/\s?[AP]M/i, "");
}

// 30초마다 업데이트 (iOS처럼 분 단위만 갱신해도 충분)
function useNowText() {
  const [text, setText] = useState<string>(() => getTimeFromTimeTs());
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => setText(getTimeFromTimeTs());
    tick();
    timer.current = window.setInterval(tick, 30_000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  return text;
}

export default function Notch() {
  const text = useNowText();

  return (
    <div className="relative mx-auto w-full max-w-[375px] bg-white">
      {/* 안전영역 + 상태바 */}
      <div className="relative flex items-center justify-between px-4 pt-[env(safe-area-inset-top)] h-[44px]">
        {/* 중앙 노치 */}
        <img
          src="/images/notch/Notch"
          alt="dd"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 translate-y-[-6px] h-[36px] w-[270px] select-none"
          draggable={false}
        />

        {/* 좌측 시간 */}
        <div className="z-[1] flex items-center">
          <span className="text-[17px] font-semibold leading-none text-black">
            {text}
          </span>
        </div>

        {/* 우측 아이콘 (합본 이미지 한 장) */}
        <div className="z-[1] flex items-center">
          <img
            src="/images/notch/notchRightSide"
            alt="status"
            className="h-[14px] select-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
