import React from "react";
import logo from "../../Images/DoctorPhotos/m1.jpg"
import logo2 from "../../Images/DoctorPhotos/w1.jpg"
import { Link } from "react-router-dom";


const DoctorMini = ({ id, fio, years }) => {
    return (
            <div className="DoctorMiniWrapper" key={id} id={id}>
                <Link to={"/Doctors/" + id}>
                    <img className="DoctorMiniIcon" src={id % 2 == 0 ? logo : logo2} ></img> <br></br>
                </Link>
                <p className="DoctorMiniFIO">{fio}</p>
                <div className="DoctorMiniYears">Стаж {years == 1 ? (<div> {years} год</div>) : years < 5 ? (<div> {years}  года</div>) : (<div> {years}  лет </div>)}</div>
            </div>

    );
}

export default DoctorMini;