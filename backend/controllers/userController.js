const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/usersModel");
const sendToken = require("../utils/jwtToken");
const handleAsync = require("../middleware/catchAsyncError");
// Creating a user account
exports.registerUser = handleAsync(async (req, res, next) => {


    const { name, email, password, username } = req.body;
    try {
        const newUser = await User.create({
            name,
            email,
            password,
            username
        })
        sendToken(newUser, 201, res)
    }
    catch (err) {
        res.send({ success: false, message: err.message })
    }

});

exports.loginUser = handleAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Email and Password Required"));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
});

exports.logout = handleAsync(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged out",
    });
});


//Get user details
exports.getUserDetails = handleAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

//Update user password
exports.updatePassword = handleAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
            new ErrorHandler("Password and Confirm Password doesn't match", 400)
        );
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

//Update user profile
exports.updateProfile = handleAsync(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        user
    });
});
