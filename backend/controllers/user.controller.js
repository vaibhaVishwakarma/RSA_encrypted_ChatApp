<<<<<<< HEAD
import * as userService from "../services/user.service.js";
=======
import User from "../models/user.model.js";
>>>>>>> 6674c8e (project)

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
<<<<<<< HEAD
    const filteredUsers = await userService.getAllUsersExcept(loggedInUserId);
=======
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
>>>>>>> 6674c8e (project)
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
