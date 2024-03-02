import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { GlobalDataContext } from '../../../context/GlobalContext';
import ResumenCostosPlaceHolder from '../../placeholders/costos/ResumenCostosPlaceHolder';




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

const ResumenMain = () => {

    const { pages, setPages,
        numberData, setNumberData,
        dataCostos, setDataCostos, 
        dataCostosDinamic, setDataCostosDinamic,
        isLoadingTcostos, setIsLoadingTcostos,
        resumenCostos, setResumenCostos, 
        reloadResumenCostos, setReloadResumenCostos,
        isLoadingResumenCostos, setIsLoadingResumenCostos } = useContext(GlobalDataContext);

    const [imputado, setImputado] = useState();
    const [unidades, setUnidades] = useState();
    const [valorUnidad, setValorUnidad] = useState();




    useEffect(() => {
       
        const arrFromObj = Object.keys(resumenCostos);

        if(arrFromObj.length > 0){

            let imp_ = resumenCostos[0].suma_imputado != null ? parseFloat(resumenCostos[0].suma_imputado.toString()) : null;
            let uni_ = resumenCostos[0].suma_unidades != null ? parseFloat(resumenCostos[0].suma_unidades.toString()) : null;
            let val_uni = uni_ != null ? imp_/ uni_ : null;

            setImputado(imp_ != null ? imp_.format(2) : null);
            setUnidades(uni_ != null ? uni_.format(2) : null);
            setValorUnidad(val_uni != null ? val_uni.format(2) : null);

        }


    }, [reloadResumenCostos])

    return (
        <>
            {!isLoadingResumenCostos ? <ResumenCostosPlaceHolder></ResumenCostosPlaceHolder>  : 


            <Card className='card-costos-container mb-5'>
                        <Card.Header><h4 className='mb-0 text-blue'>Resumen General de Gastos por Movimientos de Materiales</h4></Card.Header>
                        <Card.Body className='card-body-costos-container'>

                        <Table striped borderless hover>
                            <thead>
                                <tr>
                                <th>Detalle</th>
                                <th className="text-center">$</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="progressbg">
                                    
                                        <div className="progressbg-text fw-bold">Imputado ($)</div>
                                        </div>
                                    </td>
                                    <td className="w-1 text-end">{imputado}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="progressbg">
                                    
                                        <div className="progressbg-text fw-bold">Unidades</div>
                                        </div>
                                    </td>
                                    <td className="w-1 text-end">{unidades}</td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="progressbg">
                                    
                                        <div className="progressbg-text fw-bold">Valor de Unidad ($)</div>
                                        </div>
                                    </td>
                                    <td className="w-1 text-end">{valorUnidad}</td>
                                </tr>
                            
                            </tbody>
                        </Table>
                            
                        </Card.Body>
                    
            </Card>
            }
        </>
    )
}

export default ResumenMain