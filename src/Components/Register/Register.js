import React from "react";
//import { useNavigate } from "react-router-dom";
import { Button, Form, Input} from "antd"

const Register = (/*{ setUser }*/) => {
  //const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const login = e.target.elements.loginField.value;
  //   const password = e.target.elements.passwordField.value;
  //   const passwordConfirm = e.target.elements.passwordCheckField.value;
  //   console.log(e.target.elements);
  //   const newUser = {
  //     email: login,
  //     password: password,
  //     passwordConfirm: passwordConfirm,
  //   };

  //   const createUser = async () => {
  //     console.log(newUser);
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newUser),
  //     };

  //     const response = await fetch("/api/Account/Register", requestOptions);
  //     return await response.json().then(
  //       (data) => {
  //         console.log(data);

  //         if (response.ok) {
  //           setUser({ IsAuthenticated: true, userName: newUser.email, userRole: "user" });
  //           navigate("/");
  //         }
  //       },
  //       (error) => console.log(error)
  //     );
  //   };
  //   createUser();
  // };

  return (
    <React.Fragment>

      <div className="PageHeader FancyText">
              Регистрация
      </div>
        <div className="FormWrapper">
            <Form
              className="FormClass"
              //onFinish={login}
              name="basic"
            
              initialValues={{remember: true}}
              //onFinishFailed={renderErrorMessage}
              autoComplete="off"
              >
                <Form.Item
                  className="FormItemClass FancyText"
                  label="Имя пользователя"
                  name="username"

                  rules={[
                    {required: true, message: "Введите имя пользователя"}
                  ]}
                >
                  <Input/>
                </Form.Item>

                <Form.Item
                  className="FormItemClass FancyText"
                  label="Пароль"
                  name="password"
                  rules={[
                    {required: true, message: "Введите пароль"}
                  ]}
                >
                  <Input.Password/>
                </Form.Item>

                <Form.Item
                  className="FormItemClass FancyText"
                  label="Подтвердите пароль"
                  name="passwordCheck"
                  rules={[
                    {required: true, message: "Введите пароль"}
                  ]}
                >
                  <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button className="FormButton" htmlType="submit"> Зарегистрироваться </Button>
                </Form.Item>
            </Form>
          </div>
    </React.Fragment>

    
  );
};

export default Register;
