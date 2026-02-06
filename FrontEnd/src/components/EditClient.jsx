import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { clientsService } from '../services/api';

const EditClient = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cliente, setCliente] = useState({
        nombres: '',
        identificacion: '',
        email: '',
        telefono: ''
    });

    useEffect(() => {
        loadCliente();
    }, []);

    const loadCliente = async () => {
        try {
            const result = await clientsService.get(`/clientes/${id}`);
            setCliente(result.data);
        } catch (error) {
            console.error("Error loading client", error);
            alert("Error al cargar el cliente");
        }
    };

    const handleChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await clientsService.put(`/clientes/${id}`, cliente);
            alert("Cliente actualizado exitosamente");
            navigate('/clientes');
        } catch (error) {
            console.error("Error updating client", error);
            alert("Error al actualizar el cliente");
        }
    };

    return (
        <div className="px-4 py-3">
            <h2 className="mb-4">Editar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombres</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombres"
                        value={cliente.nombres}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Identificación</label>
                    <input
                        type="text"
                        className="form-control"
                        name="identificacion"
                        value={cliente.identificacion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={cliente.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        name="telefono"
                        value={cliente.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/clientes')}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditClient;
