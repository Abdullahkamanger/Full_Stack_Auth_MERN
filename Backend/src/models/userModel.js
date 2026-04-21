import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true, // Removes accidental whitespace
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: [true, "Email already exists"],
      lowercase: true, // Always store email in lowercase to avoid login issues
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, //  Automatically excludes password from "GET" queries
      validate: {
        validator: function (value) {
          if (!this.isModified("password")) return true;
          // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value,
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // Only hash if password is new or modified
  try {
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10; // Use environment variable for salt rounds, default to 10
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  
  } catch (err) {
    console.error("Error hashing password:", err);
   throw new Error(err);
  }
});

// the below method will be available on evry sinle instance of user model

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.genToken = async function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET || "default_jwt_secret_key",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  );
};

const User = mongoose.model("User", userSchema);
export default User;
