import { Button, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../services/api.service";

const CreateBookControl = (props) => {
    const { loadBook, isCreateOpen, setIsCreateOpen } = props;

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmitBtn = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Thêm mới sách thất bại",
                description: "Vui lòng chọn hình ảnh"
            })
            return;
        }
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "book");
        //console.log(resUpload.data);
        if (resUpload.data) {
            //success
            const newThumbnail = resUpload.data.fileUploaded;
            //step 2: create book
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
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
        setIsCreateOpen(false);
    }

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

    return (
        <div className="book-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Books</h3>
                <Button type="primary" onClick={() => setIsCreateOpen(true)} >Create Book</Button>
            </div>
            <Modal
                title="Create Book"
                open={isCreateOpen}
                onOk={() => handleSubmitBtn()} //click ok => handleSubmitBtn
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tiêu đề</span>
                        <Input placeholder="Tiêu đề ..." value={mainText} onChange={(event) => { setMainText(event.target.value) }} />
                    </div>
                    <div>
                        <span>Tác giả</span>
                        <Input placeholder="Tác giả ..." value={author} onChange={(event) => { setAuthor(event.target.value) }} />
                    </div>
                    <div>
                        <span>Giá tiền</span>
                        <InputNumber style={{ width: "100%" }} addonAfter={' vnđ'} placeholder="Giá tiền ..." value={price} onChange={(event) => { setPrice(event) }} />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <InputNumber style={{ width: "100%" }} placeholder="Số lượng ..." value={quantity} onChange={(event) => { setQuantity(event) }} />
                    </div>
                    <div>
                        <span>Thể loại</span>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Chọn thể loại ..."
                            value={category} onChange={(value) => { setCategory(value) }}
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
            </Modal>


        </div>
    )
}
export default CreateBookControl;