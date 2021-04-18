import './App.css';
import Workplace from "./Workplace";
import React from 'react';

import { Button, FormTextarea } from "shards-react";
import { Container, Row, Col } from "shards-react";
import { FormInput, FormGroup, FormRadio,  FormSelect} from "shards-react";
import { Alert } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { useState } from 'react';

// Generic storage availability check from developer.mozilla.org
function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

// Saving content to Session Storage
function populateStorage() {
  sessionStorage.setItem('surname', document.getElementById('surnameFormInput').value);
  sessionStorage.setItem('name', document.getElementById('nameFormInput').value);
  sessionStorage.setItem('mail', document.getElementById('eMailFormInput').value);
  sessionStorage.setItem('phone', document.getElementById('phoneNumberFormInput').value);
  sessionStorage.setItem('city', document.getElementById('cityFormInput').value);
  sessionStorage.setItem('street', document.getElementById('streetFormInput').value);
  sessionStorage.setItem('building', document.getElementById('buildingFormInput').value);
  sessionStorage.setItem('part', document.getElementById('partFormInput').value);
  sessionStorage.setItem('entrance', document.getElementById('entranceFormInput').value);
  sessionStorage.setItem('apartment', document.getElementById('apartmentFormInput').value);
  sessionStorage.setItem('bday', document.getElementById('bdayFormInput').value);
  sessionStorage.setItem('info', document.getElementById('infoFormTextArea').value);
}

// Check all fields that must be populated
function makeCheck(){
  /*
  document.getElementById('alertMail').hidden = true;
  document.getElementById('alertNumber').hidden = true;

  document.getElementById('alertGender').hidden = true;

  document.getElementById('alertBDay').hidden = true;
  */
  // Checks:
  //    name/surname
  if(!document.getElementById('surnameFormInput').value || 
      !document.getElementById('nameFormInput').value){
        document.getElementById('alertName').hidden = false;
  } else {
    document.getElementById('alertName').hidden = true;

  }
  //    phone/mail
  if (!document.getElementById('eMailFormInput').value &&
      !document.getElementById('phoneNumberFormInput').value){
        document.getElementById('alertMailNumber').hidden = false;
  } else{
    document.getElementById('alertMailNumber').hidden = true;
  }
  //    address
  if (!document.getElementById('cityFormInput').value ||
      !document.getElementById('streetFormInput').value ||
      !document.getElementById('buildingFormInput').value){
        document.getElementById('alertAddress').hidden = false;
  } else{
    document.getElementById('alertAddress').hidden = true;
  }
  //    bday
  if (!document.getElementById('bdayFormInput').value)
    document.getElementById('alertBDay').hidden = false;
  else
    document.getElementById('alertBDay').hidden = true;
}

