// import { useEffect, useLayoutEffect, useRef } from "react";

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

//   const resizeClamp = () => {
//     const el = ref.current;
//     if (!el) return;

//     el.style.height = "auto";

//     const cs = getComputedStyle(el);
//     const lh = parseFloat(cs.lineHeight || "20");
//     const vp =
//       parseFloat(cs.paddingTop || "0") + parseFloat(cs.paddingBottom || "0");
//     const vb =
//       parseFloat(cs.borderTopWidth || "0") +
//       parseFloat(cs.borderBottomWidth || "0");

//     const oneLine = Math.ceil(lh + vp + vb);
//     const twoLines = Math.ceil(lh * 2 + vp + vb);

//     // 실제 내용 높이와 2줄 중 작은 값을 적용
//     const target = Math.min(el.scrollHeight, twoLines);
//     el.style.height = `${target}px`;

//     // 2줄을 넘으면 스크롤 표시, 아니면 숨김
//     el.style.overflowY = el.scrollHeight > twoLines ? "auto" : "hidden";

//     // 최소 1줄 보장 (혹시 폰트/스타일 변화 대비)
//     if (target < oneLine) el.style.height = `${oneLine}px`;
//   };

//   useLayoutEffect(resizeClamp, []);
//   useEffect(resizeClamp, [value]);

//   return (
//     <textarea
//       ref={ref}
//       rows={1}
//       placeholder="메시지를 입력하세요"
//       className="block w-full resize-none bg-transparent p-0 box-border
//                  leading-[1.3] text-body-2 text-gray-800 placeholder:text-gray-500
//                  outline-none max-h-[999px] min-h-[38px]"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" && !e.shiftKey && !disabled) {
//           e.preventDefault();
//           onEnter();
//         }
//       }}
//     />
//   );
// }

// import { useEffect, useLayoutEffect, useRef } from "react";

// interface Props {
//   value: string;
//   onChange: (v: string) => void;
//   onEnter: () => void;
//   disabled: boolean;
// }

// export default function ChatTextarea({
//   value,
//   onChange,
//   onEnter,
//   disabled,
// }: Props) {
//   const ref = useRef<HTMLTextAreaElement>(null);

//   // 2줄까지 확장(최대 44px), 넘치면 스크롤
//   const resizeClamp = () => {
//     const el = ref.current;
//     if (!el) return;
//     el.style.height = "auto";
//     const MAX = 44; // 고정 요구 높이
//     const target = Math.min(el.scrollHeight, MAX);
//     el.style.height = `${target}px`;
//     el.style.overflowY = el.scrollHeight > MAX ? "auto" : "hidden";
//   };

//   useLayoutEffect(resizeClamp, []);
//   useEffect(resizeClamp, [value]);

//   return (
//     <textarea
//       ref={ref}
//       rows={1}
//       placeholder="메시지를 입력하세요"
//       className="
//         block w-[238px] max-w-[238px] min-w-[238px]
//         h-[44px] min-h-[44px] max-h-[44px]
//         resize-none bg-transparent p-0 box-border
//         leading-[22px] text-body-2 text-gray-800 placeholder:text-gray-500
//         outline-none
//       "
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" && !e.shiftKey && !disabled) {
//           e.preventDefault();
//           onEnter();
//         }
//       }}
//     />
//   );
// }

import { useEffect, useLayoutEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
  disabled: boolean;
}

export default function ChatTextarea({
  value,
  onChange,
  onEnter,
  disabled,
}: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const resizeClamp = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const MAX = 44; // 두 줄 높이
    const target = Math.min(el.scrollHeight, MAX);
    el.style.height = `${target}px`;
    el.style.overflowY = el.scrollHeight > MAX ? "auto" : "hidden";
  };

  useLayoutEffect(resizeClamp, []);
  useEffect(resizeClamp, [value]);

  return (
    <textarea
      ref={ref}
      rows={1}
      placeholder="메시지를 입력하세요"
      className="
        block w-full !px-2
        h-auto min-h-[22px] max-h-[44px]   /* 1~2줄 */
        resize-none bg-transparent p-0 box-border
        leading-[22px] text-body-2 text-gray-800 placeholder:text-gray-500
        outline-none
      "
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey && !disabled) {
          e.preventDefault();
          onEnter();
        }
      }}
    />
  );
}
