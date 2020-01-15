import React from "react";
import { Form, FormGroup, Input } from 'reactstrap';

import './itemAddForm.css';

const ItemAddForm = () => {

    return (
        <Form className="item-add-form">
            <FormGroup>
                <Input type="text" name="newItem" placeholder="Enter a new todo item" plaintext />
            </FormGroup>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn">Hide completed</button>
                <button type="submit" className="btn">Add new</button>
            </div>
        </Form>
    )
};

export default ItemAddForm;