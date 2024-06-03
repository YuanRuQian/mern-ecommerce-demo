import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { useAppSelector } from "../hook";
import { getUsersAsync } from "../slice/userSlice";

const Users = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useAppSelector((state) => state.user.users);

    useEffect(() => {
        dispatch(getUsersAsync());
    }, [dispatch]);

    return (
        <div>
            {users.map((user) => (
                <div key={user._id}>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
};

export default Users;
