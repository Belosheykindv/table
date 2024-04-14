import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import { createSelector } from "@reduxjs/toolkit";
import { checkAllWorkers, deleteWorker, resetCheckedWorkers, checkWorker, workerFirstNameChange, workerLastNameChange, workerPositionhange, workersType } from "../reduxStore/tablesReducer.ts";
import s from './companies.module.css'
import InfiniteScroll from "react-infinite-scroll-component";

const selectedCompanies = (state: RootState) => state.tables
const companiesMemoSelector = createSelector(selectedCompanies, tables => tables.companies.filter((el) => el.isSelected === true))

const WorkersList = () => {
    const [count, setCount] = useState(48)
    const checkedCompanies = useSelector(companiesMemoSelector)
    const allWorkersChecked = useSelector((store: RootState) => store.tables.allWorkersChecked)
    const dispatch = useDispatch()
    const onChecked = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(checkWorker(e.currentTarget.id))
    }
    const onDelete = () => {
        dispatch(deleteWorker())
        dispatch(resetCheckedWorkers())
    }
    const onAllChecked = () => {
        dispatch(checkAllWorkers())
    }
    const onFirstNameTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(workerFirstNameChange([e.currentTarget.id, e.currentTarget.value]))
        console.log('e - ', e.currentTarget)
    }
    const onLastNameTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(workerLastNameChange([e.currentTarget.id, e.currentTarget.value]))
    }
    const onPositionTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(workerPositionhange([e.currentTarget.id, e.currentTarget.value]))
    }
    const fetchMoreData = () => {
        setTimeout(() => {
            setCount(count => count + 10)
        }, 400);
    };
    let newArr: workersType[] = []
    checkedCompanies.forEach((el1) => el1.workers.forEach((el2) => newArr.push(el2)))
    let scrolledWorkers = newArr.filter((_, index) => index < count).map((el: workersType, index) =>
        <div key={el.id + 'worker'} >
            {<div className={el.isSelected ? s.activeItem : s.tableItem}>
                <div className={s.checkBox}><input type="checkbox" id={el.id} checked={el.isSelected} onChange={onChecked} /></div>
                <input onChange={onFirstNameTextChange} tabIndex={index} className={s.name} value={el.firstName} id={el.id} />
                <input onChange={onLastNameTextChange} tabIndex={index} className={s.adress} value={el.lastName} id={el.id} />
                <input onChange={onPositionTextChange} tabIndex={index} className={s.workersCount} value={el.position} id={el.id} />
            </div>}
        </div>)
    return <div>
        <div className={s.toolsBlock}>
            <div style={{ opacity: '0' }}> <input type="checkbox" checked={allWorkersChecked} onChange={onAllChecked} disabled={scrolledWorkers.length === 0} id={'checkAllWorkersBox'} /></div>
            <div> <label htmlFor="checkAllWorkersBox" > Check ALL</label></div>
            <div>  <button disabled={scrolledWorkers.length === 0} onClick={onDelete}>Удалить</button></div>
        </div>
        <div>
            <div className={s.header}>
                <div><input type="checkbox" /></div>
                <div className={s.headerWName}>First Name</div>
                <div className={s.headerWAdress}>Last Name</div>
                <div className={s.headerWWorkers}>Position</div>
            </div>
            {scrolledWorkers.length === 0
                ? ''
                : <InfiniteScroll
                    dataLength={scrolledWorkers.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>...Loadin...</h4>}
                    style={{ overflow: 'hidden' }}
                >
                    {scrolledWorkers}
                </InfiniteScroll>}
        </div>
    </div >
}

export default WorkersList