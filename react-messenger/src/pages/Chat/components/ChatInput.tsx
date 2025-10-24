import { useChatting } from "../../../store/chatStore";
import ChatTextarea from "./ChatTextArea";

export default function ChatInput() {
  const input = useChatting((s) => s.input);
  const setInput = useChatting((s) => s.setInput);
  const send = useChatting((s) => s.send);
  const disabled = input.trim().length === 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 ">
      {/* 바탕 박스 */}
      <div className="mx-auto w-[375px] h-[84px] bg-white">
        {/* 좌우 가장자리 여백 추가 */}
        <div className="h-full !px-2">
          <div className="grid h-full grid-cols-[44px_1fr_44px] items-center gap-x-0">
            {/* + 버튼 */}
            <button
              type="button"
              className="justify-self-center grid h-8 w-8 place-items-center rounded-full bg-gray-300 active:scale-95"
            >
              <img className="block" src="/images/addText.svg" />
            </button>

            <div className="flex justify-center">
              <div className="flex w-full max-w-[270px] items-center overflow-hidden rounded-[24px] bg-gray-300 !px-4 !py-2 text-body-2">
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
