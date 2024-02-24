import React, { useContext, useEffect, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem'
import { getDataCostosFunction } from '../QuerysFunctions';
import { GlobalDataContext, ItemsGlobalContext } from '../../context/GlobalContext';



const Paginator = ({reloadTable, setReloadTable}) => {


    const { itemsSelected, setItemsSelected, reloadSelected, setReloadSelected, 
        empresasSelected, setEmpresasSelected } = useContext(ItemsGlobalContext);

    const { pages, setPages,
            numberData, setNumberData,
            dataCostos, setDataCostos, isLoadingTcostos, setIsLoadingTcostos, 
            currentPageCostos, setCurrentPageCostos } = useContext(GlobalDataContext);

    //creoun estado para manejar laposision del widget pgae actual
    const [currentPageWidget, setCurrentPageWidget] = useState(1);
    const [numberPageWidget, setNumberPageWidget] = useState(1);

    const [items, setItems] = useState([]);


    const number_pages_show = 30

    const onClickInPage = async (page) => {

        setIsLoadingTcostos(false);

        let page_ = parseInt(page.target.text);

     

        setCurrentPageCostos(page_);

        /*setTimeout(()=> {
            setIsLoadingTcostos(true);
        }, 3000);*/

     
        //Traigo los datos y reconstruyo las tablas
        const dataCostos_ = await getDataCostosFunction(itemsSelected, [], [], page_);


        setDataCostos(dataCostos_);
        setIsLoadingTcostos(true);

    

       
    }

    const onClickPrevious = () => {

       
        if(currentPageWidget > 1){

            //consulto si es el ultimo

            let res_ = currentPageWidget - 1;
            setCurrentPageWidget(res_);

        }

      
    }

    const onClickFirst = () => {
        //tengo que aumentar una pagina
        setCurrentPageWidget(1);
    }

    const onClickNext = () => {

        //tengo que aumentar una pagina
        if((currentPageWidget + 1) <= numberPageWidget){

            let res_ = currentPageWidget + 1;
            setCurrentPageWidget(res_);
        }

        
    }


    const onClickLast = () => {

        //tengo que aumentar una pagina
       
        setCurrentPageWidget(numberPageWidget);
        
    }

   

    const createPages = () => {


        let pagesPaginator = null; //variable utilizada para saber cuantas paginas muestra en el widget

        let mod_page_pag = pages % number_pages_show;


        let number_pages_in_windget = mod_page_pag == 0 ? (pages / number_pages_show) : 
                                        ((pages - mod_page_pag) / number_pages_show) + 1;

        setNumberPageWidget(number_pages_in_windget);


        //tengo que dividir esa cantidad de paginas en 30 por vista
        
        //tengo un currentPageCostos en el global, tengo que mapear el numero de pagina en el que estoy



        //para construir los limites tengo que delimitar el limite inferior y superior
        //compruebo si estoy enla ultimapagia y asigno el limite superio en base al modulo

        let lim_sup = currentPageWidget == number_pages_in_windget ? 
        pages : (currentPageWidget * number_pages_show)

        //let lim_sup = currentPageWidget * number_pages_show;
        let lim_inf = 0;

        if(currentPageWidget == number_pages_in_windget){

            if(mod_page_pag == 0){
                lim_inf = (lim_sup - number_pages_show) + 1;
            } else {
                lim_inf = (lim_sup - mod_page_pag) + 1;
            }
          
        } else {
            lim_inf = (lim_sup - number_pages_show) + 1;
        }

     

        let items_ = [];

        for (let index = lim_inf; index <= lim_sup; index++) {


            items_.push(<PageItem key={index} active={index === currentPageCostos} onClick={onClickInPage}>
                {index}
            </PageItem>);
            
        }


        setItems(items_);

    }

  


    useEffect(() => {

        console.log('currentPageWidget ' + currentPageWidget);
   
        createPages();
        
        
    }, [currentPageCostos, currentPageWidget]);

    return (
        <Pagination className='mb-0' id='pagination-costos'>
            <Pagination.First onClick={onClickFirst} />
            <Pagination.Prev onClick={onClickPrevious} />

            {items}

            {/*(currentPagePagination * iconsShow) < pagesPagination ?
                <Pagination.Ellipsis /> : null*/

            }
            <Pagination.Next onClick={onClickNext} />
            <Pagination.Last onClick={onClickLast} />
        </Pagination>
    )
}

export default Paginator