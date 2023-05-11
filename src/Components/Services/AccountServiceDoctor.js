import React from "react";
import { Collapse } from "antd";
/* 
    TODO:

*/

const { Panel } = Collapse;

const AccountServiceDoctor = ({id, name, specialization, price, clientFIO, date}) => {
    console.log(id, name, specialization, price)
    return(
        <>
        <Collapse className="ServiceCollapse">
            <Panel header={name} key={id} className="ServicePanel">
                <div className="SeriveFiledsWrapper">
                    <p className="ServiceField"> <div>Цена:</div> <span>{price}</span> </p>
                    <p className="ServiceField"> <div>Специальность:</div> <span>{specialization}</span> </p>
                    <p className="ServiceField"> <div>Клиент:</div> <span>{clientFIO}</span> </p>
                    <p className="ServiceField"> <div>Дата:</div> <span>{date}</span> </p>
                </div>
            </Panel>
        </Collapse>

        </>
    );
}

export default AccountServiceDoctor;