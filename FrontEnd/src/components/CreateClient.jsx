import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientsService } from '../services/api';

const CreateClient = () => {
    let navigate = useNavigate();
    const [cliente, setCliente] = useState({
        nombres: '',
        identificacion: '',
        email: '',
        telefono: ''
    });

    const { nombres, identificacion, email, telefono } = cliente;

    const onInputChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await clientsService.post('/clientes', cliente);
            navigate('/clientes');
        } catch (error) {
            console.error("Error creating client", error);
            alert("Error al crear cliente");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Registrar Cliente</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombres" className="form-label">Nombres</label>
                            <input type="text" className="form-control" name="nombres" value={nombres} onChange={onInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="identificacion" className="form-label">Identificación</label>
                            <input type="text" className="form-control" name="identificacion" value={identificacion} onChange={onInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={onInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label">Teléfono</label>
                            <input type="text" className="form-control" name="telefono" value={telefono} onChange={onInputChange} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-outline-light">Guardar</button>
                        <button type="button" className="btn btn-secondary mx-2" onClick={() => navigate('/clientes')}>Cancelar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateClient;
