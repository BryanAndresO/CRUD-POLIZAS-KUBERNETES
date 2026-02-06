import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { policiesService, clientsService, plansService } from '../services/api';

const CreatePolicy = () => {
    let navigate = useNavigate();
    const [poliza, setPoliza] = useState({
        clienteId: '',
        planId: '',
        fechaInicio: '',
        fechaFin: '',
        primaMensual: '',
        estado: 'ACTIVA'
    });

    const [clientes, setClientes] = useState([]);
    const [planes, setPlanes] = useState([]);

    useEffect(() => {
        loadClientes();
        loadPlanes();
    }, []);

    const loadClientes = async () => {
        const result = await clientsService.get('/clientes');
        setClientes(result.data);
    };

    const loadPlanes = async () => {
        const result = await plansService.get('/planes');
        setPlanes(result.data);
    };

    const onInputChange = (e) => {
        setPoliza({ ...poliza, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Formatear fechas para asegurar comparación correcta
        const start = new Date(poliza.fechaInicio);
        const end = new Date(poliza.fechaFin);

        if (end <= start) {
            alert("La fecha de fin debe ser posterior a la fecha de inicio");
            return;
        }

        try {
            await policiesService.post('/polizas', poliza);
            navigate('/polizas');
        } catch (error) {
            console.error("Error creating policy", error);
            alert("Error al emitir póliza");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Emitir Póliza</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="clienteId" className="form-label">Cliente</label>
                            <select className="form-select" name="clienteId" value={poliza.clienteId} onChange={onInputChange} required>
                                <option value="">Seleccione un Cliente</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nombres} ({cliente.identificacion})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="planId" className="form-label">Plan</label>
                            <select className="form-select" name="planId" value={poliza.planId} onChange={onInputChange} required>
                                <option value="">Seleccione un Plan</option>
                                {planes.map((plan) => (
                                    <option key={plan.id} value={plan.id}>
                                        {plan.nombre} - {plan.tipo}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fechaInicio" className="form-label">Fecha Inicio</label>
                            <input type="date" className="form-control" name="fechaInicio" value={poliza.fechaInicio} onChange={onInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fechaFin" className="form-label">Fecha Fin</label>
                            <input type="date" className="form-control" name="fechaFin" value={poliza.fechaFin} onChange={onInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="primaMensual" className="form-label">Prima Mensual</label>
                            <input type="number" step="0.01" className="form-control" name="primaMensual" value={poliza.primaMensual} onChange={onInputChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary btn-outline-light">Emitir</button>
                        <button type="button" className="btn btn-secondary mx-2" onClick={() => navigate('/polizas')}>Cancelar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePolicy;
