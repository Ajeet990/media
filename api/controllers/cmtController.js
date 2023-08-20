import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getComments = (req, res) => {
    const q = `SELECT c.*, u.id As userId, u.name, u.profilePic
    from comments as c
    inner join users as u on u.id = c.commenterUserId
    WHERE c.postId = ?;`;
    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const addComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Please log in first...")
    jwt.verify(token, 'secret_key', (err, userInfo) => {
        if (err) return res.status(403).json("Token not verified")

        const q = "insert into comments (`cmt`, `commenterUserId`, `postId`, `createdAt`) VALUES (?)";
        const values = [
            req.body.comment,
            userInfo.id,
            req.body.postId,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.status(200).json("Comment added")
        })
    })
}