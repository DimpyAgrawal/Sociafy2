const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = mongoose.model('USER')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
const authentication = require('../middleware/middleware')


 
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post("/register", async (req, res) => {
    console.log("register"); 
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.send({ error: "Fill Complete details" })
    }
    console.log(name + " " + email + " " + password);

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.json({ error: "User Exists" });
        }
        const response = await User.create({
            name,
            email,
            password: encryptedPassword
        });
        return res.json({ success: "User Registered Successfully" });
        // res.send({ status: "Data Save Succesfully" });
    } catch (error) {
        res.status(400).send({ message: error });
    }
});

router.post("/loginUser", async (req, res) => {
    console.log("login");
    const { email, password } = req.body;

    console.log(email + " " + password);

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    console.log(user);
    if (await bcrypt.compare(password, user.password)) {
        console.log(user);
        const token = jwt.sign({email: user.email,name: user.name, id:user._id}, process.env.JWT_SECRET)
        if (res.status(201)) {
            return res.json({ status: "ok", message: "Login Successfully", data: token, user:user });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid Authentication" });
})

router.get('/getProfiteData/:id', authentication, async (req, res) => {
    const { id } = req.params;
    console.log("get profile "+id);
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});






router.put('/setImageToDB', authentication, async (req, res) => {
  console.log('Profile image API ' +req.body.pic+" ");
  
  try {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, {
      $set: { Photo: req.body.pic }
    }, { new: true }); 
    
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    // console.log('User ID:', req.user._id);

    return res.status(200).json({ message: 'Profile image updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile image:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;


