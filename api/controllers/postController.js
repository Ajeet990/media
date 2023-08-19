import { db } from "../connect.js"
import jwt from 'jsonwebtoken'
import moment from "moment";

export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Please log in first...")
    jwt.verify(token, 'secret_key', (err, userDetails) => {
        if (err) return res.status(403).json("Token not verified")

        const q = `select p.*, u.id as userId, u.name, u.profilePic
                    from posts as p
                    inner join users as u on u.id = p.userId
                    left join relationships as r on p.userId = r.followedUserId
                    where p.userId = ? OR r.followerUserId = ?
                    order by p.createdAt DESC`
        db.query(q, [userDetails.id, userDetails.id], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
}


export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Please log in first...")
    jwt.verify(token, 'secret_key', (err, userInfo) => {
        if (err) return res.status(403).json("Token not verified")

        const q = "insert into posts (`description`, `img`, `userId`, `createdAt`) VALUES (?)";
        const values = [
            req.body.description,
            req.body.img,
            userInfo.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.status(200).json("Post has been created")
        })
    })
}