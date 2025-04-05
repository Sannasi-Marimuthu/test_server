import express from 'express'
import { createPost, deletePost, getPost, getSinglePost, updatePost } from '../controller/postController.js'
const router = express.Router()

 router.get("/posts",getPost)
 router.post("/createpost", createPost)
 router.get("/post/:id", getSinglePost)
 router.put('/updatepost/:id', updatePost);
 router.delete("/deletepost/:id", deletePost)


 export default router;