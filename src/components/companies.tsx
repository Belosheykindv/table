import React, { useState, useCallback, useEffect, JSXElementConstructor, Component } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import { chechAllCompany, checkCompany, companyNameChange, companyAdressChange, deleteCompany, resetCheckedCompanies } from "../reduxStore/tablesReducer.ts";
import s from './companies.module.css'
import InfiniteScroll from 'react-infinite-scroll-component';
const CompaniesList= () => {
    const companies = useSelector((store: RootState) => store.tables)
    const [count, setCount] = useState(45)
    const dispatch = useDispatch()

    const onChecked = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        dispatch(checkCompany(e.currentTarget.tabIndex))
    }, [])
    const onDelete = (e) => {
        dispatch(deleteCompany(e.currentTarget.id))
        dispatch(resetCheckedCompanies())
    }
    const onAllChecked = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(chechAllCompany(e.currentTarget.tabIndex))
    }
    const onNameTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(companyNameChange([e.currentTarget.tabIndex, e.currentTarget.value]))
    }

    const onAdressTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(companyAdressChange([e.currentTarget.tabIndex, e.currentTarget.value]))
    }
    const fetchMoreData = () => {
        setTimeout(() => {
            setCount(count => count + 10)
        }, 0);
    };
    let scrolledCompanies = companies.companies.filter((_, index) => index < count)

    return <div>
        <div className={s.toolsBlock}>
            <div> <input type="checkbox" checked={companies.allCompaniesChecked} onChange={onAllChecked} tabIndex={scrolledCompanies.length} /></div>
            <div>  Check ALL</div>
            <div>  <button onClick={onDelete}>Удалить</button></div>
        </div>
        <div>
            <div className={s.header}>
                <div className={s.headerCheckBox}><input type="checkbox" /></div>
                <div className={s.headerName}>Company Name</div>
                <div className={s.headerAdress}>Adress</div>
                <div className={s.headerWorkers}>Workers</div>
            </div>
            <InfiniteScroll
                dataLength={scrolledCompanies.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                style={{ overflow: 'hidden' }}
                scrollThreshold={1}
            >
                {scrolledCompanies.map((el, index) =>
                    <div key={el.id} className={el.isSelected ? s.activeItem : s.tableItem}>
                        <div className={s.checkBox}><input type="checkbox" id={el.id} tabIndex={index} checked={el.isSelected} onChange={onChecked} /></div>
                        <input onChange={onNameTextChange} tabIndex={index} className={s.name} value={el.name} />
                        <input onChange={onAdressTextChange} tabIndex={index} className={s.adress} value={el.adress} />
                        <div id={el.id} className={s.workersCount}>{el.workers.length}</div>
                    </div>)}
            </InfiniteScroll>

        </div>
    </div>
}

export default CompaniesList