import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { plansService } from '../services/api';

const EditPlan = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [plan, setPlan] = useState({
        nombre: '',
        tipo: 'VIDA',
        primaBase: '',
        coberturaMax: ''
    });

    useEffect(() => {
        loadPlan();
    }, []);

    const loadPlan = async () => {
        try {
            const result = await plansService.get(`/planes/${id}`);
            setPlan(result.data);
        } catch (error) {
            console.error("Error loading plan", error);
            alert("Error al cargar el plan");
        }
    };

    const handleChange = (e) => {
        setPlan({
            ...plan,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await plansService.put(`/planes/${id}`, plan);
            alert("Plan actualizado exitosamente");
            navigate('/planes');
        } catch (error) {
            console.error("Error updating plan", error);
            alert("Error al actualizar el plan");
        }
    };

    return (
        <div className="px-4 py-3">
            <h2 className="mb-4">Editar Plan</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={plan.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo</label>
                    <select
                        className="form-control"
                        name="tipo"
                        value={plan.tipo}
                        onChange={handleChange}
                        required
                    >
                        <option value="VIDA">VIDA</option>
                        <option value="AUTO">AUTO</option>
                        <option value="SALUD">SALUD</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Prima Base</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="primaBase"
                        value={plan.primaBase}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cobertura Máxima</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="coberturaMax"
                        value={plan.coberturaMax}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/planes')}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditPlan;
