import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../components/services/api.service";
import CreateBookUncontrol from "../components/book/create.book.uncontrol";
//import CreateBookControl from "../components/book/create.book.control";

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);

    useEffect(() => {
        loadBook();
    }, [current, pageSize]);

    const loadBook = async () => {
        setLoadingTable(true);
        const res = await fetchAllBookAPI(current, pageSize);
        //console.log(res.data.result);
        if (res.data) {
            setDataBooks(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        setLoadingTable(false);
    }
    return (
        <div style={{ padding: "20px" }}>
            {/*Cách 1 sử dụng CreateBookControl component */}
            {/* <CreateBookControl loadBook={loadBook} isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen} /> */}

            {/*Cách 2 sử dụng CreateBookUncontrol component */}
            <CreateBookUncontrol
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook}
            />

            <BookTable
                dataBooks={dataBooks}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadBook={loadBook}
                loadingTable={loadingTable}
            />
        </div>
    )
}

export default BookPage;