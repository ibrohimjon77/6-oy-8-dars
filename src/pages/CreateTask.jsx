import { Form } from 'react-router-dom'
import FormInput from '../components/FormInput'
import FromTextArea from '../components/FromTextArea'
import Select from "react-select";
import { useCollection } from '../hooks/useCollection'
import { useEffect, useState } from 'react';

function  CreateTask () {
    const {data} = useCollection("users")
    const [userOptions, setUserOptions] = useState(null)

    useEffect(()=>{
        const users =data?.map((user)=>{
            return { value:user.displayName, label:user.displayName, photoURL:user.photoURL,uid:user.uid}
        })
        setUserOptions(users)
    },[data])
    
    return (
      <Form method="post">
        <FormInput label="Title" name="title" type="text" />
        <FromTextArea label="Description" />
        <FormInput label="Due to:" name="due-to" type="date" />
        <Select
          isMulti
          name="Users"
          options={userOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </Form>
    );
  }

export default CreateTask
