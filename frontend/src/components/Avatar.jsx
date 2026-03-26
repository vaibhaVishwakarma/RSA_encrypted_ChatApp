import { useState } from "react";
import { getAvatarUrl } from "../utils/avatar";

/**
 * Avatar with fallback to initials (Google-style) when image fails to load
 */
const Avatar = ({ fullName, profilePic, size = "w-10", className = "", online }) => {
  const [imgError, setImgError] = useState(false);
  const url = imgError || !profilePic
    ? getAvatarUrl(fullName, null, 128)
    : profilePic;

  return (
    <div className={`avatar avatar-glow ${online ? "online" : ""} ${className}`}>
      <div className={`${size} rounded-full ring-2 ring-white/70 shadow-sm`}>
        <img
          src={url}
          alt={fullName || "avatar"}
          onError={() => setImgError(true)}
          className="object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default Avatar;
