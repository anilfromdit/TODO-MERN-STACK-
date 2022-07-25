import React, { useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';

import MailIcon from "@mui/icons-material/MailRounded";
import FaceIcon from "@mui/icons-material/Face";
import './EditProfile.css'
import { message } from 'antd';

const EditAbleProfile = ({ oldUser }) => {


    const [name, setName] = useState(oldUser.name);
    const [email, setEmail] = useState(oldUser.email);
    const [username, setUserName] = useState(oldUser.username);

    const [loading, setLoading] = useState(false);

    const updateProfile = async (e) => {
        e.preventDefault();
        console.log(name)
        setLoading(true)
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.put(
            `/api/profile/update`,
            { name: name, email: email, username: username },
            config
        ).then((res) => message.success("Profile successfully updated")).catch((err) => { console.log(err) })
        setLoading(false)

    }

    return (
        <>{loading ? <Loader /> :
            <div className="updateProfile">
                <div className="updateProfileBox">
                    <h2 className="updateProfileHeading">Update Profile</h2>

                    <form
                        className="updateProfileForm"
                        encType="multipart-form-data"
                        onSubmit={updateProfile}
                    >
                        <div className="updateProfileName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="updateProfileEmail">
                            <MailIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="signUpContactNumber signUpEmail">
                            <FaceIcon />
                            <input
                                type="text"
                                required
                                placeholder="User Name"
                                name="username"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>


                        <input
                            type="submit"
                            value="Update"
                            className="updateProfileBtn"
                        />
                    </form>
                </div>
            </div>

        }
        </>

    )
}

export default EditAbleProfile