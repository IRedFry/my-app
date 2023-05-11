import React from "react";
import { Button } from "antd"
import AccountServiceClient  from "../Services/AccountSerivceClient"
const Account = () => {
    const user = {fio: "Горохов Тимофей Вадимович", dob: "02.03.2003", type: "client"};

    const presentServices = [  {id: 0, name: "Проверка зрения", specialization: "Офтальмолог", price: "1200руб.", doctorFIO: "Баженов Андрей Алексеевич", date: "12.12.2023"},
    {id: 1, name: "УЗИ", specialization: "Хирург", price: "3300руб.", doctorFIO: "Баженов Андрей Алексеевич", date: "12.12.2023"},
    {id: 2, name: "Проверка работоспособности ребёнка", specialization: "Педиатр", price: "50руб. за кг ребёнка", doctorFIO: "Баженов Андрей Алексеевич", date: "12.12.2023"},];

    const alreadyServices = [{id: 3, name: "Свиная вырезка", specialization: "Хирург", price: "1000руб. за кг", doctorFIO: "Баженов Андрей Алексеевич", date: "12.12.2023"}]

    return (
        <>
        <div className="PageHeader FancyText">
              Личный кабинеты
      </div>
      <div className="AccountContainer">
        <div className="AccountBlock AccountFirstBlock">
            <div>
                <div className="AccountFIO FancyText"> {user.fio} </div>
                <div className="AccountDOB FancyText"> Дата рождения: {user.dob}</div>
            </div>
            <Button className="FormButton LogoffButton"> Выйти </Button>
        </div>
        <div className="AccountBlock">
            <div className="AccoutBlockHeader"> Текущие услуги</div>
            {
            presentServices.map(({ id, name, specialization, price, doctorFIO, date }) => {
                        return (
                            <AccountServiceClient key={id} id={id} name={name} specialization={specialization} price={price} doctorFIO={doctorFIO} date={date} isPresent={true}/>
                        )
                    })
                }
        </div>
        <div className="AccountBlock">
            <div className="AccoutBlockHeader WhiteHeader"> Оказанные услуги</div>
            {
            alreadyServices.map(({ id, name, specialization, price, doctorFIO, date }) => {
                        return (
                            <AccountServiceClient key={id} id={id} name={name} specialization={specialization} price={price} doctorFIO={doctorFIO} date={date} isPresent={false}/>
                        )
                    })
                }
        </div>
      </div>
      </>
    )
}

export default Account;