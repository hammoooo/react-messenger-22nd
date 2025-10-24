import { useLayoutEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
  disabled?: boolean;
  minHeight?: number;
  maxHeight?: number;
  placeholder?: string;
};

export default function ChatTextarea({
  value,
  onChange,
  onEnter,
  disabled,
  minHeight = 25,
  maxHeight = 50,
  placeholder = "메시지를 입력하세요",
}: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const resize = () => {
    const el = ref.current;
    if (!el) return;

    // 높이 재계산
    el.style.height = "auto";
    const next = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);
    el.style.height = `${next}px`;

    // 스크롤 표시/숨김
    el.style.overflowY = next >= maxHeight ? "auto" : "hidden";
  };

  // 초기 렌더 때 한 줄 높이
  useLayoutEffect(() => {
    resize();
  }, []);

  return (
    <textarea
      ref={ref}
      rows={1}
      placeholder={placeholder}
      className="
        block w-full
        h-auto
        !min-h-0
        px-3 py-2 bg-transparent box-border
        leading-[22px] placeholder:text-gray-600
        outline-none no-scrollbar !resize-none
      "
      style={
        {
          minHeight,
          maxHeight,
        } as React.CSSProperties
      }
      value={value}
      onInput={resize}
      onChange={(e) => {
        onChange(e.target.value);
        // resize();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey && !disabled) {
          e.preventDefault();
          onEnter?.();
          // 전송 직후 내용이 초기화되면 높이도 리셋
          requestAnimationFrame(resize);
        }
      }}
    />
  );
}
