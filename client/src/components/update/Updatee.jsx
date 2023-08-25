import React, { useState } from 'react'
import './update.scss'
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Updatee = ({setOpenUpdate, user}) => {
  const [profile, setProfile] = useState(null)
  const [cover, setCover] = useState(null)
  const [text, setText] = useState({
    name:'',
    city:'',
    website:''
  })

  const upload = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await makeRequest.post('/upload', formData);
      return res.data
    } catch (err) {

    }
  }

  const handleChange = (e) => {
    setText({...text, [e.target.name] : e.target.value})
  }

  // const { currentUser } = useContext(AuthContext)

  const queryClient = new useQueryClient()
  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put('/users', user)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;
    
    coverUrl = cover ? await upload(cover) : user.coverPic
    profileUrl = profile ? await upload(profile) : user.profilePic
    mutation.mutate({ ...text, profilePic:profileUrl, coverPic:coverUrl })
    setOpenUpdate(false)
  }
  return (
    <div className='update'>
      Updatee
      <form>
        <input type="file" onChange={(e) => setCover(e.target.files[0])}/>
        <input type="file" onChange={(e) => setProfile(e.target.files[0])}/>
        <input type="text" name='name' onChange={handleChange} />
        <input type="text" name='city' onChange={handleChange} />
        <input type="text" name='website' onChange={handleChange} />
        <button onClick={handleClick}>Update</button>
      </form>
      <button onClick={()=>setOpenUpdate(false)}>X</button>
      </div>
  )
}

export default Updatee