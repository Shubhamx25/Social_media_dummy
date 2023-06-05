import User from "../models/User.js";


let getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.getUser(200).json(user); 
    } catch (error) {
        res.status(404).json({'Message in getUser block: ': error.message}) ; 
    }
    
}

let getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        
        const friends = await Promise.all(
            user.friends.map((id) => {
                User.findById(id)
            })
        )

        const formattedFriends = friends.map(
            ({_id, firstNmae, lastName, occupation, location, picturePath}) => {
                return {_id, firstNmae, lastName, occupation, location, picturePath};
            }
        )

        res.status(200).json({formattedFriends});

    } catch (error) {
        res.status(404).json({'Message in getUserFriend block: ': error.message}) ; 
    }
}


// routes to update friends 
let addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await user.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await User.save();
        await friend.save();

        const formattedFriends = friends.map(
            ({_id, firstNmae, lastName, occupation, location, picturePath}) => {
                return {_id, firstNmae, lastName, occupation, location, picturePath};
            }
        )

        res.status(200).json({formattedFriends});

    } catch (error) {
        res.status(404).json({'Message in getUserFriend block: ': error.message}) ;  
    }
}

export {getUser , getUserFriends, addRemoveFriend};