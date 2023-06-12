
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js"; 

const register = async (req, res) => {
    console.log("req.body: ",req.body);
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            occupation,
            friends
        } = req.body;


        // Encrypting password to be saved in database
        const salt = await bcrypt.genSalt();

        const passwordHash = await bcrypt.hash(password, salt);

        // Payload 
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            location,
            occupation,
            friends,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        // saving it to db 
        const savedUser = newUser.save();

        res.status(201).json(savedUser);


    } catch (error) {
        res.status(500).json({'Register error': error.message});   
    }
}

const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({email: email});
        if(!user) return res.status(400).json({msg: 'User doesn\'t exists '});

        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user});
        

    } catch (error) {
        res.status(500).json({'login error': error.message});
    }
}


export {register, login};