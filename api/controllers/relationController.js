import { db } from "../connect.js";
import jwt from "jsonwebtoken";


export const getRelationships = (req, res) => {
    const q = "select followerUserId from relationships where followedUserId = ?"
    db.query(q, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data.map(relationship=>relationship.followerUserId))
    })
}

export const addRelationship = (req, res) => {
    // console.log("here i am");
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Please log in first...")
    jwt.verify(token, 'secret_key', (err, userDetails) => {
        if (err) return res.status(403).json("Token not verified")

        const q = `insert into relationships (followerUserId, followedUserId) values (?)`
        const values = [
            userDetails.id,
            req.body.userId
        ]
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.status(200).json("followed successfully")
        })
    })
}

export const deleteRelation = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Please log in first...")
    jwt.verify(token, 'secret_key', (err, userInfo) => {
        if (err) return res.status(403).json("Token not verified")

        const q = "delete from relationships where `followerUserId` = ? AND `followedUserId` = ?";
        db.query(q, [userInfo.id, req.query.userId], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.status(200).json("relation removed from user.")
        })
    })
}