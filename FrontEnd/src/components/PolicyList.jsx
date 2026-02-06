import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { policiesService } from '../services/api';

const PolicyList = () => {
    const [polizas, setPolizas] = useState([]);

    useEffect(() => {
        loadPolizas();
    }, []);

    const loadPolizas = async () => {
        try {
            const result = await policiesService.get('/polizas');
            setPolizas(result.data);
        } catch (error) {
            console.error("Error loading policies", error);
        }
    };

    return (
        <div className="px-4 py-3">
            <h2 className="mb-4">Lista de Pólizas</h2>
            <Link className="btn btn-primary mb-3" to="/polizas/new">Emitir Póliza</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Número</th>
                        <th>Cliente ID</th>
                        <th>Plan ID</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Estado</th>
                        <th>Prima Mensual</th>
                    </tr>
                </thead>
                <tbody>
                    {polizas.map((poliza) => (
                        <tr key={poliza.id}>
                            <td>{poliza.id}</td>
                            <td>{poliza.numeroPoliza}</td>
                            <td>{poliza.clienteId}</td>
                            <td>{poliza.planId}</td>
                            <td>{poliza.fechaInicio}</td>
                            <td>{poliza.fechaFin}</td>
                            <td>{poliza.estado}</td>
                            <td>{poliza.primaMensual}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PolicyList;
