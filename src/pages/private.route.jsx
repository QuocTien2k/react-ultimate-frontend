import { useContext } from "react";
import { AuthContext } from "../components/context/auth.Context";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    } else {
        return (
            // <Navigate to="/login" replace />
            <Result
                status="404"
                title="Oops!"
                subTitle="Bạn chưa đăng nhập"
                extra={
                    <Button type="primary">
                        <Link to="/login"><span>Đăng nhập</span></Link>
                    </Button>
                }
            />
        )
    }
}
export default PrivateRoute