import React from 'react'
import { useState } from 'react';
import { Button, PageHeader } from 'antd';
import axios from 'axios';
import { message } from 'antd'
import Loader from '../Loader/Loader';
const Navbar = () => {

    const [loading, setLoading] = useState(false)
    const logout = async () => {
        setLoading(true)
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.get(
            `/api/logout`,
            config
        ).then((res) => {
            // setLoading(false)
            console.log(res)
            window.location.href = '/login'
        }).catch(err => message.error(err))

    }
    return (
        <>
            {loading ? <Loader /> :

                <div className="site-page-header-ghost-wrapper">
                    <PageHeader
                        onBack={() => window.location.pathname !== '/' && window.history.back()}
                        title="TODO APP"
                        extra={[
                            <Button key="1" type="primary" onClick={() => { window.location.href = '/profile' }}>
                                Profile
                            </Button>,
                            <Button key="2" onClick={logout}>Logout</Button>,
                        ]}
                    >
                    </PageHeader>
                </div>

            }
        </>
    )
}

export default Navbar