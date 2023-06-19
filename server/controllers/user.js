import User from "../models/User.js";


let getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user); 
    } catch (error) {
        res.status(404).json({'Message in getUser block: ': error.message}) ; 
    }
    
}

let getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )

        // console.log(`\n\nFriends of ${user}: ${friends} \t  \n\n`); //working 
        
        const formattedFriends = friends.map(
        
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
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
        // console.log(`UserId ${id} Friend's Id ${friendId}`);
        const user = await User.findById(id);
        // console.log('\n*************************************\n\User who is adding or removing a friend:',user); 
        const friend = await User.findById(friendId);
        // console.log('\n\nFriend to be added or removed:',friend);  

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((currentId) => currentId!== friendId);
            friend.friends = friend.friends.filter((currentId) => currentId!== id);
            console.log('\nVoila\n');
        }else{
            let noOfFriends = user.friends.push(friendId);
            // console.log('\nno of friends i have:',noOfFriends);  
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((friend) => {
                
               let data = User.findById(friend);
            //    console.log('\nindividual friend data:',data); 
               return data;
            })
        )


    //    console.log(`\n\nFriends: ${typeof friends}\n\n`); 

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        )

        res.status(200).json({formattedFriends});

    } catch (error) {
        console.log(`\n\nError Message in addremove block: ${error.message} \n;)`);
        res.status(404).json({'Message in addremove block: ': error.message}) ;  
    }
}

export {getUser , getUserFriends, addRemoveFriend};