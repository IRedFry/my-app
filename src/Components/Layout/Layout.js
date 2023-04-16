import React from "react";
import { Outlet, Link } from "react-router-dom";
import {Layout as LayoutAnt, Menu} from "antd"

const {Header, Content, Footer} = LayoutAnt;

const items = [
  {
    label: <Link to={"/"}> Главная </Link>,
    key: "1"
  },
  {
    label: <Link to={"/Doctors"}> Доктора </Link>,
    key: "2"
  },
  {
    label: <Link to={"/Login"}> Вход </Link>,
    key: "3"
  },
  {
    label: <Link to={"/Logoff"}> Выход </Link>,
    key: "4"
  },
  {
    label: <Link to={"/Register"}> Регистрация </Link>,
    key: "5"
  },
]

const Layout = ({ user }) => {
  return (
    <LayoutAnt>
      <Header style={{position: "sticky", top: 0, zIndex: 1, width: "100%"}}>
        <div
        style={{
          float: "right",
          color: "rgba(255, 255, 255, 0.65)"
        }}>
           {user.IsAuthenticated ? (
          <h4> Пользователь: {user.userName}, {user.userRole}</h4>
        ) : (
          <h4> Пользователь: Гость </h4>
        )}
        </div>
        <Menu theme="dark" mode="horizontal" items={items} className="menu" />
      </Header>
      <Content className="site-layout" style={{padding: "0 50px", justifyContent:"right"}}>
          <Outlet/>
      </Content>
      <Footer style={{textAlign: "center"}}>Best Clinic Ever (c)2023</Footer>
    </LayoutAnt>
  );
};

export default Layout;

/*

    <>
      <div>
        {user.IsAuthenticated ? (
          <h4> Пользователь: {user.userName}, {user.userRole}</h4>
        ) : (
          <h4> Пользователь: Гость </h4>
        )}
      </div>

      <nav>
        <Link to="/"> Главная </Link> <span />
        <Link to="/Doctors"> Доктора </Link> <span />
        <Link to="/Login"> Вход </Link> <span />
        <Link to="/LogOff"> Выход </Link> <span />
        <Link to="/Register"> Регистрация </Link> <span />
      </nav>
      <Outlet></Outlet>
    </>

*/