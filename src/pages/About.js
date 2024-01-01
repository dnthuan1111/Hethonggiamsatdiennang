import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import '../pages/About.css'

const About = () => {
  const [data, setData] = useState({
    Vdc: '00.00',
    Idc: '00.00',
    Pdc: '00.00',
    Edc: '00.00',
    Vac: '00.00',
    Iac: '00.00',
    Pac: '00.00',
    VAac: '00.00',
    Pfac: '00.00',
    Eac: '00.00',
    Fac: '00.00',
  });

  useEffect(() => {
    if (!firebase.apps.length) {
      const firebaseConfig = {
      apiKey: "AIzaSyDD7gx6O7OcVsMIUjGGhmPFTwq01yOurDE",
      authDomain: "giamsatdiennang-d7210.firebaseapp.com",
      databaseURL: "https://giamsatdiennang-d7210-default-rtdb.firebaseio.com",
      projectId: "giamsatdiennang-d7210",
      storageBucket: "giamsatdiennang-d7210.appspot.com",
      messagingSenderId: "183117916306",
      appId: "1:183117916306:web:fcf3f901e58515ade35e4b",
      measurementId: "G-9Q933YM3S5"
    };
    firebase.initializeApp(firebaseConfig);
  }

    const database = firebase.database();

    const updateData = (key) => (snapshot) => {
      const value = snapshot.val();
      setData((prevData) => ({ ...prevData, [key]: value }));
      updateDateTime(key);
    };

    // Lắng nghe sự thay đổi dữ liệu từ Firebase
    const subscribeToFirebase = (key) => {
      database.ref(`/${key}`).on('value', updateData(key));
    };

    // Cập nhật ngày và giờ hiện tại
    const getCurrentDateTime = () => {
      const currentDateTime = new Date();
      const date = currentDateTime.toLocaleDateString('en-US');
      const time = currentDateTime.toLocaleTimeString('en-US');
      return { date, time };
    };

    // Cập nhật giá trị ngày và giờ cho thông số
    const updateDateTime = (key) => {
      const dateTime = getCurrentDateTime();
      const dateId = `${key.toLowerCase()}-date`;
      const timeId = `${key.toLowerCase()}-time`;

      document.getElementById(dateId).textContent = dateTime.date;
      document.getElementById(timeId).textContent = dateTime.time;
    };

    // Đăng ký lắng nghe dữ liệu từ Firebase
    subscribeToFirebase('Vdc');
    subscribeToFirebase('Idc');
    subscribeToFirebase('Pdc');
    subscribeToFirebase('Edc');
    subscribeToFirebase('Vac');
    subscribeToFirebase('Iac');
    subscribeToFirebase('Pac');
    subscribeToFirebase('Pfac');
    subscribeToFirebase('VAac');
    subscribeToFirebase('Eac');
    subscribeToFirebase('Fac');

    return () => {
      // Hủy đăng ký lắng nghe khi component unmount
      database.ref('/').off();
    };
  }, []);
  const getKeyLabel = (key) => {
    switch (key) {
      case 'Vac':
        return 'AC Voltage (Vac)';
      case 'Vdc':
        return 'DC Voltage (Vdc)';
      case 'Iac':
        return 'AC Current (Iac)';
      case 'Idc':
        return 'DC Current (Idc)';
      case 'Pdc':
        return 'DC Power (Wdc)';
      case 'Edc':
        return 'DC Energy (Wh-dc)';
      case 'Pac':
        return 'AC Real Power (Wac)';
      case 'VAac':
        return 'AC Apparent Power (VAac)';
      case 'Pfac':
        return 'Power Factor (Pf)';
      case 'Eac':
        return 'AC Energy (Wh-ac)';
      case 'Fac':
        return 'Frequency (Hz)';
      default:
        return key; // If the key doesn't match any case, return the key itself
    }
  };
  

  return (
    <div>
    <h1></h1>
    <h1></h1>
      <table  className='id-table'>
        <thead>
          <tr>
            <th>Thông số</th>
            <th>Giá trị</th>
            <th>Ngày</th>
            <th>Giờ</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td>{getKeyLabel(key)}</td>
              <td>
                <span id={`final${key}`}>{value}</span>
              </td>
              <td>
                <span id={`${key.toLowerCase()}-date`}>00/00/0000</span>
              </td>
              <td>
                <span id={`${key.toLowerCase()}-time`}>00:00:00</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  };

export default About;
