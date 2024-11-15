import React, { useEffect, useState } from 'react';
import { getAllExhibits } from '../api/exhibitActions';

interface Exhibit {
    imageUrl: string;
    description: string;
}

const BASE_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com';

const StripePage = () => {
    const [exhibits, setExhibits] = useState<Exhibit[] | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchExhibits = async () => {
            try {
                const data = await getAllExhibits(page, 10);

                console.log("Data received from API:", data);

                if (data && Array.isArray(data.data)) {
                    const formattedExhibits = data.data.map((exhibit: Exhibit) => ({
                        ...exhibit,
                        imageUrl: `${BASE_URL}${exhibit.imageUrl}`
                    }));
                    setExhibits(formattedExhibits);
                    setTotalPages(data.lastPage || 1);
                } else {
                    console.warn("Unexpected data format:", data);
                    setExhibits([]);
                }
            } catch (error) {
                console.error("Error fetching exhibits:", error);
                alert("Failed to load exhibits.");
            }
        };
        fetchExhibits();
    }, [page]);

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <div>
            <h2>All Exhibits</h2>
            {exhibits && exhibits.length > 0 ? (
                exhibits.map((exhibit, index) => (
                    <div key={index}>
                        {exhibit.imageUrl && (
                            <img
                                src={exhibit.imageUrl}
                                alt="Exhibit"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        )}
                        <p>{exhibit.description}</p>
                    </div>
                ))
            ) : (
                <p>No exhibits available.</p>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default StripePage;
