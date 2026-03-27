import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useAuthContext } from "../../context/AuthContext";
import { TiMessages } from "react-icons/ti";
import { IoChevronBack } from "react-icons/io5";

const MessageContainer = ({ showBackButton }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col flex-1 min-h-0">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center gap-2 shrink-0">
            {showBackButton && (
              <button
                type="button"
                onClick={() => setSelectedConversation(null)}
                className="p-1 -ml-1 rounded-lg hover:bg-slate-200 transition-colors touch-manipulation"
                aria-label="Back to conversations"
              >
                <IoChevronBack className="w-6 h-6 text-slate-700" />
              </button>
            )}
            <span className="font-bold truncate">{selectedConversation.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-slate-700 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullName} 👋</p>
        <p className="text-muted">Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center text-accent" />
      </div>
    </div>
  );
};
