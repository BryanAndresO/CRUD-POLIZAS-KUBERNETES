import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { plansService } from '../services/api';

const PlanList = () => {
    const [planes, setPlanes] = useState([]);

    useEffect(() => {
        loadPlanes();
    }, []);

    const loadPlanes = async () => {
        try {
            const result = await plansService.get('/planes');
            setPlanes(result.data);
        } catch (error) {
            console.error("Error loading plans", error);
        }
    };

    const deletePlan = async (id) => {
        if (window.confirm('¿Seguro que desea eliminar este plan?')) {
            try {
                await plansService.delete(`/planes/${id}`);
                loadPlanes();
            } catch (error) {
                console.error("Error deleting plan", error);
            }
        }
    };

    return (
        <div className="px-4 py-3">
            <h2 className="mb-4">Lista de Planes</h2>
            <Link className="btn btn-primary mb-3" to="/planes/new">Nuevo Plan</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Prima Base</th>
                        <th>Cobertura Max</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {planes.map((plan) => (
                        <tr key={plan.id}>
                            <td>{plan.id}</td>
                            <td>{plan.nombre}</td>
                            <td>{plan.tipo}</td>
                            <td>{plan.primaBase}</td>
                            <td>{plan.coberturaMax}</td>
                            <td>
                                <Link className="btn btn-primary btn-sm me-2" to={`/planes/edit/${plan.id}`}>Editar</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => deletePlan(plan.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlanList;
