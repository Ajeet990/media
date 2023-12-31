import { db } from "../connect.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"


export const login = (req, res) => {
    const q = "select * from users where username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(404).json("No user found")
        const verifyPassword = bcrypt.compareSync(req.body.password, data[0].password)
        if (!verifyPassword) return res.status(400).json("Username or password wrong.")

        const {password, ...others} = data[0]
        const token = jwt.sign({id:data[0].id}, "secret_key")
        res.cookie('accessToken', token, {
            httpOnly:true
        }).status(200).json(others)
    })

}
export const register = (req, res) => {
    // Check if user already exists.
    const q = "select * from users where username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) return res.status(409).json("User already exist")
        
        //Create new user with hashed password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        const inserQuery = "insert into users (username, email, password, name) value (?)"
        const params = [req.body.username, req.body.email, hashedPassword, req.body.name]
        db.query(inserQuery, [params], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("user created successfully")
        })
    })
}
export const logout = (req, res) => {
    res.clearCookie('accessToken',{
        secure:true,
        sameSite:'none'
    }).status(200).json("User logged out")
}