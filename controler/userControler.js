const userSchema = require('../model/userModel')

const registerUser = async (req,res)=>{
    try{
        const {username, password} = req.body
        
        const user = await userSchema.findOne({username})
        if(user) return res.render('user/register',{errorMessage:'User already exists'})

        const newUser = new userSchema({
            username, password
        })

        await newUser.save()
        res.render('user/login',{successMessage:'User Created Successfully'})
    }catch(error){
        console.error('Error during registration:', error);
        res.status(500).render('user/register', { errorMessage: 'Internal Server Error' });
    }
}

const login = async (req,res)=>{
    try{
        const {username, password} = req.body;

        
        const user = await userSchema.findOne({username})

        if(!user) return res.render('user/login',{ errorMessage: 'User does not exist'})
        
        if(user.password != password) return res.render('user/login',{errorMessage:'Incorrect Password'})
        
        req.session.user = true

        res.render('user/home',{successMessage:'LoginSuccessful'})
    }catch(error){
        console.error('Error during registration:', error);
        res.status(500).render('user/login', { errorMessage: 'Internal Server Error' });
    }
}
 
const loadLogin = (req,res) =>{
    res.render('user/login')
}

const loadRegister = (req,res) =>{
    res.render('user/register')

    
}


const loadHome = (req,res) => {
    res.render('user/home')
}

// const logout = (req,res) =>{
//     req.session.user = null
//     res.redirect('user/login')
// }
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/user/home'); // Redirect back to home if session destruction fails
        }
        res.redirect('/user/login'); // Redirect to login page after successful logout
    });
};

module.exports = {registerUser, loadLogin, loadRegister, login, loadHome, logout}

// const bcrypt = require('bcrypt');
// const userSchema = require('../model/userModel');

// const registerUser = async (req, res) => {
//     try {
//         const { username, password, confirmPassword } = req.body;

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             return res.render('user/register', { errorMessage: 'Passwords do not match' });
//         }

//         // Check if user already exists
//         const user = await userSchema.findOne({ username });
//         if (user) {
//             return res.render('user/register', { errorMessage: 'User already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save the user
//         const newUser = new userSchema({
//             username,
//             password: hashedPassword,
//         });

//         await newUser.save();
//         res.render('user/login', { successMessage: 'User Created Successfully' });
//     } catch (error) {
//         console.error(error);
//         res.render('user/register', { errorMessage: 'Something went wrong. Please try again.' });
//     }
// };

// module.exports = { registerUser };
