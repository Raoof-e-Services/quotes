import { useState, useEffect } from "react";
import QuotesForm from "../form/index";

export default function Quotes() {
    const [quotes, setQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        const fetchDataWithDelay = async () => {
            setTimeout(async () => {
                try {
                    const response = await fetch("http://localhost:3000/quotes");
                    if (!response.ok) {
                        throw new Error('Failed to fetch quotes');
                    }
                    const result = await response.json();
                    setQuotes(result);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }, 2000); // Delay of 2000 milliseconds (2 seconds)
        };

        fetchDataWithDelay();
    }, [quotes]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/quotes/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete quote');
            }
            setQuotes(quotes.filter(quote => quote.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (quote) => {
        setEditData(quote);
    };

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <h2>Here are our quotes:</h2>
            <ul>
                {quotes.map((quote) => (
                    <li key={quote.id}>
                        <strong className="roboto-bold">{quote.author}</strong>: <p className="roboto-normal">{quote.quote}</p>
                        <button onClick={() => handleDelete(quote.id)}>Delete this</button>
                        <button onClick={() => handleEdit(quote)}>Edit this</button>
                    </li>
                ))}
            </ul>
            <QuotesForm editData={editData} setEditData={setEditData} />
        </div>
    );
}
