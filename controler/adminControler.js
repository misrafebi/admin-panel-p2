const adminModel = require('../model/adminModel')
const userModel = require('../model/userModel')
const loadLogin = (req,res) =>{
    res.render('admin/login')
}

const login = async (req,res) => {
    try{
        const {username, password }= req.body


        const admin = await adminModel.findOne({username})

        if(!admin) return res.render('admin/login',{errorMessage: 'Admin does not exist'})

        if(admin.password != password) return res.render('admin/login',{errorMessage:'Incorrect Password'})
        req.session.admin = true

        res.redirect('/admin/dashboard')

    }catch(error){
        console.error('Error during registration:', error);
        res.status(500).render('admin/login', { errorMessage: 'Internal Server Error' });
    }
}

const loadDashboard = async (req,res) =>{
    try{
        const admin = req.session.admin

        if(!admin) return res.redirect('/admin/login')

        const users = await userModel.find({});

        res.render('admin/dashboard', { users });
        console.log(users);

    }catch(error){
        console.error('Error during registration:', error);
        res.status(500).render('admin/login', { errorMessage: 'Internal Server Error' });
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out');
        }
        res.redirect('/admin/login');
    });
};

module.exports = {loadLogin,login, loadDashboard, logout}