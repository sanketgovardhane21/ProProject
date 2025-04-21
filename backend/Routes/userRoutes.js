const { register, login, protected} = require("../Controller/userController")

const router = require("express").Router()

router.post("/register", register)

router.post("/login", login)

router.get("/protected", protected)

module.exports = router