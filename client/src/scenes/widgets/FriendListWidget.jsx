import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
 

const FriendListWidget = ({ userId }) => {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    
    const {palette} = useTheme();
    const primaryLight = palette.primary.light;
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const getFriends = async () => {
        const response = await fetch(
            `http://localhost:3001/user/${userId}/friends`,
            {
                method: 'GET',
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        const data = await response.json();
        dispatch(setFriends({friends: data}));
    }

    useEffect(() => {
        getFriends();
    },[]) //eslint-disable-line react-hooks/exhaustive-deps


  return (
    <WidgetWrapper>

        <Typography color={dark} variant="h5" fontWeight='500' sx={{mb:'1.5rem'}}>
            Friend list
        </Typography>

        <Box display='flex' flexDirection='column' gap='1.5rem'>
            {friends.map((friend) => {
                <Friend
                    key={friend._id}
                    friendId={friend._id}
                    name={`${friend.firstName} ${friend.lastName}`}
                    subtitle={friend.occupation}
                    userPicturePath={friend.picturePath}
                />

            })}
        </Box>

    </WidgetWrapper>
  )
}

export default FriendListWidget