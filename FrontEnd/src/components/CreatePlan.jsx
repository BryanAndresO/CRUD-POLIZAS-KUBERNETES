import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { plansService } from '../services/api';

const CreatePlan = () => {
    let navigate = useNavigate();
    const [plan, setPlan] = useState({
        nombre: '',
        tipo: 'VIDA',
        primaBase: '',
        coberturaMax: ''
    });

    const { nombre, tipo, primaBase, coberturaMax } = plan;

    const onInputChange = (e) => {
        setPlan({ ...plan, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await plansService.post('/planes', plan);
            navigate('/planes');
        } catch (error) {
            console.error("Error creating plan", error);
            alert("Error al crear plan");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Registrar Plan</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre del Plan</label>
                            <input type="text" className="form-control" name="nombre" value={nombre} onChange={onInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tipo" className="form-label">Tipo</label>
                            <select className="form-select" name="tipo" value={tipo} onChange={onInputChange}>
                                <option value="VIDA">VIDA</option>
                                <option value="AUTO">AUTO</option>
                                <option value="SALUD">SALUD</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="primaBase" className="form-label">Prima Base</label>
                            <input type="number" step="0.01" className="form-control" name="primaBase" value={primaBase} onChange={onInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="coberturaMax" className="form-label">Cobertura Max</label>
                            <input type="number" step="0.01" className="form-control" name="coberturaMax" value={coberturaMax} onChange={onInputChange} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-outline-light">Guardar</button>
                        <button type="button" className="btn btn-secondary mx-2" onClick={() => navigate('/planes')}>Cancelar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePlan;
