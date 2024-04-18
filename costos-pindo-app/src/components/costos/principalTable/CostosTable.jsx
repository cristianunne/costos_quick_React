import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { GlobalDataContext } from '../../../context/GlobalContext';

    /**
 * Number.prototype.format(n, x)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
    Number.prototype.format = function (n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    };


const CostosTable = ({ reloadTable, setReloadTable }) => {



    const { pages, setPages,
        numberData, setNumberData,
        dataCostos, setDataCostos, isLoadingTcostos, setIsLoadingTcostos,
        currentPageCostos, setCurrentPageCostos } = useContext(GlobalDataContext);

    const [items, setItems] = useState([]);

    const number_paginas = 1000;

    const createItems = () => {

        let items_ = [];
        dataCostos.forEach((element, index) => {

            let imputado = parseFloat(element.dmbtr).format(2)
            let unidad = parseFloat(element.mbgbtr).format(2)
            let res = parseFloat(element.mbgbtr) != 0 ? (parseFloat(element.dmbtr) / parseFloat(element.mbgbtr)) : null
            let val_unidad = res != null ? res.format(2) : null;


            let year = element.budat.toString().substr(0, 4);
            let mes = element.budat.toString().substr(4, 2);
            let dia = element.budat.toString().substr(6, 2);


            let fecha = new Date();

            items_.push(<tr key={index}>
                <td className='fw-bold align-middle'>{currentPageCostos == 1 ? index + 1 :
                    index + ((currentPageCostos * number_paginas) - number_paginas) + 1}</td>
                <td className='text-center align-middle nowrap'>{dia + '-' + mes + '-' + year}</td>
                <td className='text-center align-middle'>{element.mesfinanciero}</td>
                <td className='text-center align-middle'>{element.kstar}</td>
                <td className='text-center align-middle'>{element.idempresa}</td>

                <td className='text-center align-middle'>centro costo</td>
                <td className='text-center align-middle'>{element.rodal}</td>
                <td className='text-start align-middle'>{element.maktx}</td>

                <td className='text-center align-middle'>{element.cuentacontable}</td>
                <td className='text-end align-middle'>{imputado}</td>
                <td className='text-end align-middle'>{unidad}</td>
                <td className='text-end align-middle'>{val_unidad}</td>

                <td className='text-center align-middle'>{element.bltxt}</td>
                <td className='text-start align-middle'>{element.name}</td>
            </tr>);

        });

        setItems(items_);

    }


    useEffect(() => {
        createItems();
        //console.log('recargo las tablas');
    }, [dataCostos]);


    return (
        <Table striped bordered hover id='tabla-costos'>
            <thead className="sticky-top top-0">
                <tr>
                    <th className="dt-center text-center">#</th>
                    <th className="dt-center text-center">Fecha</th>
                    <th className="dt-center text-center">Mes Financiero</th>
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