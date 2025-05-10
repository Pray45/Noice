    import User from '../models/user.js'
    import bcrypt from 'bcrypt'
    import jwt from 'jsonwebtoken'

    const createUser = async(req,res) => {
        try {

            const { username, email, password } = req.body

            const hash = await bcrypt.hash(password , 10)
            const create = await User.create({
                username,
                email,
                password: hash
            })

            console.log(create);

            const token = jwt.sign({email} , "devilmaycry")
            res.cookie("token", token)
            res.send(create)
            res.status(200).json({success: "true"});

        } catch (error) {
            console.log(error)
            res.status(400).json({success: false, message: "error in login"})
        }
    }

    const loginUser = async(req,res) => {
        try {

            const { email, password } = req.body

            const user = await User.findOne({email})
            if(!user) res.send("please register first")
            
            const isPassCorrect = await bcrypt.compare(password , user.password)
            
            if(isPassCorrect){
                    const token = jwt.sign({email: user.email} , "devilmaycry")
                    res.cookie("token", token)
                    res.send({email , password})
                    return res.status(200).json({ success: true, message: "Login successful", token });
            }
            else{
                    console.log(error)
                    console.log("something went wrong");
            }

        } catch (error) {
            console.log(error)
            res.status(400).json({success: false , message: "error in login"})
        }
    }
    const logoutUser = (req,res) => {
        res.cookie(token , "")
    }

    export { createUser, loginUser, logoutUser}