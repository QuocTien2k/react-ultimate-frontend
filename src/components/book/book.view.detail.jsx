import { Button, Divider, Modal, Typography } from "antd";
const { Title, Text } = Typography;

const BookDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;
    //console.log(setDataDetail);
    return (
        <>
            <Modal
                title="Thông tin sách"
                open={isDetailOpen}
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
                {/* Đường kẻ ngăn cách */}
                <Divider style={{ background: "#000000", height: "2px" }} />

                {/*Nếu có data thì hiển thị*/}
                {dataDetail ? (
                    <div style={{ padding: "16px", lineHeight: "1.6", background: "#f9f9f9", borderRadius: "8px" }}>
                        <Title level={5} style={{ marginBottom: "16px" }}>
                            Thông Tin Chi Tiết
                        </Title>
                        <p>
                            <Text strong>ID:</Text> {dataDetail._id}
                        </p>
                        <p>
                            <Text strong>Tiêu đề:</Text> {dataDetail.mainText}
                        </p>
                        <p>
                            <Text strong>Tác giả:</Text> {dataDetail.author}
                        </p>
                        <p>
                            <Text strong>Thể loại:</Text> {dataDetail.category}
                        </p>
                        <p>
                            <Text strong>Số lượng:</Text> {dataDetail.quantity}
                        </p>
                        <p>
                            <Text strong>Đã bán:</Text> {dataDetail.sold}
                        </p>
                        <p>
                            <Text strong>Giá tiền:</Text>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataDetail.price)}
                        </p>
                        <p>
                            <Text strong>Thumbnail:</Text>
                        </p>
                        <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ width: "150px", height: "150px", border: "1px solid #ccc" }}>
                                <img
                                    style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "contain" }}
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`}
                                    alt="avatar"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <p style={{ textAlign: "center", fontSize: "16px", marginTop: "16px" }}>
                        Không có dữ liệu
                    </p>
                )}
            </Modal>
        </>
    )
}

export default BookDetail;