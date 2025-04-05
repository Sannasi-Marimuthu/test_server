import Post from "../model/postModel.js";

//get post
const getPost = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//create post
const createPost = async (req, res) => {
  const { title, description } = req.body;
  try {
    const post = await Post.create({ title, description });
    res.status(201).json({ message: "post created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//get single post
const getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404);
      return res.status(404).json({ message: "Post Not Found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    res.status(500).json({ message: error.message });
  }
};

//update post
const updatePost = async (req, res) => {
const { id} = req.params;
try {
    const post = await Post.findById(id);
    if(!post) {
        res.status(404);
        return res.status(404).json({message:"Post Not Found"});
    } 
    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    const updatePost = await post.save();
    res.status(200).json({
        id:updatePost._id,
        title: updatePost.title,
        description: updatePost.description,
    });
} catch (error) {
    if(error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(400).json({message: "invalid post id"})
    }
    res.status(500).json({message:message.error})
}
};

//delete post
const deletePost = async (req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        if(!post) {
            return res.status(404).json({message:"Post Not Found"});
        }
        res.status(200).json({message:"Post deleted successfully"})
    } catch (error) {
        if(error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({message: "invalid post id"})
        }
        res.status(500).json({message:message.error})
    }
};

export { createPost, getPost, updatePost, getSinglePost, deletePost };
