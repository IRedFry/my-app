import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input} from "antd"

const Login = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const login = async (formValues) => {
    console.log("Success: ", formValues);


    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formValues.username,
        password: formValues.password,
        rememberme: formValues.remember,
      }),
    };

    return await fetch("/api/Account/Login", requestOptions)
      .then((response) => {
        response.status === 200 &&
          setUser({ isAuthenticated: true, userName: "", userRole: "" });
        return response.json();
      })
      .then(
        (data) => {
          console.log("Data: ", data);
          if (
            typeof data != "undefined" &&
            typeof data.userName != "undefined"
          ) {
            setUser({ IsAuthenticated: true, userName: data.userName, userRole: data.userRole });
            console.log(data.userName);
            navigate("/");
          }
          typeof data != "undefined" &&
            typeof data.error != "undefined" &&
            setErrorMessages(data.error);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const renderErrorMessage = () => {
    errorMessages.map((index, error) => <div key={index}>{error}</div>);
  };

  user.IsAuthenticated = false;
  return (
    <>
      {user.IsAuthenticated ? navigate("/") : (
        <>
                <div className="PageHeader FancyText">
                Вход
      </div>
        <div className="FormWrapper">
            <Form
              className="FormClass"
              onFinish={login}
              name="basic"
            
              initialValues={{remember: true}}
              onFinishFailed={renderErrorMessage}
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
                  className="FormItemClass"
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{offset: 8, span: 16}}
                >
                <Checkbox className="FormItemCheckBox FancyText">Запомнить меня</Checkbox>
                {renderErrorMessage()}
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button className="FormButton" htmlType="submit"> Войти </Button>
                </Form.Item>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default Login;

/*

<form onSubmit={login}>
            <label> Пользователь </label>
            <input type="text" name="emailField" placeholder="Логин" />
            <br />
            <label> Пароль </label>
            <input type="text" name="passwordField" placeholder="Пароль" />
            <br />
            <button type="submit">Войти</button>
          </form>

*/