import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clientsService } from '../services/api';

const ClientList = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        loadClientes();
    }, []);

    const loadClientes = async () => {
        try {
            const result = await clientsService.get('/clientes');
            setClientes(result.data);
        } catch (error) {
            console.error("Error loading clients", error);
        }
    };

    const deleteCliente = async (id) => {
        if (window.confirm('¿Seguro que desea eliminar este cliente?')) {
            try {
                await clientsService.delete(`/clientes/${id}`);
                loadClientes();
            } catch (error) {
                console.error("Error deleting client", error);
            }
        }
    };

    return (
        <div className="px-4 py-3">
            <h2 className="mb-4">Lista de Clientes</h2>
            <Link className="btn btn-primary mb-3" to="/clientes/new">Nuevo Cliente</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombres</th>
                        <th>Identificación</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombres}</td>
                            <td>{cliente.identificacion}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefono}</td>
                            <td>
                                <Link className="btn btn-primary btn-sm me-2" to={`/clientes/edit/${cliente.id}`}>Editar</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteCliente(cliente.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
