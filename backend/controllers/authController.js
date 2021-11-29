const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendTokenResponse = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');


exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/kccvibpsuiusmwfepb3m',
            url: 'https://i.pravatar.cc/300?u=',
        }
    });

    sendTokenResponse(user, 200, res);

});


exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please provide email and password', 400));
    }

    const user = await User.findOne({
        email
    }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new ErrorHandler('Incorrect email or password', 401));
    }

    sendTokenResponse(user, 200, res);

});


// Forgot Password   =>  /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const { email } = req.body;

    if (!email) {
        return next(new ErrorHandler('Please provide email', 400));
    }

    const user = await User.findOne({
        email
    });

    if (!user) {
        return next(new ErrorHandler('User with this email does not exist', 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: \n\n${resetURL}\n\nIf you didn't forget your password, please ignore this email.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'JFOURJENAS Password Recovery (valid for 10 minutes)',
            message
        });

        res.status(200).json({
            status: 'success',
            message: `Email sent to: ${user.email}`
        });

    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler('There was an error sending the email. Try again later', 500));
    }

});


// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {
            $gt: Date.now()
        }
    });

    if (!user) {
        return next(new ErrorHandler('Token is invalid or has expired', 400));
    }

    if (req.body.password !== req.body.passwordConfirm) {
        return next(new ErrorHandler('Passwords do not match', 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);

});


// User Profile => /api/v1/user/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        status: 'success',
        user
    });

});


// Update User Profile => /api/v1/user/me/update
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        status: 'success',
        user
    });


});


// Update Password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new ErrorHandler('Your current password is incorrect', 401));
    }

    if (req.body.password !== req.body.passwordConfirm) {
        return next(new ErrorHandler('Passwords do not match', 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    sendTokenResponse(user, 200, res);

});


// Logout User => /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {

    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
    });

});


/**
 * Admin Routes
 */


// All Users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        status: 'success',
        users
    });

});


// Get User Details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        user
    });

});


// Update User => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    if (!user) {
        return next(new ErrorHandler(`User not found id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        user
    });

});


// Delete User => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found id: ${req.params.id}`, 404));
    }

    await user.remove();

    res.status(200).json({
        success: true,
        status: 'success'
    });

});