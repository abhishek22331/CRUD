const User = require('../userModel/userModel')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const userdb = require('../userModel/userModel')

const userController = {
    Signup: async (req, res) => {
        try {
            const username = req.body.username
            const email = req.body.email
            const password = req.body.password
           
            const nuser = await User.findOne({ email: email })
            if (nuser) {
                return res.status(400).json({ msg: "this user already exist" })
            }
            if (password.length < 6) {
                return res.status(400).json({ msg: "password length should be greater or equal 6 character" })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username: username, email: email, password: hashedPassword
            })

            await newUser.save()
            return res.status(200).json({ msg: "User created successfully" })
           
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ msg: "this user is not exist" })
                
            }
          
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({ msg: "password is incorrect" })
            }
            const token = jwt.sign({user}, 'process.env.SECRET_KEY');
            
      

            return res.status(200).json({msg:"user login successful",token})
            
        } catch (err) {
           
            return res.status(500).json({ msg: err.message })
        }
      
    },
   
    home: async (req, res) => {
        try {
            const user = await User.find()
            return res.status(200).json(user)

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req, res) => {
        const {username} = req.body.user;
        console.log(req.body.user)
        try{

            const updateduser = await User.findOneAndUpdate({_id: req.params.id}, {
                $set: {username},
                
            }, {new: true, useFindAndModify: false})

            res.status(200).json({msg: "Updated a user", updateduser})

       
        }catch(err){
            console.log(err)
        }
    },

    delete:async(req,res)=>{
        try {
            const deleteuser=await User.findByIdAndDelete(req.params.id);
            if(!req.params.id){
                return res.status(400).send();
            }
            res.send(deleteuser);
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
   
}

module.exports = userController;