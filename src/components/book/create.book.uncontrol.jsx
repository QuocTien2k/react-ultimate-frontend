import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../services/api.service";

const CreateBookUncontrol = (props) => {
    const { loadBook, isCreateOpen, setIsCreateOpen } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [form] = Form.useForm();

    const handleSubmitBtn = async (values) => {
        if (!selectedFile) {
            notification.error({
                message: "Thêm mới sách thất bại",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }

        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "book")
        if (resUpload.data) {
            //success
            const newThumbnail = resUpload.data.fileUploaded;

            //step 2: create book
            console.log(values);
            const { mainText, author, price, quantity, category } = values;

            const resBook = await createBookAPI(newThumbnail, mainText, author, price, quantity, category);
            if (resBook.data) {
                resetAndCloseModal();
                await loadBook();
                notification.success({
                    message: "Create Book Success",
                    description: "Thêm mới sách thành công"
                })
            } else {
                notification.error({
                    message: "Create Book Fail",
                    description: JSON.stringify(resBook.message)
                })
            }
        } else {
            notification.error({
                message: "Upload Image Fail",
                description: JSON.stringify(resUpload.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        //console.log("Reset modal state");
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setIsCreateOpen(false);
    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }
    return (
        <div className="book-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Books</h3>
                <Button type="primary" onClick={() => setIsCreateOpen(true)} >Create Book</Button>
            </div>
            <Modal
                title="Create Book Uncontrol"
                open={isCreateOpen}
                onOk={() => { form.submit(); }}
                onCancel={() => { resetAndCloseModal(); }}
                maskClosable={false}
                okText={"Create"}
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
                <Form
                    form={form}
                    onFinish={handleSubmitBtn}
                    layout="vertical"
                >
                    <div style={{ display: "flex", gap: "6px", flexDirection: "column" }}>
                        <div>
                            <Form.Item
                                label="Tiêu đề"
                                name="mainText"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tiêu đề không được để trống!',
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Tác giả"
                                name="author"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tác giả không được để trống!',
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Giá tiền"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Giá tiền không được để trống!',
                                    }
                                ]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    addonAfter={' đ'}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Số lượng"
                                name="quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Số lượng không được để trống!',
                                    }
                                ]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </div>

                        <div>
                            <Form.Item
                                label="Thể loại"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Thể loại không được để trống!',
                                    }
                                ]}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    name="category"
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
                        <div>
                            <div>Ảnh thumbnail</div>
                            <div>
                                <label htmlFor='btnUpload' style={{
                                    display: "block",
                                    width: "fit-content",
                                    marginTop: "15px",
                                    padding: "5px 10px",
                                    background: "orange",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}>
                                    Upload
                                </label>
                                <input
                                    type='file' hidden id='btnUpload'
                                    onChange={(event) => handleOnChangeFile(event)}
                                    onClick={(event) => event.target.value = null}
                                    style={{ display: "none" }}
                                />
                            </div>
                            {preview &&
                                <>
                                    <div style={{
                                        marginTop: "10px",
                                        marginBottom: "15px",
                                        height: "100px", width: "150px",
                                    }}>
                                        <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                            src={preview} />
                                    </div>
                                </>
                            }
                        </div>

                    </div>
                </Form>
            </Modal >
        </div >
    )
}
export default CreateBookUncontrol;