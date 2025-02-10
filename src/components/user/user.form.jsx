import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../services/api.service";

const UserForm = (props) => {
    const { loadUser } = props;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    /*
    const handleClickBtn = async () => {
        // //console.log('Object is clicked: ', { fullname, email, password, phone });
        // const res = await createUserAPI(fullName, email, password, phone);
        // //console.log('Response: ', res.data);

        // if (res.data) {
        //     notification.success({
        //         message: 'Create User Success',
        //         description: `User ${res.data.fullName} is created successfully`
        //     });
        // } else {
        //     notification.error({
        //         message: 'Create User Failed',
        //         description: JSON.stringify(res.mess)
        //     });
        // }

        setIsModalOpen(true);
    }
    */

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);

        if (res.data) {
            notification.success({
                message: 'Create User Success',
                description: `User ${res.data.fullName} is created successfully`
            });
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: 'Create User Failed',
                description: JSON.stringify(res.mess)
            });
        }
    }

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }

    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button type="primary" onClick={() => setIsModalOpen(true)} >Create User</Button>
            </div>
            <Modal
                title="Create User"
                open={isModalOpen}
                onOk={() => handleSubmitBtn()} //click ok => handleSubmitBtn
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Fullname</span>
                        <Input placeholder="Fullname ..." value={fullName} onChange={(event) => { setFullName(event.target.value) }} />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input placeholder="Email ..." value={email} onChange={(event) => { setEmail(event.target.value) }} />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password placeholder="Password ..." value={password} onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                    <div>
                        <span>Phone</span>
                        <Input placeholder="Phone ..." value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                    </div>

                </div>
            </Modal>


        </div>
    )
}

export default UserForm;