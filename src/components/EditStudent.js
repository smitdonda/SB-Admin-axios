import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useParams,useNavigate} from 'react-router-dom';


function EditStudent() {
 
    let params = useParams();
    let navigate = useNavigate();
    let [name,setName]=useState("");
    let [email,setEmail]=useState("");
    let [mobile,setMobile]=useState("");
    let [cls,setCls]=useState("");
    let url = "https://61ee2173d593d20017dbac6e.mockapi.io/students/"


    useEffect(()=>{
        getData()
    },[])

    let getData =async()=>{
        await fetch(url+params.id)
        .then(response=>response.json())
        .then (res => {
            setName(res.name)
            setEmail(res.email)
            setMobile(res.mobile)
            setCls(res.class)   
        })
        .catch(err => {
            console.log(err)
        })
       
    }

    let handleSubmit = async()=>{
        await fetch (url+params.id,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                mobile,
                class:cls
            })        


        })
        .then(response=>response.json())
        .then(res=>{
            navigate("/all-students")
        })
        .catch(err=>{
            console.log(err)
        })


    }

    return (
        <Form>

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control value={name} type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control value={email} type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Mobile</Form.Label>
                <Form.Control value={mobile} type="text" placeholder="Mobile" onChange={(e)=>setMobile(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Class</Form.Label>
                <Form.Control value={cls} type="text" placeholder="Class" onChange={(e)=>setCls(e.target.value)}/>
            </Form.Group>
  
            <Button variant="primary" onClick={handleSubmit}>   
                Update
            </Button>
        </Form>
    )
}

export default EditStudent