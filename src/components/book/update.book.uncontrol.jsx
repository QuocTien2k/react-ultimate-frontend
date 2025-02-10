import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../services/api.service";

const UpdateBookUncontrol = (props) => {

    const { loadBook, dataUpdate, setDataUpdate, isModalUpdateOpen, setIsModalUpdateOpen } = props;
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category
            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate]);

    const updateBook = async (newThumbnail, values) => {
        const { id, mainText, author, price, quantity, category } = values;
        const resBook = await updateBookAPI(id, newThumbnail, mainText, author, price, quantity, category);

        if (resBook.data) {
            resetAndCloseModal();
            await loadBook();
            notification.success({
                message: "Update book success",
                description: "Cập nhật thành công"
            })
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(resBook.message)
            })
        }
    }

    const handleSubmitBtn = async (values) => {
        //trường hợp không có ảnh + không có file
        if (!selectedFile && !preview) {
            notification.error({
                message: "Error update book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }

        let newThumbnail = "";
        //trường hợp không upload ảnh mới nhưng có ảnh cũ
        if (!selectedFile && preview) {
            newThumbnail = dataUpdate.thumbnail;
        } else {
            //trường hợp upload ảnh mới
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                //success
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error update book",
                    description: JSON.stringify(resUpload.message)
                })
                return;
            }
        }

        //call api update book
        await updateBook(newThumbnail, values);
    }

    const resetAndCloseModal = () => {
        form.resetFields();
        setIsModalUpdateOpen(false);
        setDataUpdate(null);
        setSelectedFile(null);
        setPreview(null);
    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <Modal
            title="Update book uncontrol"
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"UPDATE"}
            centered
            style={{ width: "600px" }}
            motion={{
                motionName: "ant-slide-up",
                motionAppear: true,
                motionDeadline: 350 //
            }}
            maskMotion={{
                motionName: "fade",
                motionAppear: true,
                motionDeadline: 350
            }}
        >
            <Form form={form} onFinish={handleSubmitBtn} layout="vertical">
                {/* Chia thành hai cột bằng Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr", // Chia thành 2 cột
                    gap: "15px",
                    alignItems: "start"
                }}>
                    <Form.Item label="Id" name="id" style={{ gridColumn: "1 / 3" }}>
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Tiêu đề"
                        name="mainText"
                        rules={[{ required: true, message: "Tiêu đề không được để trống" }]}
                    >
                        <Input placeholder="Nhập tiêu đề sách" allowClear />
                    </Form.Item>

                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[{ required: true, message: "Tác giả không được để trống" }]}
                    >
                        <Input placeholder="Nhập tên tác giả" allowClear />
                    </Form.Item>

                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[{ required: true, message: "Giá tiền không được để trống" }]}
                    >
                        <InputNumber style={{ width: "100%" }} addonAfter="VNĐ" min={0} placeholder="Nhập giá tiền" />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: "Số lượng không được để trống" }]}
                    >
                        <InputNumber style={{ width: "100%" }} min={1} placeholder="Nhập số lượng" />
                    </Form.Item>

                    <Form.Item
                        label="Thể loại"
                        name="category"
                        style={{ gridColumn: "1 / 3" }} // Chiếm toàn bộ dòng
                        rules={[{ required: true, message: "Thể loại không được để trống" }]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Chọn thể loại"
                            allowClear
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </Form.Item>
                </div>

                {/* Ảnh Thumbnail, nằm dưới form nhưng không làm cao quá */}
                <Form.Item label="Ảnh Thumbnail" style={{ marginTop: "10px" }}>
                    <label
                        htmlFor="btnUpload"
                        title="Chọn ảnh để tải lên"
                        style={{
                            display: "inline-block",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        Upload
                    </label>
                    <input
                        type="file" hidden id="btnUpload"
                        onChange={(event) => handleOnChangeFile(event)}
                        onClick={(event) => event.target.value = null}
                        style={{ display: "none" }}
                    />

                    {preview && (
                        <div style={{
                            marginTop: "10px",
                            height: "120px", width: "180px",
                            border: "1px dashed #ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <img
                                src={preview}
                                alt="Ảnh xem trước"
                                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                            />
                        </div>
                    )}
                </Form.Item>
            </Form>

        </Modal>
    )
}

/* 
- Tại input file sử dụng onClick={(event) => event.target.value = null} để reset value file
Lần 1: Người dùng chọn "image.png" → onChange chạy.
Lần 2: Người dùng chọn lại "image.png" → onChange sẽ không chạy.
Khi đặt event.target.value = null, nó giúp input luôn nhận diện như một lựa chọn mới, 
đảm bảo sự kiện onChange hoạt động đúng.
*/

export default UpdateBookUncontrol;
