import React from 'react';
import { useRequest } from 'ahooks';
import { useNavigate, Outlet } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { fetchCharacters } from '../api/requests';

const Heroes = () => {
    const navigate = useNavigate();

    const { data: characters = [], loading, error } = useRequest(fetchCharacters);

    const handleRowClick = (param) => {
        navigate(`/heroes/${param.id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <DataGrid
                rows={characters}
                columns={columns}
                pageSize={5}
                onRowClick={(param) => handleRowClick(param)}
            />
            <Outlet />
        </div>
    );
};

export default Heroes;
