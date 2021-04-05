import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import { httpStatus } from '../utils/constants.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(httpStatus.HTTP_400_BAD_REQUEST);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(httpStatus.HTTP_201_CREATED).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(httpStatus.HTTP_400_BAD_REQUEST);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(httpStatus.HTTP_200_OK).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(httpStatus.HTTP_401_UNAUTHORIZED);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get all users
// @route   GET /api/users/login
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('_id name email isAdmin password');

  res.status(httpStatus.HTTP_200_OK).json({
    users,
    totalItems: users.length
  });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  // get all user info, except password and __v
  const user = await User.findById(req.params.id).select('-password -__v');

  if (user) {
    res.status(httpStatus.HTTP_200_OK).json(user);
  } else {
    res.status(httpStatus.HTTP_404_NOT_FOUND);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.idAdmin = req.body.idAdmin || user.idAdmin;

    const updatedUser = await user.save();

    res.status(httpStatus.HTTP_200_OK).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(httpStatus.HTTP_404_NOT_FOUND);
    throw new Error('User not found');
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.status(httpStatus.HTTP_200_OK).json({ message: 'User removed' });
  } else {
    res.status(httpStatus.HTTP_404_NOT_FOUND);
    throw new Error('User not found');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('_id name email isAdmin');

  if (user) {
    res.status(httpStatus.HTTP_200_OK).json(user);
  } else {
    res.status(httpStatus.HTTP_404_NOT_FOUND);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(httpStatus.HTTP_200_OK).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(httpStatus.HTTP_404_NOT_FOUND);
    throw new Error('User not found');
  }
});

export { registerUser, authUser, getUsers, getUserById, updateUser, deleteUser, getUserProfile, updateUserProfile };
