import postModel from "../models/Post.js";
import User from "../models/User.js";

const createPost = async (req, res) => {
   try {
      const {userId, description, picturePath } = req.body ;
      const user = await User.findById(userId);
      const newPost = new postModel({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: []
      })

      await newPost.save();

      const post =  await postModel.find();

      res.status(201).json(post);

       
   } catch (error) {
      res.status(409).json({'Error in Creating Post':error.message});
   }
}

const getFeedPosts = async (req, res) => {
    try {
       const post = await postModel.find();
       res.status(200).json(post); 
    } catch (error) {
        res.status(409).json({'Error in Creating Post':error.message}); 
    }
}


const getUserPosts = async (req, res) => {  
    try {
        const { userId } = req.params;
        const post = await postModel.find({userId});
        res.status(200).json(post); 
     } catch (error) {
         res.status(409).json({'Error in Creating Post':error.message}); 
     }
}

const likePosts  = async (req, res) => {
    try {
        const { id } = req.params;  //for selecting post to be liked
        const { userId} = req.body; //User linking the post

        const post = await postModel.findById(id);
        const isLiked = post.likes.get(userId); // isliked would be set to boolean value based on it is liked or not

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatedPost = await postModel.findByIdAndUpdate(
            id,
            { likes: post.likes},
            { new: true }
        )

        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(409).json({'Error in Creating Post':error.message});   
    }
}
 



export { createPost, getFeedPosts, getUserPosts,likePosts };