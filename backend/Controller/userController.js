const userModel = require("../Model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async(req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    if(!user)
        return res.status(400).json({message: "USER NOT AVAILABLE", success:false})
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch)
        return res.status(400).json({message: "INCORRECT PASSWORD", success:false})
    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    )
    res.json({message:"User logged in",token})
}

const register = async(req, res) => {
    const {username, email, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel({username, email, password:hashedPassword})
        await user.save()
        res.status(201).json({message: "USER CREATED"})
        
    } catch (error) {
        console.error(error)
        res.status(400).json({
            err:"USER ALREADY EXISTS OR INVALID DATA"
        })
    }
}

const protected = (req, res) => {
    const token = req.headers["authorization"]
    if (!token) 
        return res.status(401).json({error: "ACCESS DENIED"})
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        res.json({
            message:"Protected Data",
            userId: decoded.id
        })
    } catch{
        res.status(400).json({error: "INVALID TOKEN"})
    }
}

module.exports = {
    login,
    register,
    protected
}