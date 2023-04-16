import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const LogOff = ({ setUser }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    showModal();
  }, []);

  const logOff = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
    };
    return await fetch("/api/Account/LogOff", requestOptions).then(
      (response) => {
        response.status === 200 &&
          setUser({ isAuthenticated: false, userName: "" });
        response.status === 401 ? navigate("/Login") : navigate("/");
        setOpen(false);
      }
    );
  };

  const handleCancel = () => {
    console.log("Нажата отмена");
    setOpen(false);
    navigate("/");
  };
  return (
    <>
      <Modal title="Title" open={open} onOk={logOff} onCancel={handleCancel}>
        <p> Выполнить выход </p>
      </Modal>
    </>
  );
};

export default LogOff;
