
import React, { useContext, useEffect, useState } from 'react'
import '../../styles/TabLeftContainer/TabLeftContainer.css'


import ItemTabs from './ItemTabs'
import { ICONOS } from '../../Iconos'
import { getEmpresasAPI, getMaterialesAPI, getRodalesWithEmpresasAPI } from '../../utility/Querys'

import SearchInput from '../search/SearchInput'
import ItemsBoxRodalesContainer from './ItemsBoxRodalesContainer'
import ItemsBoxEmpresasContainer from './ItemsBoxEmpresasContainer'

import { GlobalContext, GlobalDataContext, ItemsGlobalContext } from '../../context/GlobalContext'
import ItemsSelectedTOC from './ItemsSelectedTOC'
import TabLeftPlaceHolder from '../placeholders/TabLeftPlaceHolder'
import ItemsBoxMaterialesContainer from './ItemsBoxMaterialesContainer'



const TabLeftContainer = () => {


  const [rodales, setRodales] = useState([]);
  const [rodalesDinamic, setRodalesDinamic] = useState([]);
  const [rodalesActually, setRodalesActually] = useState([]);


  const [empresas, setEmpresas] = useState([]);
  const [empresasDinamic, setEmpresasDinamic] = useState([]);


  const [materialesDinamic, setMaterialesDinamic] = useState([]);

  const [statusRodales, setStatusRodales] = useState(false);
  const [statusEmpresas, setStatusEmpresas] = useState(false);
  const [busqueda, setBusqueda] = useState();
  const [reloadTab, setReloadTab] = useState(false);

  const [reloadToc, setReloadToc] = useState(false);

  const { rodalReload, setRodalReload, reloadEmpresa, setReloadEmpresa } = useContext(GlobalContext);

  const { itemsSelected, setItemsSelected } = useContext(ItemsGlobalContext);

  const { pages, setPages,
    numberData, setNumberData,
    dataCostos, setDataCostos, isLoadingTcostos, setIsLoadingTcostos,
    currentPageAux, setCurrentPageAux,  materiales, setMateriales } = useContext(GlobalDataContext);








  const getRodalesWithEmpresas = async () => {

    const rodales_data = await getRodalesWithEmpresasAPI();

    if (rodales_data) {
      setRodales(rodales_data);
      setRodalesDinamic(rodales_data);
      setRodalesActually(rodales_data);
      setStatusRodales(true);

      //traigo rodales
      const empresas_data = await getEmpresasAPI();

      if (empresas_data) {

        //console.log(empresas_data);
        setEmpresas(empresas_data);
        setEmpresasDinamic(empresas_data);

        setStatusEmpresas(true);
      }

      //traigo los materiales
      const materiales_data = await getMaterialesAPI();

      

      if(materiales_data){
        setMateriales(materiales_data);
        setMaterialesDinamic(materiales_data);
        
      }

      //console.log(materiales_data);

      


      if (rodalReload) {
        setRodalReload(false);
      } else {
        setRodalReload(true);
      }

      if (reloadEmpresa) {
        setReloadEmpresa(false);
      } else {
        setReloadEmpresa(true);
      }

      if (reloadToc) {
        setReloadToc(false);
      } else {
        setReloadToc(true);
      }


      if (reloadTab) {
        setReloadTab(false);
      } else {
        setReloadTab(true);
      }

    

      //una vez ue me reseulve el rodal recargo las empresas



      return true;
    }

    return false;
  }

  const getEmpresas = async () => {

    const empresas_data = await getEmpresasAPI();

    if (empresas_data) {

      //console.log(empresas_data);
      setEmpresas(empresas_data);
      setEmpresasDinamic(empresas_data);

      setStatusEmpresas(true);

      if (reloadEmpresa) {
        setReloadEmpresa(false);
      } else {
        setReloadEmpresa(true);
      }



      if (reloadTab) {
        setReloadTab(false);
      } else {
        setReloadTab(true);
      }

      return true;
    }

    return false;

  }

  const onChangeBuscarRodales = (event) => {

    let text_busqueda = event.target.value;

    if (text_busqueda != undefined) {

      setBusqueda(text_busqueda);
      filter(text_busqueda, 1);
    }


  }

  const onChangeBuscarEmpresas = (event) => {

    let text_busqueda = event.target.value;

    if (text_busqueda != undefined) {

      setBusqueda(text_busqueda);
      filter(text_busqueda, 2);
    }

  }

  const onChangeBuscarMateriales = (event) => {

    let text_busqueda = event.target.value;

    if (text_busqueda != undefined) {

      setBusqueda(text_busqueda);
      filter(text_busqueda, 3);
    }

  }

  const filter = (textBusqueda, option) => {

    if (option == 1) {

      //hago una copia de los rodales actuales

      //console.log(rodalesActually);


      let resultadoFiltro = rodalesActually.filter((elemento) => {

        if (elemento.objnr.toString().toLowerCase().includes(textBusqueda.toLowerCase())) {
          return elemento;
        }
      })
      setRodales(resultadoFiltro);
      setRodalReload(!rodalReload);


    } else if (option == 2) {

      let resultadoFiltro = empresasDinamic.filter((elemento) => {

        if (elemento.nombre.toString().toLowerCase().includes(textBusqueda.toLowerCase())) {
          return elemento;
        }

      });

      setEmpresas(resultadoFiltro);
      setReloadEmpresa(!reloadEmpresa);

    } else if (option == 3) {
      
      //maktx
     
      let resultadoFiltro = materialesDinamic.filter((elemento) => {
      
          if(elemento.maktg != null){
            if (elemento.maktg.toString().toLowerCase().includes(textBusqueda.toLowerCase())) {
              return elemento;
            }

          }

      });

      setMateriales(resultadoFiltro);
      

    }

  }


  useEffect(() => {


    //consulto por los estados
    //cargo los rodales a partir de las empresas

    //console.log('entretortort');

    if (!statusRodales) {

      getRodalesWithEmpresas();

    }



    if (!statusEmpresas) {

      //getEmpresas();

    }




  }, [reloadTab]);



  return (
    <div className='container' id='sub-tableft-container'>

      <div className="col-12 tab-nav-header">
        <ul className='nav nav-tabs card-header-tabs tabs-header bg-dark'>
          <ItemTabs icono={ICONOS.RODALES} title={'Rodales'} url={'tabs-rodales-ex1'} active_status={true} />
          <ItemTabs icono={ICONOS.EMPRESAS} title={'Empresas'} url={'tabs-empresas-ex2'} active_status={false} />
          <ItemTabs icono={ICONOS.MATERIALES} title={'Materiales'} url={'tabs-materiales'} active_status={false} />


        </ul>

      </div>

      <div className="col-12 tab-content-container">
      <div className="tab-content">
          <div className="tab-pane bg-dark active show scrollbar-color" id="tabs-rodales-ex1">

            {// Agreggo el search aca 
            }
            <SearchInput onChangeBuscar={onChangeBuscarRodales}></SearchInput>
            <div className="hr-text unset-margin mb-4 bg-dark">Rodales</div>

            <div className='items-list-item bg-dark'>

              <div className="list-group list-group-flush bg-dark" id='rodales_items'>

                {statusRodales ?

                  <ItemsBoxRodalesContainer rodales={rodales} status={statusRodales}
                  ></ItemsBoxRodalesContainer>

                  : <TabLeftPlaceHolder></TabLeftPlaceHolder>
                }

              </div>
            </div>
            <div className="hr-text unset-margin mb-4"></div>
          </div>

          <div className="tab-pane bg-dark" id="tabs-empresas-ex2">

            {// Agreggo el search de empresas
            }

            <SearchInput onChangeBuscar={onChangeBuscarEmpresas}></SearchInput>
            <div className="hr-text unset-margin mb-4">Empresas</div>

            <div className='items-list-item'>

              <div className="list-group list-group-flush bg-dark scrollbar-color" id='rodales_items'>

                <ItemsBoxEmpresasContainer empresas={empresas} status={statusEmpresas}
                  rodales={rodales}
                  rodalesDinamic={rodalesDinamic}
                  statusRodales={statusRodales}
                  setRodales={setRodales}
                  setRodalesActually={setRodalesActually}
                >

                </ItemsBoxEmpresasContainer>


              </div>
            </div>

            <div className="hr-text unset-margin mb-5"></div>


          </div>

          <div className="tab-pane bg-dark" id="tabs-materiales">


          <SearchInput onChangeBuscar={onChangeBuscarMateriales}></SearchInput>
          <div className="hr-text unset-margin mb-4">Materiales</div>

          <div className='items-list-item'>

            <div className="list-group list-group-flush bg-dark scrollbar-color" id='rodales_items'>

              <ItemsBoxMaterialesContainer materiales={materiales}>

              </ItemsBoxMaterialesContainer>

             
            </div>
          </div>

          <div className="hr-text unset-margin mb-5"></div>


          </div>
        </div>
 

      </div>

      <div className="col-12 tab-selected-container">

      <ItemsSelectedTOC empresas={empresas} reloadToc={reloadToc}></ItemsSelectedTOC>
     
      </div>








    </div>
  )
}

export default TabLeftContainer