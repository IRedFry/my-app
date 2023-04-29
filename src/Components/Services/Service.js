import React from "react";
import { Collapse } from "antd";
import {Button} from "antd";
/* 
    TODO:

*/

const { Panel } = Collapse;

const Service = ({id, name, specialization, price}) => {
    console.log(id, name, specialization, price)
    return(
        <>
        <Collapse className="ServiceCollapse">
            <Panel header={name} key={id} className="ServicePanel">
                <div className="SeriveFiledsWrapper ">
                    <p className="ServiceField"> <div>Цена:</div> <span>{price}</span> </p>
                    <p className="ServiceField"> <div>Специальность:</div> <span>{specialization}</span> </p>
                    <div className="butWrap"><Button className="ServiceAppointmentButton FancyText"> Записаться </Button></div>
                </div>
            </Panel>
        </Collapse>

        </>
    );
}

export default Service;