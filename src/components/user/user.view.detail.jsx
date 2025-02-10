import { ArrowRightOutlined } from "@ant-design/icons";
import { Modal, Button, Divider, Typography, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../services/api.service";

const { Title, Text } = Typography;

const ViewUserDetail = ({ dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser }) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // Hàm xử lý khi người dùng chọn file
    const handleOnChangeFile = (event) => {
        // Nếu không có file nào được chọn
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleUpdateUserAvatar = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, 'avatar');

        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;

            //step 2: upload user
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);

            if (resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();

                notification.success({
                    message: "Success update avatar",
                    description: `Cập nhật avatar thành công cho người dùng ${dataDetail.fullName}`
                })
            } else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        } else {
            notification.error({
                message: "Upload avatar thất bại",
                description: JSON.stringify(resUpload.message)
            })
        }
    }

    return (
        <Modal
            title="User Detail"
            open={isDetailOpen} // Hiển thị modal nếu isDetailOpen = true
            onCancel={() => {
                setIsDetailOpen(false)
                setDataDetail(null)
            }}
            onOk={() => setIsDetailOpen(false)}
            footer={
                [
                    <Button key="ok" type="primary" onClick={() => setIsDetailOpen(false)}>
                        OK
                    </Button>,
                ]} // Chỉ hiển thị nút OK
        >
            <div>
                {/* Đường kẻ ngăn cách */}
                <Divider style={{ background: "#000000", height: "2px" }} />

                {/* Nội dung hiển thị chi tiết */}
                {dataDetail ? (
                    <div style={{ padding: "16px", lineHeight: "1.6", background: "#f9f9f9", borderRadius: "8px" }}>
                        <Title level={5} style={{ marginBottom: "16px" }}>
                            Thông Tin Chi Tiết
                        </Title>
                        <p>
                            <Text strong>ID:</Text> {dataDetail._id}
                        </p>
                        <p>
                            <Text strong>Họ và Tên:</Text> {dataDetail.fullName}
                        </p>
                        <p>
                            <Text strong>Email:</Text> {dataDetail.email}
                        </p>
                        <p>
                            <Text strong>Số điện thoại:</Text> {dataDetail.phone}
                        </p>
                        <p>
                            <Text strong>Avatar:</Text>
                        </p>
                        <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ width: "150px", height: "150px", border: "1px solid #ccc" }}>
                                <img
                                    style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "contain" }}
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                                    alt="avatar"
                                />
                                <div>
                                    <label htmlFor="btnUpload" style={{
                                        display: "block",
                                        width: "fit-content",
                                        marginTop: "15px",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                        borderRadius: "5px",
                                        background: "orange"
                                    }}
                                    >Upload Avatar</label>
                                    <input type="file" hidden id="btnUpload" onChange={(event) => handleOnChangeFile(event)} />
                                </div>
                            </div>
                            {preview &&
                                <>
                                    <div>
                                        <Text strong style={{ fontSize: "30px" }}><ArrowRightOutlined /></Text>
                                    </div>
                                    <div style={{ width: "150px", height: "150px", border: "1px solid #ccc" }}>
                                        <img
                                            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "contain" }}
                                            src={preview}
                                            alt="avatar"
                                        />
                                        <Button onClick={() => handleUpdateUserAvatar()} type="primary" style={{ marginTop: "15px" }}>Save</Button>
                                    </div>
                                </>
                            }
                        </div>

                    </div>
                ) : (
                    <p style={{ textAlign: "center", fontSize: "16px", marginTop: "16px" }}>
                        Không có dữ liệu
                    </p>
                )}
            </div>
        </Modal >
    );
};

export default ViewUserDetail;
