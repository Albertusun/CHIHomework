import React, { useState, useEffect } from 'react';
import Characters from './Character';
import '../styles/styles.css';

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await response.json();
            setCharacters(data.results);
            setTotalPages(data.info.pages);
            setLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Rick & Morty Characters</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Characters characters={characters} />
            )}
            <div className="pagination">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page: {currentPage}</span>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default App;