// Loading session content when all HTML is generated
document.addEventListener('DOMContentLoaded', _ => {
  // Assigning onchange event for content saving
  /*const names = ['surnameFormInput', 'nameFormInput',
  'mailFormInput', 'phoneFormInput', 
  'cityFormInput', 'streetFormInput', 
  'buildingFormInput', 'partFormInput', 
  'entranceFormInput', 'apartmentFormInput'];
        // Not working for some reason: "TypeError: Cannot set property 'onchange' of null"
        // Altrough checked with alarm, all array elements are correct
  for (const elemName of names){
    document.getElementById(elemName).onchange = populateStorage;
  };*/
  document.getElementById('surnameFormInput').onchange = populateStorage;
  document.getElementById('nameFormInput').onchange = populateStorage;
  document.getElementById('eMailFormInput').onchange = validateEmail;
  document.getElementById('phoneNumberFormInput').onchange = populateStorage;
  document.getElementById('cityFormInput').onchange = populateStorage;
  document.getElementById('streetFormInput').onchange = populateStorage;
  document.getElementById('buildingFormInput').onchange = populateStorage;
  document.getElementById('partFormInput').onchange = populateStorage;
  document.getElementById('entranceFormInput').onchange = populateStorage;
  document.getElementById('apartmentFormInput').onchange = populateStorage;
  document.getElementById('bdayFormInput').onchange = populateStorage;
  document.getElementById('infoFormTextArea').onchange = populateStorage;

  //Hiding alarms
  document.getElementById('alertName').hidden = true;
  document.getElementById('alertMail').hidden = true;
  document.getElementById('alertNumber').hidden = true;
  document.getElementById('alertMailNumber').hidden = true;
  document.getElementById('alertGender').hidden = true;
  document.getElementById('alertAddress').hidden = true;
  document.getElementById('alertBDay').hidden = true;
  
  // Checking if session storage available and loading session if it is
  if (storageAvailable('sessionStorage')) { 
    /* Same story as ^^^
    for (const elemName of names){
      var elem = sessionStorage.getItem(elemName);
      if (elem != null)
        document.getElementById(elemName).value = elem;
    };*/
    var elem = sessionStorage.getItem('surname');
      if (elem != null)
        document.getElementById('surnameFormInput').value = elem;

    elem = sessionStorage.getItem('name');
      if (elem != null)
        document.getElementById('nameFormInput').value = elem;

    elem = sessionStorage.getItem('mail');
      if (elem != null)
        document.getElementById('eMailFormInput').value = elem;
        
    var elem = sessionStorage.getItem('phone');
      if (elem != null)
        document.getElementById('phoneNumberFormInput').value = elem;

    elem = sessionStorage.getItem('city');
      if (elem != null)
        document.getElementById('cityFormInput').value = elem;

    elem = sessionStorage.getItem('street');
      if (elem != null)
        document.getElementById('streetFormInput').value = elem;
    
    var elem = sessionStorage.getItem('building');
      if (elem != null)
        document.getElementById('buildingFormInput').value = elem;

    elem = sessionStorage.getItem('part');
      if (elem != null)
        document.getElementById('partFormInput').value = elem;

    elem = sessionStorage.getItem('entrance');
      if (elem != null)
        document.getElementById('entranceFormInput').value = elem;
    
    elem = sessionStorage.getItem('apartment');
      if (elem != null)
        document.getElementById('apartmentFormInput').value = elem;

    elem = sessionStorage.getItem('bday');
      if (elem != null)
        document.getElementById('bdayFormInput').value = elem;
    elem = sessionStorage.getItem('info');
      if (elem != null)
        document.getElementById('infoFormTextArea').value = elem;
  }
});

