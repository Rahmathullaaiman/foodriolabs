const users = require('../SchemaModels/userschema');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Create transporter object outside the handler function
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rahmathullaaiman@gmail.com',
        pass: 'agre uwao yvyi nory'
    }
});

// Function to generate a random OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
}



//register
exports.register = async (req, res) => {
  try {
      const { username, email, password } = req.body;
      const userType = req.body.userType || 'user';
      const existingUser = await users.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
      }

      const otp = generateOTP(); 
      const user = new users({ username, profile: "", email, password, userType, otp }); 
      await user.save();

      // Send verification email with OTP
      const mailOptions = {
          from: 'rahmathullaaiman@gmail.com',
          to: email,
          subject: 'Your OTP for verification',
          text: `Your OTP is: ${otp}` 
      };
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');

      res.status(200).json(user);
  } catch (error) {
      res.status(500).json(error);
  }
};


//verify otp
exports.verifyOTP = async (req, res) => {
  try {
      const { otp } = req.body;
      const user = await users.findOne({ otp });

      if (!user) {
          return res.status(400).json({ error: 'Invalid OTP' });
      }

      // Update user account status as verified
      user.verified = true;
      await user.save();

      res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
      res.status(500).json(error);
  }
};

//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email });

        // Check if user exists and password matches
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if the user is blocked
        if (user.blocked) {
            return res.status(401).json({ error: 'Your account has been blocked. Please contact support.' });
        }

        let userType = 'user';
        if (user.userType === 'admin') {
            userType = 'admin';
        }

        // Generate token
        const token = jwt.sign({ userId: user._id, userType }, 'supersecretkey');

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json(error);
    }
};

//change the user into an adminuser or change into user again
exports.edituser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await users.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        let updatedUserType;
     if (user.userType === 'admin') {
            updatedUserType = 'user';
    } else {
         updatedUserType = 'admin';
  }
  const updateuser = await users.findByIdAndUpdate(id, { userType: updatedUserType }, { new: true });
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(500).json(error);
    }
}

//block user
exports.blockuser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await users.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Toggle the 'blocked' field
        user.blocked = !user.blocked;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}





// Retrieve all users with userType 'user'
exports.getAllUsers = async (req, res) => {
    try {
        const getuser = await users.find({ userType: 'user' });
        res.status(200).json(getuser);
    } catch (error) {
        res.status(500).json(error);
    }
}


// Retrieve all users with userType 'admin'
exports.getAlladminUsers = async (req, res) => {
    try {
        const getuser = await users.find({ userType: 'admin' });
        res.status(200).json(getuser);
    } catch (error) {
        res.status(500).json(error);
    }
}

//user profile editing
exports.editprofile = async(req,res)=>{
    const {id} = req.params
    const {username,email,password} = req.body
    const uploadedimage = req.file?req.file.filename:profile
  
    try {
        const updateWorker = await users.findByIdAndUpdate({_id:id},{username,profile:uploadedimage,email,password
        },{new:true})
  
        await updateWorker.save()
        res.status(200).json(updateWorker)
    } catch (error) {
        res.status(401).json(error)
    }
  }

