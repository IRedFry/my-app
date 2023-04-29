import React from "react";
import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import {Layout as LayoutAnt, Menu } from "antd"
import logo from "../../Images/Logos/logo4.png"

const {Header, Content, Footer} = LayoutAnt;

const items = [
  {
    label: <Link to={"/"}> Главная </Link>,
    key: "/"
  },
  {
    label: <Link to={"/Services"}> Услуги </Link>,
    key: "/Services"
  },
  {
    label: <Link to={"/Doctors"}> Доктора </Link>,
    key: "/Doctors"
  },
  {
    label: <Link to={"/Login"}> Личный кабинет </Link>,
    key: "/Login"
  },
  // {
  //   label: <Link to={"/Logoff"}> Выход </Link>,
  //   key: "4"
  // },
  // {
  //   label: <Link to={"/Register"}> Регистрация </Link>,
  //   key: "5"
  // },
]

const Layout = ({ user }) => {

  const [selectedKeys, setSelectedKeys] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Получаем путь текущей страницы
    const path = location.pathname;

    // Обновляем выбранный пункт меню на основе пути страницы
    setSelectedKeys([path]);
  }, [location]);

  return (
    <LayoutAnt>
      <Header style={{position: "sticky", top: 0, zIndex: 2, width: "100%", height: "auto"}}>
        <div className="logo">
          <img src={logo} className="LogoImage" style={{
            width: "64px",
            height: "64px",
            padding: "5px",
            float : "left",
            }}></img>
        </div>
        <div className="companyName" style={{
          height: "64px",
          color: "white",
          float: "left",
          padding: "0px 32px",
          display: "flex",
          alignItems: "center"
        }}>
          <h1 style={{
          }}>Restful Clinic</h1>
        </div>
        <div
        style={{
          float: "right",
          color: "rgba(255, 255, 255, 0.65)"
        }}>
           {user.IsAuthenticated ? (
          <h4> </h4> // Пользователь: {user.userName}, {user.userRole}
        ) : (
          <h4>  </h4> // Пользователь: Гость
        )}
        </div>
        <Menu theme="dark" mode="horizontal" items={items} selectedKeys={selectedKeys} className="menu" />
      </Header>
      <Content className="site-layout" style={{justifyContent:"right"}}>
          <Outlet/>
      </Content>
      <Footer >Best Clinic Ever (c)2023</Footer>
    </LayoutAnt>
  );
};

export default Layout;
