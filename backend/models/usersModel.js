const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [32, "Name Can't Exceed 32 Characters"],
        minLength: [3, "Name should have at least 3 Characters"],
    },
    username: {
        type: String,
        required: [true, "Please Enter Your Username"],
        maxLength: [32, "User Name Can't Exceed 32 Characters"],
        minLength: [3, "User Name should have at least 3 Characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "password should have at least 8 Characters"],
        maxLength: [128, "password cannot exceed 128 characters"],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//verifying password

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
