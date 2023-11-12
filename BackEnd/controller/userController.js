import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

//import { createToken } from "../helper/authHelper.js";
// User Signup Controller

const jwtSecretKey = process.env.JWT_TOKEN_KEY;

export const signUp = async (request, response) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = request.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return response.status(400).send({
                message: 'Please provide all required fields',
                alert: 'error'
            });
        }

        if (password !== confirmPassword) {
            return response.status(400).send({
                message: 'Passwords do not match',
                alert: 'error'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return response.status(400).send({
                message: 'Email is already registered',
                alert: 'email'
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            confirmPassword,
        }

        const user = await User.create(newUser);

        return response.status(201).send({
            user,
            message: 'Successfully signed up',
            alert: 'success'
        });


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message, alert: 'error' });
    }
};

// User Login Controller
const createToken = (userId) => {
    return jwt.sign({ userId }, 'jwtSecretKey', { expiresIn: '1h' });
  };
  
  export const login = async (request, response) => {
    try {
      const { email, password } = request.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return response.status(401).json({
          message: 'Invalid email or password',
          alert: false,
        });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return response.status(401).json({
          message: 'Invalid email or password',
          alert: false,
        });
      }
  
      const token = createToken(user._id);
      response.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
  
      return response.status(200).json({
        user,
        message: 'Login is successful',
        alert: true,
        token,
      });
    } catch (error) {
      console.error(error.message);
      response.status(500).send({
        message: 'Internal server error',
        alert: false,
      });
    }
  };

  //import jwt from 'jsonwebtoken';

  export const logout = (request, response) => {
    const jwtToken = request.headers.authorization;
  
    if (!jwtToken) {
      return response.status(400).json({ message: 'Not logged in' });
    }
  
    // You may want to add token verification logic here to ensure it's valid
  
    response.cookie('jwt', '', { maxAge: 0 });
    response.status(200).json({ message: 'User logged out successfully' });
  };
  
  
// Get User by ID Controller
export const getUserById = async (request, response) => {
    try {
        const userId = request.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                alert: false
            });
        }

        return response.status(200).json({
            user,
            message: 'User found',
            alert: true
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: error.message,
            alert: false
        });
    }
};

// Edit User by ID Controller
export const editUser = async (request, response) => {
    try {
        const userId = request.params.id;

        const updatedUser = await User.findByIdAndUpdate(userId, request.body, { new: true });

        if (!updatedUser) {
            return response.status(404).json({
                message: "User not found",
                alert: false
            });
        }

        return response.status(200).json({
            user: updatedUser,
            message: 'User updated successfully',
            alert: true
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: error.message,
            alert: false
        });
    }
};

// Delete User by ID Controller
export const deleteUser = async (request, response) => {
    try {
        const userId = request.params.id;

        const isUserDeleted = await User.findByIdAndDelete(userId);

        if (!isUserDeleted) {
            return response.status(404).json({
                message: "User not found",
                alert: false
            });
        }

        return response.status(200).json({
            message: 'User deleted successfully',
            alert: true
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: error.message,
            alert: false
        });
    }
};
// Add this controller method
export const getUserItems = async (req, res) => {
    try {
      // Retrieve the user's ID from the token
      const userId = req.userId;
  
      // Query the database to get the user's added items
      const userItems = await MusicInstrument.find({ user: userId });
  
      res.status(200).json(userItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  