import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../components/services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.Context";

const LoginPage = () => {
    const { setUser } = useContext(AuthContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        //console.log("Thông tin đăng nhập: ", values);
        const res = await loginAPI(values.email, values.password);

        if (res.data) {
            message.success("Đăng nhập thành công");
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user); //Lưu thông tin user vào Authcontext
            navigate("/");
        } else {
            notification.error({
                message: "Đăng nhập thất bại",
                description: `Đăng nhập thất bại. ${res.message}`
            })
        }

        setLoading(false);

    }
    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend> Đăng nhập </legend>
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={onFinish}
                    >
                        {/* Email */}
                        <Form.Item label="Email" name="email" rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                            { type: "email", message: "Email không hợp lệ!" }
                        ]}>
                            <Input placeholder="Nhập email ..." />
                        </Form.Item>

                        {/* Mật khẩu */}
                        <Form.Item label="Password" name="password" rules={[
                            { required: true, message: "Vui lòng nhập mật khẩu!" }
                        ]}>
                            <Input.Password placeholder="Nhập mật khẩu ..." />
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loading} type="primary" htmlType="submit" block>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}>Chưa có tài khoản? <Link to={"/register"}>Đăng ký</Link></div>
                    <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
                        <Link to={"/"}>Quay về trang chủ</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage;