import User from "@/models/user-model";

const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.log("Error occurs in getUserByEmail: ", error);
    return null;
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log("Error occurs in getUserById: ", error);
    return null;
  }
};

export { getUserByEmail, getUserById };
