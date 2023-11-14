import React, { useState } from 'react';
import { adminSess } from '../../util';
const userContext = React.createContext();


export const UserStore = props => {
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const [session, setSession] = useState(adminSess);
    const [username, setUsername] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [userId, setUserId] = useState('');
    const [activeMyTask, setActiveMyTask] = useState(false);
    const [userPhoto, setUserPhoto] = useState("");
    const [position, setPosition] = useState("");
    const [sessionUserId, setSessionUserId] = useState("");

    return (
        <userContext.Provider
            value={[
                isLoggedIn, setIsloggedIn,
                session, setSession,
                username, setUsername,
                isChanged, setIsChanged,
                userId, setUserId,
                activeMyTask, setActiveMyTask,
                userPhoto, setUserPhoto,
                position, setPosition,
                sessionUserId, setSessionUserId
            ]}>
            {props.children}
        </userContext.Provider>
    )
};

export default userContext;