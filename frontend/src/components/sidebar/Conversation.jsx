import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import Avatar from "../Avatar";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`chat-list-item flex gap-2 items-center p-2 cursor-pointer ${
          isSelected ? "active" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <Avatar
          fullName={conversation.fullName}
          profilePic={conversation.profilePic}
          size="w-12"
          online={isOnline}
        />

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-semibold text-slate-800">{conversation.fullName}</p>
            {/* <span className="text-xl">{emoji}</span> */}
          </div>
        </div>
      </div>

      {!lastIdx && (
        <div className="divider my-0 py-0 h-1 before:bg-slate-300/60 after:bg-slate-300/60" />
      )}
    </>
  );
};

export default Conversation;
