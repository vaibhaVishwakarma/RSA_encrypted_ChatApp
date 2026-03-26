import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
<<<<<<< HEAD
import Avatar from "../Avatar";
=======
>>>>>>> 6674c8e (project)

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
<<<<<<< HEAD
  const user = fromMe ? authUser : selectedConversation;
=======
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
>>>>>>> 6674c8e (project)
  const formattedTime = extractTime(message.createdAt);
  const bubbleBgColor = fromMe ? "bg-sky-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
<<<<<<< HEAD
      <div className="chat-image">
        <Avatar
          fullName={user?.fullName}
          profilePic={user?.profilePic}
          size="w-10"
        />
=======
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
>>>>>>> 6674c8e (project)
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2 maxWidth`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
