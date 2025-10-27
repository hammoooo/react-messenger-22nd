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

// import { useEffect, useRef, useReducer } from "react";

// type State = {
//   isFocused: boolean;
//   isComposing: boolean;
//   height: number;
// };

// type Action =
//   | { type: "FOCUS" }
//   | { type: "COMPOSE_START" }
//   | { type: "COMPOSE_END" }
//   | { type: "AUTO_RESIZE"; payload: number };

// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case "COMPOSE_START":
//       return { ...state, isComposing: true };
//     case "COMPOSE_END":
//       return { ...state, isComposing: false };
//     case "AUTO_RESIZE":
//       return { ...state, height: action.payload };
//     default:
//       return state;
//   }
// }

// export default function ChatTextarea({
//   value,
//   onChange,
//   onEnter,
//   disabled,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   onEnter: () => void;
//   disabled: boolean;
// }) {
//   const ref = useRef<HTMLTextAreaElement>(null);
//   const [state, dispatch] = useReducer(reducer, {
//     isFocused: false,
//     isComposing: false,
//     height: 38,
//   });

//   // 자동 높이
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     el.style.height = "auto";
//     const next = Math.min(el.scrollHeight, 60); // 최대 60px
//     dispatch({ type: "AUTO_RESIZE", payload: next });
//   }, [value]);

//   return (
//     <textarea
//       ref={ref}
//       rows={1}
//       value={value}
//       placeholder="메시지를 입력하세요"
//       className="
//         block w-full h-auto
//         min-h-[38px] max-h-[60px]
//         !resize-none px-3 py-2 bg-transparent box-border
//         leading-[22px] placeholder:text-gray-600
//         outline-none overflow-y-auto no-scrollbar
//       "
//       style={{ height: state.height }}
//       onFocus={() => dispatch({ type: "FOCUS" })}
//       onCompositionStart={() => dispatch({ type: "COMPOSE_START" })}
//       onCompositionEnd={(e) => {
//         dispatch({ type: "COMPOSE_END" });
//         // 조합 종료 후 엔터 처리
//         if (e.currentTarget.value.trim() && !disabled) {
//         }
//       }}
//       onChange={(e) => onChange(e.target.value)}
//       onKeyDown={(e) => {
//         if (
//           e.key === "Enter" &&
//           !e.shiftKey &&
//           !state.isComposing &&
//           !disabled
//         ) {
//           e.preventDefault();
//           onEnter();
//         }
//       }}
//     />
//   );
// }
