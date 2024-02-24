import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { GlobalDataContext } from '../../../context/GlobalContext';



const CostosTable = ({reloadTable, setReloadTable}) => {


    const { pages, setPages,
        numberData, setNumberData,
        dataCostos, setDataCostos, isLoadingTcostos, setIsLoadingTcostos, 
        currentPageCostos, setCurrentPageCostos } = useContext(GlobalDataContext);

    const [items, setItems] = useState([]);
    
    const number_paginas = 10000;

    const createItems = () => {

        let items_ = [];
        dataCostos.forEach((element, index) => {

            items_.push(<tr key={index}>   
                                <td>{currentPageCostos == 1 ? index + 1 : 
                                index + ((currentPageCostos * number_paginas) - number_paginas) + 1}</td>
                                <td>{element.budat}</td>
                                <td>{element.kstar}</td>
                                <td>{element.idempresa}</td>

                                <td>Mark</td>
                                <td>{element.rodal}</td>
                                <td>{element.maktx}</td>

                                <td>{element.cuentacontable}</td>
                                <td>{element.dmbtr}</td>
                                <td>Otto</td>
                                <td>@mdo</td>

                                <td>{element.bltxt}</td>
                                <td>{element.name}</td>
                        </tr>);
            
        });

        setItems(items_);

    }


    useEffect(() => {
        createItems();
        console.log('recargo las tablas');
    }, [dataCostos]);


    return (
        <Table striped bordered hover>
            <thead className="sticky-top top-0">
                <tr>
                    <th className="dt-center text-center">#</th>
                    <th className="dt-center text-center">Fecha</th>
                    <th className="dt-center text-center">Kstar</th>
                    <th className="dt-center text-center">ID Empresa</th>

                    <th className="dt-center text-center">Centro de Costos</th>
                    <th className="dt-center text-center">Rodal</th>
                    <th className="dt-center text-center">Maktx</th>

                    <th className="dt-center text-center">Cuenta Contable</th>
                    <th className="dt-center text-center">Imputado</th>
                    <th className="dt-center text-center">Unidades</th>
                    <th className="dt-center text-center">Valor de Unidad</th>

                    <th className="dt-center text-center">Bltxt</th>
                    <th className="dt-center text-center">Proveedor</th>
                </tr>
            </thead>

            <tbody>
                {items}
               
            </tbody>


        </Table>
    )
}

export default CostosTable