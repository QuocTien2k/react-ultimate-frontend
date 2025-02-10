import { Form, Input, Button, Card, notification } from "antd";
import { registerUserAPI } from "../components/services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm(); // Sử dụng form để lấy dữ liệu từ form (định danh form)
    const navigate = useNavigate(); // Sử dụng navigate để chuyển hướng trang
    const onFinish = async (values) => {
        console.log("Thông tin đăng ký:", values);

        //Gọi API
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        )

        if (res.data) {
            notification.success({
                message: "Register user success",
                description: "Đăng ký thành công"
            })
            navigate("/login");
        } else {
            notification.error({
                message: "Register user error",
                description: `Đăng ký thất bại. {JSON.stringify.{res.message}}`
            })
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" }}>
            <Card title="Đăng Ký" style={{ width: 400, borderRadius: 8 }}>
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    {/* Họ và Tên */}
                    <Form.Item label="Họ và Tên" name="fullName" rules={[
                        { required: true, message: "Vui lòng nhập họ và tên!" }
                    ]}>
                        <Input placeholder="Nhập họ và tên ..." />
                    </Form.Item>

                    {/* Email */}
                    <Form.Item label="Email" name="email" rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                        { type: "email", message: "Email không hợp lệ!" }
                    ]}>
                        <Input placeholder="Nhập email ..." />
                    </Form.Item>

                    {/* Mật khẩu */}
                    <Form.Item label="Mật khẩu" name="password" rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu!" }
                    ]}>
                        <Input.Password placeholder="Nhập mật khẩu ..." />
                    </Form.Item>

                    {/* Số điện thoại */}
                    <Form.Item label="Số điện thoại" name="phone" rules={[
                        { required: true, message: "Số điện thoại gồm 10 chữ số và bắt đầu bằng số 0!", pattern: /^[0-9]*$/ }
                    ]}>
                        <Input placeholder="Nhập số điện thoại ..." />
                    </Form.Item>

                    {/* Nút Đăng Ký */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Đăng Ký
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to={"/"}>Quay về trang chủ</Link>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;
