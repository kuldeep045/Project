import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import {User} from '../models/User.model.js'
import ApiResponse from '../utils/ApiResponse.js'
import uploadOnCloud from '../utils/cloudinary.js'

const userregister = asyncHandler(async (req,res) =>{

    

    //get user details
    const {userName, email, fullName, password, role} = req.body;


    //validate the user details
    if(userName?.trim() === "")throw new ApiError(400, 'UserName required')
        if (!email || email.trim() === "") throw new ApiError(400, 'Email required');
    if(fullName?.trim() === "")throw new ApiError(400, 'fullName required')
    if(password?.trim() === "" || password.length < 8 )throw new ApiError(400, 'password must be 8digit')


    //check if the user already exists
    const existingUser = await User.findOne({$or:[{userName}, {email}]})
    if(existingUser)throw new ApiError(409, "user already exist")

    const profilePath = req.files?.profile?.[0]?.path
    const coverPath = req.files?.cover?.[0]?.path
    
        //upload on cloudinary
        const profile = await uploadOnCloud(profilePath)
        const cover = await uploadOnCloud(coverPath)
        



    //create user object
    const newUser =  new User({
        userName: userName.toLowerCase(),
        email,
        fullName,
        role,
        profile: profile.url || "",
        cover: cover.url || "",
        password
    })

    await newUser.save();
    
git
    

    // remove pw
    const response =  await User.findById(newUser._id).select('-password')

    //check for user creation
    if(!response)throw new Error(500, "Can't create user server error!!!")
    



        //send response
        return res.status(201)
        .json(new ApiResponse(201, "User created successfylly", response))
    

})

export default userregister