import { useEffect, useState } from "react";
import { Input, Modal, notification } from "antd";
import { updateUserAPI } from "../services/api.service";


const UpdateUserModal = (props) => {
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate])

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);

        if (res.data) {
            notification.success({
                message: 'Update User Success',
                description: `User ${res.data._id} is updated successfully`
            });
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: 'Update User Failed',
                description: JSON.stringify(res.mess)
            });
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("")
        setFullName("");
        setPhone("");
        setDataUpdate(null);
    }

    return (
        <Modal
            title="Update User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()} //click ok => handleSubmitBtn
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Save"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input value={id} disabled />
                </div>
                <div>
                    <span>Fullname</span>
                    <Input placeholder="Fullname ..." value={fullName} onChange={(event) => { setFullName(event.target.value) }} />
                </div>
                <div>
                    <span>Phone</span>
                    <Input placeholder="Phone ..." value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                </div>

            </div>
        </Modal>
    )
}

export default UpdateUserModal;