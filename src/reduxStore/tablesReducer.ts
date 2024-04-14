
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { v1 } from "uuid"
import { companiesMockData } from "../miscData/companiesMockData.ts"
export type companiesType = {
    isSelected?: boolean,
    name: string,
    adress: string,
    workers: workersType[],
    id: string

}
export type workersType = {
    isSelected?: boolean,
    lastName?: string,
    firstName?: string,
    position?: string,
    id: string,
    name?: string
}
type initialStateType = {
    companies: Array<companiesType>
    allCompaniesChecked: boolean,
    allWorkersChecked: boolean,
    checkedCompanies: string[],
    checkedWorkers: string[],

}


const initialState: initialStateType = {
    companies: companiesMockData,
    allCompaniesChecked: false,
    allWorkersChecked: false,
    checkedCompanies: [],
    checkedWorkers: [],
}
const tablesPageSliceReducer = createSlice({
    name: 'profilePageSlice',
    initialState,
    reducers: {
        addCompany: (state, action: PayloadAction<companiesType>) => {
            let newCompany: companiesType = {
                isSelected: false,
                adress: action.payload.adress,
                id: v1(),
                name: action.payload.name,
                workers: []
            }

            return {
                ...state,
                companies: [...state.companies, newCompany],
            }
        },
        addWorker: (state, action: PayloadAction<workersType>) => {
            let newWorker: workersType = {
                isSelected: false,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                position: action.payload.position,
                id: v1()
            }
            for (let i = 0; i <= state.companies.length - 1; ++i) {
                if (state.companies[i].isSelected === true) {
                    state.companies[i].workers.push(newWorker)
                    return
                }
            }
        },
        checkCompany: (state, action: PayloadAction<any>) => {
            if (action.payload[1] === true) {
                state.companies[action.payload[0]].isSelected = true
                state.checkedCompanies.push(action.payload[0])
            }
            else {
                state.companies[action.payload[0]].isSelected = false
                state.checkedCompanies = state.checkedCompanies.filter(el => el !== action.payload[0])
            }

        },
        checkWorker: (state, action: PayloadAction<string>) => {
            let find;
            for (let i = 0; i <= state.companies.length - 1; ++i) {
                find = state.companies[i].workers.find(el => el.id === action.payload)
                if (find) {
                    state.checkedWorkers.push(action.payload)
                    find.isSelected = !find.isSelected
                    return
                }
            }
        },
        checkAllWorkers: (state) => {
            state.allWorkersChecked = !state.allWorkersChecked
            for (let i = 0; i <= state.companies.length - 1; ++i) {
                if (state.companies[i].isSelected === true) {
                    if (state.allWorkersChecked === true) {
                        state.companies[i].workers.forEach(el => el.isSelected = true)
                    } else { state.companies[i].workers.forEach(el => el.isSelected = false) }
                }
            }
        },
        chechAllCompany: (state, action) => {
            state.allCompaniesChecked = !state.allCompaniesChecked
            if (state.allCompaniesChecked === true) {
                for (let i = 0; i <= action.payload - 1; ++i) {
                    state.companies[i].isSelected = true
                }
            } else {
                for (let i = 0; i <= action.payload - 1; ++i) {
                    state.companies[i].isSelected = false
                    state.checkedCompanies = []
                }
            }
        },
        deleteCompany: (state) => {
            let newArr = state.companies.filter((el) => el.isSelected === false)
            return { ...state, companies: [...newArr], allCompaniesChecked: false }
        },
        deleteWorker: (state) => {
            for (let i = 0; i <= state.companies.length - 1; ++i) {
                if (state.companies[i].isSelected === true) {
                    state.allWorkersChecked = false
                    let aliveWorkers = state.companies[i].workers.filter(el => el.isSelected === false)
                    state.companies.forEach((el) =>
                        el.isSelected === true,
                        state.companies[i].workers = aliveWorkers)
                }
            }

        },
        resetCheckedCompanies: (state) => {
            state.checkedCompanies = []
        },
        resetCheckedWorkers: (state) => {
            state.checkedWorkers = []
        },
        companyNameChange: (state, action) => {
            state.companies[action.payload[0]].name = action.payload[1]
        },
        companyAdressChange: (state, action) => {
            state.companies[action.payload[0]].adress = action.payload[1]
        },
        workerFirstNameChange: (state, action: PayloadAction<string[]>) => {
            let selectedWorker: workersType | undefined;
            for (let i = 0; i <= state.companies.length - 1; ++i) {
                selectedWorker = state.companies[i].workers.find(el => el.id === action.payload[0])
                if (selectedWorker) {
                    selectedWorker.firstName = action.payload[1]
                    return
                }
            }

        },
        workerLastNameChange: (state, action: PayloadAction<string[]>) => {
            for (let i = 0; i <= state.companies.length - 1; ++i) {
                let selectedWorker = state.companies[i].workers.find(el => el.id === action.payload[0])
                if (selectedWorker) {
                    selectedWorker.lastName = action.payload[1]
                    return
                }
            }

        },
        workerPositionhange: (state, action: PayloadAction<string[]>) => {
            for (let i = 0; i <= state.companies.length - 1; ++i) {
                let selectedWorker = state.companies[i].workers.find(el => el.id === action.payload[0])
                if (selectedWorker) {
                    selectedWorker.position = action.payload[1]
                    return
                }
            }
        }

    }
})

export const {
    addCompany, addWorker, checkCompany, checkWorker, chechAllCompany, checkAllWorkers, deleteCompany, deleteWorker,
    resetCheckedCompanies, resetCheckedWorkers, companyNameChange, companyAdressChange, workerFirstNameChange, workerLastNameChange, workerPositionhange
} = tablesPageSliceReducer.actions
export default tablesPageSliceReducer.reducer