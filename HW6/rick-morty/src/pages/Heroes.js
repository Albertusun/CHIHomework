import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, Outlet } from 'react-router-dom';

const Heroes = () => {
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://rickandmortyapi.com/api/character');
            const data = await response.json();
            setCharacters(data.results);
        };
        fetchData();
    }, []);

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
