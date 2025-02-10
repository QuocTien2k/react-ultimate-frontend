import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, notification, Popconfirm, Table } from "antd"
import { useState } from "react";
import BookDetail from "./book.view.detail";
import UpdateBookUncontrol from "./update.book.uncontrol";
import { deleteBookAPI } from "../services/api.service";
//import UpdateBookControl from "./update.book.control";

const BookTable = (props) => {
    const { dataBooks, current, pageSize, total, loadBook, setCurrent, setPageSize, loadingTable } = props;
    //console.log(dataBooks);
    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const handleDeleteBook = async (id) => {
        const res = await deleteBookAPI(id);

        if (res.data) {
            message.success("Xóa thành công")
            await loadBook();
        } else {
            notification.error({
                message: "Delete Book Failed",
                description: JSON.stringify(res.message)
            })
        }
    }

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                //console.log(record);
                return (
                    <a
                        href='#'
                        onClick={() => {
                            setDataDetail(record)
                            setIsDetailOpen(true)
                        }}
                    >
                        {record._id}
                    </a >
                )
            }
        },
        {
            title: "Tiêu đề",
            dataIndex: "mainText"
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            render: (text) => {
                if (text) {
                    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text)
                }
            }
        },
        {
            title: "Số lượng",
            dataIndex: "quantity"
        },
        {
            title: "Tác giả",
            dataIndex: "author"
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "20px", fontSize: "18px" }}>
                        <EditOutlined
                            style={{ cursor: "pointer", color: "orange" }}
                            onClick={() => {
                                setDataUpdate(record);
                                setIsModalUpdateOpen(true);
                            }}
                        />
                        <Popconfirm
                            title="Xóa người dùng"
                            description="Bạn có chắc không?"
                            onConfirm={() => handleDeleteBook(record._id)}
                            onText="Yes"
                            cancelText="No"
                            placement="leftTop"
                        >
                            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                        </Popconfirm>

                    </div>
                )
            }
        }
    ];

    const onChange = (pagination) => {
        //Nếu thay đổi trang
        if (pagination && pagination.current) {
            if (+pagination.current !== current) {
                setCurrent(+pagination.current);
            }
        }

        //Nếu thay đổi số lượng phần tử trên trang
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataBooks}
                rowKey={"_id"}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: false,
                    total: total,
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} phần tủ</div>) }
                }}
                onChange={onChange}
                loading={loadingTable}
            />
            <BookDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
            />
            {/* Update book su dụng control */}
            {/* <UpdateBookControl
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateO
                pen={setIsModalUpdateOpen}
            /> */}

            {/* {Update book uncontrol} */}
            <UpdateBookUncontrol
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
            />
        </>
    )
}
export default BookTable