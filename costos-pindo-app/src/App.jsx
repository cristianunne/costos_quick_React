import { useEffect, useState } from 'react'

import Empresas from './components/Empresas';
import TabLeftContainer from './components/tab-left-container/TabLeftContainer';

import { GlobalContext, GlobalDataContext, ItemsGlobalContext, QueryGlobalContext, SelectedQueryGlobalContext } from './context/GlobalContext';

import '../src/styles/DateHeader/dateheader.css'
import '../src/styles/CostosContainer/CostosContainer.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YearsListContainer from './components/date-header/YearsListContainer';
import { getYearsAPI } from './utility/Querys';
import HeadersYearsPlaceholder from './components/placeholders/HeadersYearsPlaceholder';
import MonthListContainer from './components/month-header/MonthListContainer';
import CostosTableContainer from './components/costos/CostosTableContainer';
import ResumenMain from './components/costos/Resumen/ResumenMain';

import YearsResumenGraphContainer from './components/costos/GraphContainer/YearsResumenGraphContainer';



function App() {

   const [rodalReload, setRodalReload] = useState(false);
   const [reloadEmpresa, setReloadEmpresa] = useState(false);
   const [numberActive, setNumberActive] = useState(0);

   const [itemsSelected, setItemsSelected] = useState([]);
   const [reloadSelected, setReloadSelected] = useState();

   const [yearsSelected, setYearsSelected] = useState([]);

   //array utilizado para pintar los years presentes en la carga
   const [yearsPresent, setYearsPresent] = useState([]);
   const [isYearPresent, setIsYearPresent] = useState(false);
   const [yearsOfRodalesFilter, setYearsOfRodalesFilter] = useState([]);

   const [monthsSelected, setMonthSelected] = useState([]);
   const [monthsPresent, setMonthsPresent] = useState([]);
   const [isMonthPresent, setIsMonthPresent] = useState([]);

   const [empresasSelected, setEmpresasSelected] = useState([]);
   const [materialesSelected, setMaterialesSelected] = useState([]);


   const [yearsData, setYearsData] = useState([]);
   const [yearsState, setYearsState] = useState(false);


   //estados globales de los datos query
   const [pages, setPages] = useState(0);
   const [numberData, setNumberData] = useState(0);
   const [dataCostos, setDataCostos] = useState([]);
   const [dataCostosDinamic, setDataCostosDinamic] = useState([]);
   const [resumenCostos, setResumenCostos] = useState([]);
   const [reloadResumenCostos, setReloadResumenCostos] = useState(false);
   const [isLoadingResumenCostos, setIsLoadingResumenCostos] = useState(false);

   const [materialesCurrent, setMaterialesCurrent] = useState([]);
   const [materialesReload, setMaterialesReload] = useState(false);
   const [statusMateriales, setStatusMateriales] = useState(false);


   const [isLoadingTcostos, setIsLoadingTcostos] = useState(false);
   const [currentPageCostos, setCurrentPageCostos] = useState(1);

   const [materiales, setMateriales] = useState([]);

   //creo los estados de los querys globales
   const [ queryRodales, setQueryRodales] = useState(false);
   const [ queryYears, setQueryYears] = useState(false);
   const [ queryMonth, setQueryMonth] = useState(false);
   const [ queryMateriales, setQueryMateriales] = useState(false);



   const getYears = async () => {

      const years_result = await getYearsAPI();

      if (years_result) {
         setYearsState(true);
         setYearsData(years_result);

      }

   }


   useEffect(() => {

      if (!yearsState) {

         getYears();

      }

   });

   return (
      <div className="page-wrapper">

         <GlobalContext.Provider value={{ rodalReload, setRodalReload, reloadEmpresa, setReloadEmpresa, 
            numberActive, setNumberActive }}>
            <ItemsGlobalContext.Provider value={{
               itemsSelected, setItemsSelected,
               reloadSelected, setReloadSelected,
               empresasSelected, setEmpresasSelected
            }}>

               <QueryGlobalContext.Provider value={{
                  yearsSelected, setYearsSelected,
                  yearsPresent, setYearsPresent,
                  isYearPresent, setIsYearPresent,
                  monthsSelected, setMonthSelected,
                  monthsPresent, setMonthsPresent,
                  isMonthPresent, setIsMonthPresent,
                  materialesSelected, setMaterialesSelected
               }}>

                  <GlobalDataContext.Provider value={{pages, setPages, 
                  numberData, setNumberData, 
                  dataCostos, setDataCostos,
                  dataCostosDinamic, setDataCostosDinamic, 
                  isLoadingTcostos, setIsLoadingTcostos, 
                  currentPageCostos, setCurrentPageCostos, 
                  materiales, setMateriales, 
                  resumenCostos, setResumenCostos, 
                  reloadResumenCostos, setReloadResumenCostos, 
                  isLoadingResumenCostos, setIsLoadingResumenCostos, 
                  materialesCurrent, setMaterialesCurrent, 
                  materialesReload, setMaterialesReload, 
                  statusMateriales, setStatusMateriales}}>

                     <SelectedQueryGlobalContext.Provider value={{
                        queryRodales, setQueryRodales,
                        queryYears, setQueryYears,
                        queryMonth, setQueryMonth,
                        queryMateriales, setQueryMateriales
                     }}>

                  <div className="container" id="container">

                     <div className="row" id='row-container'>
                        <div className="col-lg-2" id='left-container'>
                           <TabLeftContainer></TabLeftContainer>

                        </div>

                        <div className="col-lg-10 d-flex flex-column" id='main-container'>
                           <div className="row pb-3 bg-dark">

                                 {!yearsState ? <HeadersYearsPlaceholder></HeadersYearsPlaceholder> :
                                       <YearsListContainer years_data={yearsData}></YearsListContainer>}

                                    <MonthListContainer></MonthListContainer>
                           
                           </div>

                           <div className="row" id='costos-container'>
                              <div className="col-lg-12 mb-5">
                                <div className="row">
                                    <div className="col-lg-8">
                                       <div className="col-12">
                                          <div className="card">
                                             <div className="card-body">
                                                <div id="chart-tasks-overview">
                                                  
                                                  <YearsResumenGraphContainer></YearsResumenGraphContainer>

                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-lg-4">
                                       <ResumenMain></ResumenMain>
                                    </div>
                                </div>
                              </div>

                              <div className="col-lg-12">
                                 <CostosTableContainer></CostosTableContainer>
                              </div>

                            

                           </div>

                        </div>

                     </div>
                  </div>
                  </SelectedQueryGlobalContext.Provider>
                  </GlobalDataContext.Provider>


                
               </QueryGlobalContext.Provider >
            </ItemsGlobalContext.Provider>
         </GlobalContext.Provider>

      

         <ToastContainer />

         

      </div>
   )
}

export default App
