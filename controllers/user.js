const User = require("../models/user");

const getAllUsers = async (req, res) => {
    const allUsers = await User.find({})
    return res.json(allUsers);
}

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
}

const patchUserById = async (req, res) => {
    const obj = req.body;
    await User.findByIdAndUpdate(req.params.id, obj)
    return res.json({status: "updated", id: req.params.id})
 }

 const deleteUserById = async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: 'deleted', id: req.params.id});
 }

 const postUserById = async (req, res) => {
    const body = req.body;
    //console.log(body);
   
    await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender
    })

    return res.status(201).json({msg: 'success'})
}

module.exports = {
    getAllUsers,
    getUserById,
    patchUserById,
    deleteUserById,
    postUserById
}