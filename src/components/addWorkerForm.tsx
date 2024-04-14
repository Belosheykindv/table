import React from "react";
import { useForm } from "react-hook-form";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { addWorker, workersType } from '../reduxStore/tablesReducer.ts'
const AddWorker = () => {
    const dispatch = useDispatch()
    const { control, handleSubmit, reset, register } = useForm<workersType>({ mode: "onChange" })
    const onSubmit = (data: workersType) => {
        dispatch(addWorker(data))
        reset()
    }
    return <div>
        <form onSubmit={handleSubmit(onSubmit)} >
            <input placeholder="First Name" {...register("firstName")} required={true}></input>
            <input placeholder="Last Name" {...register("lastName")} required={true}></input>
            <input placeholder="Position" {...register("position")} required={true}></input>
            <button type='submit'> Добавить</button>
        </form>
    </div >
}

export default AddWorker