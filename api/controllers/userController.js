import { db } from "../connect.js"
import jwt from 'jsonwebtoken'


export const getUser = (req, res) => {
    const userId = req.params.userId
    const q = "select * from users where id = ?"
    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        const {password, ...info} = data[0]
        return res.status(200).json(info)
    })
}
export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Please log in first...")
    jwt.verify(token, 'secret_key', (err, userInfo) => {
        if (err) return res.status(403).json("Token not verified")
        const q = "UPDATE users set `name` = ?, `city` = ?, `website` = ?, `coverPic` = ?, `profilePic` = ? WHERE id = ?"
    db.query(q, [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id
    ], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data) return res.status(200).json("Updated successfully")
        res.status(403).json("You can update only your data")
    })
    
    })
}
