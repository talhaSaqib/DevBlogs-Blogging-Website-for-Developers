const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator/check');

const User = require('../../models/User')

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get('/', auth,
async (req, res) => 
{
    try 
    {
        const user = await User.findById(req.user.id).select('-password');  // Exclude password
        res.json(user);
    } 
    catch (error) 
    {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', 
[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
async (req, res) => 
{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {email, password} = req.body;

    try 
    {
        // See if user exists
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        
        // Verify credentials
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        
        // Return jsonwebtoken
        sendJsonWebToken(user, res);

    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send('Server error');
    }

    
});


function sendJsonWebToken(user, res)
{
    const payload = 
        {
            user: { id: user.id }
        }

        jwt.sign(payload, config.get('jwtToken'), {expiresIn: 360000},
        (err, token) =>
        {
            if (err) throw err;
            res.json({ token });
        });
}




module.exports = router