function App() {
  const [workplaces, setWorkplaces] = useState([]);
  
  
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <Col lg="6"><p>Редактирование профиля</p></Col>
          </Row>

          <Row>
            <Col lg="4">
              <label>Фамилия и имя</label>
            </Col>
          </Row>
          <Row className="tableRow">
            <Col lg="4">
              <FormInput id="surnameFormInput" type="text" placeholder="Фамилия"></FormInput>
            </Col>
            <Col lg="4">
              <FormInput id="nameFormInput" type="text" placeholder="Имя"></FormInput>
            </Col>
          </Row>
          <Row>
            <Col  lg="8">
              <Alert className="Alert" id="alertName" theme="danger"><p className="Basic-text">Необходимо указать фамилию и имя!</p></Alert>
            </Col>
          </Row>

          <Row className="tableRow">
            <Col  lg="4">
              <FormGroup>
                <label className="Basic-text">Email</label>
                <FormInput id="eMailFormInput" type="email" placeholder="Email"></FormInput>
              </FormGroup>
            </Col>
            <Col  lg="4">
              <Alert className="Alert" id="alertMail"theme="danger"><p className="Basic-text">Неверный формат электронной почты!</p></Alert>
            </Col>
          </Row>

          <Row className="tableRow">
            <Col  lg="4">
              <FormInput id="phoneNumberFormInput" type="number" placeholder="Телефон"></FormInput>
            </Col>
            <Col  lg="4">
              <Alert id="alertNumber" theme="danger"><p className="Basic-text">Неверный формат номера телефона!</p></Alert>
            </Col>
          </Row>

          <Row>
            <Col  lg="8">
              <Alert className="Alert" id="alertMailNumber" theme="danger"><p className="Basic-text">Необходимо указать номер телефона или адрес электронной почты!</p></Alert>
            </Col>
          </Row>

          <Row className="tableRow">
            <Col sm="8" lg="2"><p className="Basic-text">Пол:</p></Col>
            <Col lg="4">
              <Container>
                <Row>
                  <Col>
                    <FormRadio name="gender"><p className="Basic-text">мужской</p></FormRadio>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormRadio name="gender"><p className="Basic-text">женский</p></FormRadio>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormRadio name="gender"><p className="Basic-text">предпочитаю не указывать</p></FormRadio>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col lg="8">
              <Alert id="alertGender" theme="danger"><p className="Basic-text">Необходимо указать пол!</p></Alert>
            </Col>
          </Row>

          <Row>
            <Col sm="2" md="2" lg="2"><p>Адрес:</p></Col>
            <Col sm="3" lg="2">
              <FormInput id="cityFormInput" type="text" placeholder="Город"></FormInput>
            </Col>
            <Col sm="3" lg="2">
              <FormInput id="streetFormInput" type="text" placeholder="Улица"></FormInput>
            </Col>
            <Col sm="3" lg="2">
              <FormInput id="buildingFormInput" type="text" placeholder="Дом"></FormInput>
            </Col>
          </Row>

          <Row>
            <Col sm="3" lg="2">
              <FormInput id="partFormInput" type="text" placeholder="Корпус"></FormInput>
            </Col>
            <Col sm="3" lg="2">
              <FormInput id="entranceFormInput" type="text" placeholder="Подъезд"></FormInput>
            </Col>
            <Col sm="3" lg="2">
              <FormInput id="apartmentFormInput" type="text" placeholder="Квартира"></FormInput>
            </Col>
          </Row>
          <Row>
            <Col lg="8">
              <Alert id="alertAddress" theme="danger"><p className="Basic-text">Поля "Город", "Улица" и "Дом" обязательны к заполнению!</p></Alert>
            </Col>
          </Row>

          <Row className="tableRow">
            <Col sm="3" md="4" lg="3"><p>Дата рождения</p></Col>
            <Col sm="9" md="8" lg="5"><FormInput id="bdayFormInput" type="date"></FormInput></Col>
          </Row>
          <Row>
            <Col lg="8">
              <Alert id="alertBDay" theme="danger"><p className="Basic-text">Необходимо указать корректную дату рождения!</p></Alert>
            </Col>
          </Row>

          <Row className="tableRow">
            <Col lg="3">
              <p>Направление</p>
            </Col>
            <Col lg="5">
              <FormSelect>
                <option value="first">Системная аналитика</option>
                <option value="second">DevOps</option>
                <option value="third">FrontEnd</option>
                <option value="fourth">BackEnd</option>
              </FormSelect>
            </Col>
          </Row>

          <Row><p>Места работы:</p></Row>
          <Row>
              {workplaces}
          </Row>
          <Row>
            <Button
              onClick={() => {
                setWorkplaces([...workplaces,<Workplace />]);
                populateStorage();
                }
              }>+ Добавить</Button>
          </Row>

          <Row>
            <Col lg="8">
              <p>Дополнительные сведения</p>
              <FormTextarea id="infoFormTextArea"></FormTextarea>
            </Col>
          </Row>
          
          <Row>
            <Col lg="8">
              <Button theme="success" onClick={() => {
                    makeCheck();
                  }
                }>✓ Сохранить</Button>
            </Col>
            
          </Row>
        </Container>
        
        <hr></hr>
        <p className="Basic-text">Задание для участников демо-дня (front-end) Sberbank</p>
        <p className="Basic-text">by Сергей Шевченко</p>
      </header>
    </div>
  );
}

export default App;

