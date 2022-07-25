import React from 'react'
import Loader from '../Loader/Loader';
import { Button, Card } from 'antd';
import { EditOutlined, SettingOutlined } from '@ant-design/icons'
import profilePic from '../../images/user.jpg'
import Title from 'antd/lib/typography/Title';
import { Space } from 'antd';
import { useEffect } from 'react';

const Profile = ({ user }) => {

  const headingStyle = {
    margin: "0.2vmax 0"
  }
  return (
    <>
      {!user ?
        <Loader simple /> :
        <>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                {user.name}'s Profile
              </Title>
            }
            bodyStyle={{ padding: 0 }}
            bordered={false}
          >
            <div className="site-card-wrapper">
              <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
                <div className="profileContainer" >

                  <img className="profilePic" src={profilePic} style={{
                    width: "10vmax",
                    height: "10vmax",
                    borderRadius: "100%",
                    margin: "5vmax",
                    marginBottom: " 1vmax",
                  }} />
                  <Title level={4} style={{ margin: "auto 30%" }}>
                    {user.name}
                  </Title>

                  <Title level={4} style={headingStyle}>
                    Name
                  </Title>
                  <Title level={5} style={{ margin: 0 }}>
                    {user.name}
                  </Title>

                  <Title level={4} style={headingStyle}>
                    UserName
                  </Title>
                  <Title level={5} style={{ margin: 0 }}>
                    {user.username}
                  </Title>

                  <Title level={4} style={headingStyle}>
                    Email
                  </Title>
                  <Title level={5} style={{ margin: 0 }}>
                    {user.email}
                  </Title>
                  <div className="buttons" style={{ display: "flex", flexDirection: "column", marginTop: "1vmax", gap: "1vmax", justifyContent: "space-evenly" }}>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => window.location.href = "profile/updateProfile"}  >
                      Edit Profile
                    </Button>
                    <Button type="primary" onClick={() => window.location.href = "profile/changePassword"} icon={<SettingOutlined />}  >
                      Change Password
                    </Button>
                  </div>
                </div>
              </Space>
              <div>

              </div>
            </div>
          </Card>
        </>

      }
    </>)

}

export default Profile