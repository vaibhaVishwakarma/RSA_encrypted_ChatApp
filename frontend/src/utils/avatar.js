/**
 * Get avatar URL - uses profilePic if provided and valid, else generates a random
 * cartoon-style avatar (animals & emojis) using DiceBear fun-emoji set.
 * @param {string} fullName - User's full name (for initials fallback)
 * @param {string} [profilePic] - Optional existing profile picture URL
 * @param {number} [size=128] - Avatar size in pixels
 * @returns {string} Avatar URL
 */
export const getAvatarUrl = (fullName, profilePic, size = 128) => {
  if (profilePic && profilePic.startsWith("http")) {
    return profilePic;
  }
  const name = (fullName || "").trim() || "User";
  const encoded = encodeURIComponent(name);
  const lightBackgrounds = ["fef9c3", "fee2e2", "dcfce7", "e0f2fe", "ede9fe"];
  const index =
    [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) %
    lightBackgrounds.length;
  const bg = lightBackgrounds[index];
  // DiceBear fun-emoji API (SVG avatars) with light pastel backgrounds.
  return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encoded}&backgroundColor=${bg}&radius=50`;
};
