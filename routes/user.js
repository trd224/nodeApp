const express = require("express");
const {getAllUsers, getUserById, patchUserById, deleteUserById, postUserById} = require("../controllers/user")
const router = express.Router();

router.get("/", getAllUsers)

router.route("/:id")
    .get(getUserById)
    .patch(patchUserById)
    .delete(deleteUserById)

router.post("/", postUserById)

module.exports = router;
