import React from "react";
import { useForm } from "react-hook-form";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { addCompany, companiesType } from '../reduxStore/tablesReducer.ts'
const AddCompanyForm = () => {
    const dispatch = useDispatch()
    const { control, handleSubmit, reset, register, formState: { errors } } = useForm<companiesType>({ mode: "onChange" })
    const onSubmit = (data: companiesType) => {
        dispatch(addCompany(data))
        reset()
    }
    return <div>
        <form onSubmit={handleSubmit(onSubmit)} >
            <input placeholder="Name" {...register("name")} required={true}></input>
            <input placeholder="Adress" {...register("adress")} required={true}></input>
            <button type='submit'> Добавить</button>
        </form>
    </div >
}

export default AddCompanyForm