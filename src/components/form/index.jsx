import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function QuotesForm({ editData, setEditData }) {
    const [formData, setFormData] = useState({
        author: "",
        quote: "",
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                author: editData.author,
                quote: editData.quote,
            });
        }
    }, [editData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEdit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/quotes/${editData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Quote edited successfully!");
                setEditData(null); // Clear edit data
                setFormData({
                    author: "",
                    quote: "",
                });

            } else {
                console.error("Failed to edit quote:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const addQuote = async () => {
        try {
            const response = await fetch("http://localhost:3000/quotes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Quote added successfully!");
                setFormData({
                    author: "",
                    quote: "",
                });
            } else {
                console.error("Failed to add quote:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="quote-form">
            <h3>{editData ? "Edit Quote" : "Add Quote"}</h3>
            <label>Author</label>
            <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
            />
            <label>Quote</label>
            <input
                type="text"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
            />
            <input type="button" value={editData ? "Save Changes" : "Add Quote"} onClick={editData ? handleEdit : addQuote} />
        </div>
    );
}

QuotesForm.propTypes = {
    editData: PropTypes.object,
    setEditData: PropTypes.func
};