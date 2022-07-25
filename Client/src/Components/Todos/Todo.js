import React, { useState, useEffect } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Row, Col, Form, Input, message, Modal } from 'antd';
import axios from 'axios'
import Title from 'antd/lib/typography/Title';
import './Todo.css'
import Loader from '../Loader/Loader';

const { Meta } = Card;


const Todo = () => {
    const [form] = Form.useForm();
    const [saving, setSaving] = useState(false)
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [size, setSize] = useState('large');

    const getTodos = async () => {
        setItems([])
        setLoading(true);
        await axios.get(`api/myTodos`).then((res) => {
            res.data.todos.map((todo) => {
                return setItems((item) => [...item, todo])
            })
            setLoading(false)
        }
        ).catch((err) => message.err(err))
    }


    const deleteTodo = async (id) => {
        await axios
            .delete(
                `api/todo/${id}`,
            )
            .then(res => {
                if (res.data.success) {
                    message.success(`Todo Deleted  successfully`);
                } else {
                    message.error(`Error while deleting Todo`);
                }
            })
            .catch(err => message.error('Error while deleting todo' + err));
        getTodos()
    }



    const onFinish = async formData => {
        setSaving(true)
        await axios
            .post(
                `api/newTodo`,
                {
                    ...formData
                },
            )
            .then(res => {
                if (res.data.success) {
                    message.success(`Todo added successfully`);
                    setIsAdding(false);
                    setSaving(false);
                    getTodos()
                    form.resetFields();
                } else {
                    message.error(`Error while adding Todo`);
                }
            })
            .catch(err => message.error('Error while adding todo 2'));

    };

    useEffect(() => {
        setItems([])
        getTodos();
    }, [])


    return (
        <>
            {<Modal
                confirmLoading={saving}
                visible={isAdding}
                onCancel={() => setIsAdding(false)}
                okText={`Add Todo`}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            {
                                required: true,
                                message: 'This field is required...',
                            },
                        ]}
                    >
                        <Input placeholder="Enter Title" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input placeholder="Enter Description (Optional)" />
                    </Form.Item>
                </Form>
            </Modal>}
            <Card
                title={
                    <Title level={4} style={{ margin: 0 }}>
                        Todo
                    </Title>
                }
                bodyStyle={{ padding: 0 }}
                bordered={false}
                style={{ borderRadius: 0 }}
                extra={
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined style={{ marginRight: 6 }} />}
                            onClick={() => setIsAdding(true)}
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            Add Todo
                        </Button>
                    </div>
                }
            >
            </Card>

            {loading ? <Loader simple /> :
                <div className="site-card-wrapper">
                    {items.length > 0 ?
                        <Row>
                            {items.map((item) => {
                                return (
                                    <Col style={{ margin: "auto" }} >
                                        <Card
                                            key={item._id}
                                            bordered={false}
                                            style={{ outline: "1px solid black", margin: "1rem 0.8rem", width: "250px", height: "100%" }}
                                            actions={[
                                                <Button type="primary" icon={<DeleteOutlined />} onClick={() => { deleteTodo(item._id) }} size={size} >
                                                    Delete
                                                </Button>

                                            ]}

                                        >
                                            <Meta
                                                style={{ color: "black" }}
                                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                title={item.title}
                                                description={item.description}
                                            />

                                        </Card>
                                    </Col>)
                            }
                            )
                            }


                        </Row>
                        : <Title level={4} style={{ margin: "auto 45%" }}>
                            No Todo Added
                            <Button type="primary" icon={<PlusOutlined style={{ marginRight: 6 }} />} onClick={() => setIsAdding(true)} >Add One</Button>
                        </Title>
                    }            </div>}
        </>
    )
}

export default Todo