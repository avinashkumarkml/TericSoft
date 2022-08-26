import React, { useEffect, useState } from "react";
import "./form.css";
import axios from "axios"
import FormList from "./FormList";

const Form = () => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    hobbies:[],

  });

  const [outPutData, setOutPutData ] = useState([])

  useEffect(()=>{
    dataFetched()
  },[])

  const dataFetched = ()=>{
    axios.get('http://localhost:8080/users').then((res)=>{
      // console.log(res.data);
      setOutPutData(res.data)
    }).catch((e)=>{
        console.log(e)
    })
  }

  const formChange = (e) => {
    
    const { id, value } = e.target;
    // console.log(id);
    // console.log(value);
    setData({ ...data, [id]: value });
    
  };
  

  const handleCheck = (e) => {
    const { value, checked } = e.target;

    // console.log(value, checked);
    // const{hobbies}=data;

    if(checked) {
        data.hobbies.push(value);
    }
  


  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data)

    axios.post('http://localhost:8080/users', data).then(()=>{
      alert('Data Submitted')
      dataFetched()
    }).catch((e)=>{
        console.log(e)
    })
  };

  return (
    <div>
      <>
        <form action="" id="form">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              onChange={(e) => formChange(e)}
            />
          </div>
          <br />
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => formChange(e)}
            />
          </div>
          <br />
          <div>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={(e) => formChange(e)}
            />
          </div>
          <br />
          <label>Birthday:</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            onChange={(e) => formChange(e)}
          />
          {/* <input type="submit" /> */}
          <p>Please select your gender</p>
          <input type="radio" name="gender" id="gender" onChange={(e) => formChange(e)} value="Male" />
          <label>Male</label>

          <input type="radio" name="gender" id="gender" onChange={(e) => formChange(e)} value="Female" />
          <label>Female</label>
          <br />

          <p>Please select your Hobbies</p>

          <input type="checkbox" name="hobbies" id="hobbies" onChange={(e) => handleCheck(e)} value="Cricket"/>
          <label>Cricket</label>
          <input type="checkbox" name="hobbies" id="hobbies" onChange={(e) => handleCheck(e)} value="Football"/>
          <label>Football</label>
          <input type="checkbox" name="hobbies" id="hobbies" onChange={(e) => handleCheck(e)} value="Music"/>
          <label >Music</label>
          <br />
          <br />

          <button onClick={(e) => handleSubmit(e)}>ADD</button>
        </form>
      </>

      <FormList data={outPutData}/>
    </div>
  );
};

export default Form;
