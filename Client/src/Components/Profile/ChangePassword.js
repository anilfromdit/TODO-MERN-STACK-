import React, { useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import './changePassword.css'
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockIcon from "@mui/icons-material/LockRounded";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { message } from 'antd';
const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const updatePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.put(
            `/api/profile/updatePassword`,
            { oldPassword: oldPassword, newPassword: newPassword, confirmPassword: confirmNewPassword },
            config
        ).then((res) => message.success("Password successfully updated")).catch((err) => { console.log(err) })
        setLoading(false)



    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Change Password</h2>
                            <form
                                className="updatePasswordForm"
                                encType="multipart-form-data"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="loginPassword">
                                    <VpnKeyIcon />
                                    <input
                                        type="password"
                                        placeholder="Enter Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="Enter New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        required
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Change"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ChangePassword