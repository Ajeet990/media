import { useContext,useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../axios.js";
import moment from "moment";


const Comments = ({postId}) => {
  const queryClient = new useQueryClient()
  const [comment, setComment] = useState("")
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ['comments'],
    queryFn: () =>
      makeRequest.get('/cmt?postId='+postId).then((res) => {
        return res.data;
      })
  })

  const mutation = useMutation({
    mutationFn:(newComment) => {
      return makeRequest.post('/cmt/addCmt', newComment)
    },
    onSuccess:() => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    }
  })

  const postComment = (e) => {
    e.preventDefault()
    // console.log("cmt",comment)
    mutation.mutate({comment, postId})
    setComment("")
  }


  
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" value={comment} placeholder="write a comment" onChange={(e) => setComment(e.target.value)}/>
        <button onClick={postComment}>Send</button>
      </div>
      {error ? "Something went wrong" : isLoading ? "Comments loading please wait" : data.map((comment) => (
        <div className="comment">
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.cmt}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
