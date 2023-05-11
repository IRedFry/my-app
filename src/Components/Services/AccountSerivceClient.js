import React from "react";
import { Collapse } from "antd";
import {Button} from "antd";
/* 
    TODO:

*/

const { Panel } = Collapse;

const AccountServiceClient = ({id, name, specialization, price, doctorFIO, date, isPresent}) => {
    console.log(id, name, specialization, price)
    return(
        <>
        <Collapse className="ServiceCollapse">
            <Panel header={name} key={id} className="ServicePanel">
                <div className="SeriveFiledsWrapper">
                    <p className="ServiceField"> <div>Цена:</div> <span>{price}</span> </p>
                    <p className="ServiceField"> <div>Специальность:</div> <span>{specialization}</span> </p>
                    <p className="ServiceField"> <div>Врач:</div> <span>{doctorFIO}</span> </p>
                    <p className="ServiceField"> <div>Дата:</div> <span>{date}</span> </p>
                    {isPresent ? (<div className="butWrap"><Button className="ServiceAppointmentButton FancyText"> Отказаться </Button></div>) : (<></>)}
                </div>
            </Panel>
        </Collapse>

        </>
    );
}

export default AccountServiceClient;