import React from 'react';
import './Workplace.css'
import { FormInput } from "shards-react";
import { Button } from "shards-react"
import { Col } from "shards-react"

const Workplace = ( props ) => {
    return(
        <Col md="5" lg="4" className="Workplace">
            <FormInput placeholder="Наименование организации"/>
            <FormInput type="date"/>
            <FormInput placeholder="Должность"/>
            <Button theme="danger">Удалить</Button>
        </Col>
    )
};

export default Workplace;