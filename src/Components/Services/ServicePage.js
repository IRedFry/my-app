import React from 'react'
import Service from "./Service"

/*
    TODO:


*/

const ServicePage = () => {
    
    const services = [  {id: 0, name: "Проверка зрения", specialization: "Офтальмолог", price: "1200руб."},
                        {id: 1, name: "УЗИ", specialization: "Хирург", price: "3300руб."},
                        {id: 2, name: "Проверка работоспособности ребёнка", specialization: "Педиатр", price: "50руб. за кг ребёнка"},
                        {id: 3, name: "Свиная вырезка", specialization: "Хирург", price: "1000руб. за кг"}];
    console.log(services);
    return (
        <>
            <div className="PageHeader FancyText">
                Услуги
            </div>
            
            <div className="ServiceContainer">
                {
                    services.map(({ id, name, specialization, price }) => {
                        return (
                            <Service key={id} id={id} name={name} specialization={specialization} price={price}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ServicePage;