
import s from './App.module.css';
import CompaniesList from './components/companies.tsx';
import WorkerList from './components/workers.tsx'
import AddCompanyForm from './components/addCompanyForm.tsx'
import AddWorker from './components/addWorkerForm.tsx'
function App() {

  return (
    <div className={s.mainApp} >
      <h3> тестовое задания</h3>
      <div className={s.addsBlock}>
        <div className={s.addCompany}><AddCompanyForm /></div>
        <div className={s.addWorker}><AddWorker /></div>
      </div>
      <div className={s.tablesBlock}>
        <div className={s.companiesList}>
          <CompaniesList />
        </div>
        <div className={s.workersList}>
          <WorkerList />
        </div>
      </div>
    </div>
  );
}

export default App;
