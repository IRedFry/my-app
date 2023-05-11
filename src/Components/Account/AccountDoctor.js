import React from "react";
import { Button } from "antd"
import AccountServiceDoctor  from "../Services/AccountServiceDoctor"
import WeekSchedule from "../Schedule/WeekSchedule"

const AccountDoctor = () => {
    const user = {fio: "Баженов Андрей Алексеевич", dos: "04.05.2015", type: "doctor"};

    const presentServices = [  {id: 0, name: "Проверка зрения", specialization: "Офтальмолог", price: "1200руб.", clientFIO: "Горохов Тимофей Вадимович", date: "12.12.2023"},
    {id: 1, name: "УЗИ", specialization: "Хирург", price: "3300руб.", clientFIO: "Горохов Тимофей Вадимович", date: "12.12.2023"},
    {id: 2, name: "Проверка работоспособности ребёнка", specialization: "Педиатр", price: "50руб. за кг ребёнка", clientFIO: "Горохов Тимофей Вадимович", date: "12.12.2023"},];

    const alreadyServices = [{id: 3, name: "Свиная вырезка", specialization: "Хирург", price: "1000руб. за кг", clientFIO: "Горохов Тимофей Вадимович", date: "12.12.2023"}]

    return (
        <>
        <div className="PageHeader FancyText">
              Личный кабинеты
      </div>
      <div className="AccountContainer">
        <div className="AccountBlock AccountFirstBlock">
            <div>
                <div className="AccountFIO FancyText"> {user.fio} </div>
                <div className="AccountDOB FancyText"> Дата начала работы: {user.dos}</div>
            </div>
            <Button className="FormButton LogoffButton"> Выйти </Button>
        </div>
        <div className="AccountBlock">
            <div className="AccoutBlockHeader"> Текущие услуги</div>
            {
            presentServices.map(({ id, name, specialization, price, clientFIO, date }) => {
                        return (
                            <AccountServiceDoctor key={id} id={id} name={name} specialization={specialization} price={price} clientFIO={clientFIO} date={date}/>
                        )
                    })
                }
        </div>
        <div className="AccountBlock">
            <div className="AccoutBlockHeader WhiteHeader"> Оказанные услуги</div>
            {
            alreadyServices.map(({ id, name, specialization, price, clientFIO, date }) => {
                        return (
                            <AccountServiceDoctor key={id} id={id} name={name} specialization={specialization} price={price} clientFIO={clientFIO} date={date}/>
                        )
                    })
                }
        </div>
        <div className="AccountBlock">
            <div className="AccoutBlockHeader"> Расписание </div>
           <WeekSchedule></WeekSchedule>
        </div>
      </div>
      </>
    )
}

export default AccountDoctor;