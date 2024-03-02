import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import CostosTable from './principalTable/CostosTable'
import { GlobalDataContext } from '../../context/GlobalContext';
import TableCostosPlaceholder from '../placeholders/costos/TableCostosPlaceholder';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem'
import Paginator from './Paginator';

import '../../styles/CostosContainer/CostosContainer.css'

const CostosTableContainer = () => {
    const { pages, setPages,
        numberData, setNumberData,
        dataCostos, setDataCostos, isLoadingTcostos, setIsLoadingTcostos,
        currentPageCostos, setCurrentPageCostos } = useContext(GlobalDataContext);

    const [reloadTable, setReloadTable] = useState(false);
    const [reload, setReload] = useState(false);
   




    useEffect(() => {

        setReloadTable(!reloadTable);
        setReload(!reload);

    }, [numberData, currentPageCostos]);

    return (
        <>
            {!isLoadingTcostos ? <TableCostosPlaceholder></TableCostosPlaceholder> :

                <Card className='card-costos-container mb-5'>
                    <Card.Header><h3 className='text-blue'>Gastos por Movimientos de Materiales</h3></Card.Header>
                    <Card.Body className='card-body-costos-container'>
                        <CostosTable reloadTable={reloadTable} setReloadTable={setReloadTable}></CostosTable>
                    </Card.Body>
                    <Card.Footer className="text-muted d-flex justify-content-between" id='card-footer-costos'>

                        <div className='d-flex align-items-center'>Mostrando {10} de {numberData} registros</div>

                        <Paginator reloadTable={reloadTable} 
                        setReloadTable={setReloadTable}></Paginator>
                       
                    </Card.Footer>
                </Card>
            }
        </>
    )
}

export default CostosTableContainer