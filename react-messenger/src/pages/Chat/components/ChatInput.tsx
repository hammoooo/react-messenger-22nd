// import { useChatting } from "../../../store/chatStore";
// import ChatTextarea from "./ChatTextArea";

// export default function ChatInput() {
//   const input = useChatting((s) => s.input);
//   const setInput = useChatting((s) => s.setInput);
//   const send = useChatting((s) => s.send);

//   const disabled = input.trim().length === 0;

//   return (
//     // <div className="sticky bottom-0 z-10 flex items-center min-h-[62px] bg-transparent bg-white">
//     //  <div className="mx-auto max-w-[375px] px-2">
//     <div className="fixed inset-x-0 bottom-0 z-10 bg-white z-10 w-full bg-white">
//       <div className="!px-2">
//         <div className="flex items-center min-h-[62px] gap-3 px-3 py-2 pb-[calc(env(safe-area-inset-bottom))]">
//           <button
//             type="button"
//             className="grid h-8 w-8 place-items-center rounded-full bg-gray-300 active:scale-95"
//           >
//             <img src="/images/addText.svg" />
//           </button>

//           {/* <div className="flex-1 rounded-full bg-gray-200 !px-4 py-2">
//             <input
//               type="text"
//               placeholder="메시지를 입력하세요"
//               className="w-full min-h-[38px] bg-transparent text-body-2 text-gray-800 placeholder:text-gray-500 outline-none"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey && !disabled) {
//                   e.preventDefault();
//                   send();
//                 }
//               }}
//             />
//           </div> */}

//           {/* <div className="flex-1 rounded-full bg-gray-200 px-4 py-2">
//             <ChatTextarea
//               value={input}
//               onChange={setInput}
//               onEnter={send}
//               disabled={disabled}
//             />
//           </div> */}

//           <div
//             className="flex-none overflow-hidden rounded-full bg-gray-200
//                w-[270px] h-[60px] px-2 py-2"
//           >
//             <ChatTextarea
//               value={input}
//               onChange={setInput}
//               onEnter={send}
//               disabled={disabled}
//             />
//           </div>

//           <button
//             type="button"
//             onClick={send}
//             disabled={disabled}
//             className="grid h-8 w-8 place-items-center rounded-full bg-gray-200 active:scale-95 disabled:opacity-40"
//           >
//             <img src="/images/sendText.svg" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useChatting } from "../../../store/chatStore";
// import ChatTextarea from "./ChatTextArea";

// export default function ChatInput() {
//   const input = useChatting((s) => s.input);
//   const setInput = useChatting((s) => s.setInput);
//   const send = useChatting((s) => s.send);
//   const disabled = input.trim().length === 0;

//   return (
//     <div className="fixed inset-x-0 bottom-0 z-10">
//       <div className="mx-auto w-[375px] h-[84px] bg-white">
//         <div className="grid h-full grid-cols-[48px_1fr_48px] items-center">
//           {/* + 버튼 */}
//           <button
//             type="button"
//             className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-gray-300 active:scale-95"
//           >
//             <img src="/images/addText.svg" />
//           </button>

//           {/* 중앙: 기본 270×38 → 최대 270×60, R=24 */}
//           <div className="flex justify-center">
//             <div
//               className="
//                 flex w-full max-w-[270px] items-center overflow-hidden
//                 rounded-[24px] bg-gray-200 px-4 py-2
//                 min-h-[38px] max-h-[60px]
//               "
//             >
//               <ChatTextarea
//                 value={input}
//                 onChange={setInput}
//                 onEnter={send}
//                 disabled={disabled}
//               />
//             </div>
//           </div>

//           {/* 전송 버튼 */}
//           <button
//             type="button"
//             onClick={send}
//             disabled={disabled}
//             className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-gray-200 active:scale-95 disabled:opacity-40"
//           >
//             <img src="/images/sendText.svg" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useChatting } from "../../../store/chatStore";
import ChatTextarea from "./ChatTextArea";

export default function ChatInput() {
  const input = useChatting((s) => s.input);
  const setInput = useChatting((s) => s.setInput);
  const send = useChatting((s) => s.send);
  const disabled = input.trim().length === 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-10">
      {/* 바탕 박스: 375×84 */}
      <div className="mx-auto w-[375px] h-[84px] bg-white">
        {/* 좌우 가장자리 여백 추가 */}
        <div className="h-full !px-2">
          {/* 3열: 좌 44px / 중앙 1fr / 우 44px + 동일 간격 */}
          <div className="grid h-full grid-cols-[44px_1fr_44px] items-center gap-x-0">
            {/* + 버튼 */}
            <button
              type="button"
              className="justify-self-center grid h-8 w-8 place-items-center rounded-full bg-gray-300 active:scale-95"
            >
              <img className="block" src="/images/addText.svg" />
            </button>

            {/* 중앙: 기본 270×38 → 최대 270×60, R=24 */}
            <div className="flex justify-center">
              <div className="flex w-full max-w-[270px] items-center overflow-hidden rounded-[24px] bg-gray-200 px-4 py-2 min-h-[38px] max-h-[60px]">
                <ChatTextarea
                  value={input}
                  onChange={setInput}
                  onEnter={send}
                  disabled={disabled}
                />
              </div>
            </div>

            {/* 전송 버튼 */}
            <button
              type="button"
              onClick={send}
              disabled={disabled}
              className="justify-self-center grid h-8 w-8 place-items-center rounded-full bg-gray-200 active:scale-95 disabled:opacity-40"
            >
              <img className="block" src="/images/sendText.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
