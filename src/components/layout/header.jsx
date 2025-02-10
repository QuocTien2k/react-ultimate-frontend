import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UsergroupAddOutlined, HomeOutlined, BookOutlined, UserAddOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.Context';
import { logoutAPI } from '../services/api.service';
const Header = () => {

    const [current, setCurrent] = useState('');
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    //console.log("check user: ", user);
    const location = useLocation();

    const onClick = (e) => {
        //console.log('click ', e);
        setCurrent(e.key);
    };

    useEffect(() => {
        //console.log("check location", location);

        if (location && location.pathname) {
            const allRoutes = ["users", "books"];
            const currentRoute = allRoutes.find(item => `/${item}` === location.pathname);

            if (currentRoute) {
                setCurrent(currentRoute);
            } else {
                setCurrent("home");
            }
        }
    }, [location])

    const handleLogout = async () => {
        const res = await logoutAPI();

        if (res.data) {
            //clear data
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            //redirect to home
            navigate("/");
        }
    }

    // Menu bên trái
    const leftItems = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: "home",
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: "users",
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: "books",
            icon: <BookOutlined />,
        },
    ];

    // Menu bên phải
    const rightItems = [
        ...(!user.id ? [
            {
                label: <Link to={"/register"}>Register</Link>,
                key: "register",
                icon: <UserAddOutlined />,
                style: { marginLeft: "auto" }, // Đẩy sang phải
            },
            {
                label: <Link to={"/login"}>Login</Link>,
                key: "login",
                icon: <LoginOutlined />,
            },
        ] : [
            {
                label: `Hello, ${user.fullName}`,
                key: "setting",
                icon: <AliwangwangOutlined />,
                style: { marginLeft: "auto" }, // Đẩy sang phải
                children: [
                    {
                        label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
                        key: "logout"
                    }
                ]
            }
        ]),
    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={[
                ...leftItems,
                { type: "divider" }, // Tạo khoảng trống (nếu cần)
                ...rightItems,
            ]}
        />
    );
}

export default Header;
/* 
- Thẻ Navlink: là một thẻ giúp chuyển hướng giữa các trang mà không cần load lại trang và thêm class active
- Thẻ Link: là một thẻ giúp chuyển hướng giữa các trang mà không cần load lại trang
- ...leftItems/...rightItems: là cú pháp spread operator giúp nối mảng leftItems/rightItems vào mảng items của Menu

- Đoạn code ...(!user.id ? [ ... ] : [ ... ]): là cú pháp điều kiện 3 ngôi, 
nếu user.id không tồn tại thì hiển thị mảng đầu tiên, ngược lại hiển thị mảng thứ 2
*/