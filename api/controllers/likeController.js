import { db } from "../connect.js";
import jwt from "jsonwebtoken";


export const getLikes = (req, res) => {
    const q = "select userId from likes where postId = ?"
    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data.map(like=>like.userId))
    })
}

export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Please log in first...")
    jwt.verify(token, 'secret_key', (err, userInfo) => {
        if (err) return res.status(403).json("Token not verified")

        const q = "insert into likes (`userId`, `postId`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.postId
        ]
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.status(200).json("Post has been liked")
        })
    })
}

export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Please log in first...")
    jwt.verify(token, 'secret_key', (err, userInfo) => {
        if (err) return res.status(403).json("Token not verified")

        const q = "delete from likes where `userId` = ? AND `postId` = ?";
        db.query(q, [userInfo.id, req.query.postId], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.status(200).json("Like removed from post.")
        })
    })
}