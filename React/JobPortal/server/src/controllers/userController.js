import User from "../models/userModel.js";

export const userRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, state, password, address } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !state ||
      !password ||
      !address
    ) {
      console.log("All feilds Required");
      res.status(400).json({ message: "All feilds Required" });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Email already exist");
      res.status(409).json({ message: "Email already exis" });
      return;
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      state,
      password,
      address,
    });

    console.log(newUser);

    res.status(200).json({ message: "User Registration Successfull" });
  } catch (error) {
    console.log(error);
  }
};

export const userLogin =async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("All feilds Required");
      res.status(400).json({ message: "All feilds Required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.password !== password) {
      console.log("Invalid Password");
      res.status(401).json({ message: "Invalid Password" });
      return;
    }
    
    res.status(200).json({ message: "User Login Successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userLogout = (req, res) => {
  res.json({ message: "User Logout Sucessfully" });
};
