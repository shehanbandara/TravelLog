import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createLogEntry } from '../API';

const Form = ({ location, onClose }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            await createLogEntry(data);
            onClose();
        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            {error ? <h3 className="error">{error}</h3> : null}
            <label htmlFor="title">📍 Location: </label>
            <input {...register('title', { required: true })} />
            <label htmlFor="comments">💭 Comments: </label>
            <textarea rows={3} {...register('comments', { required: false })} />
            <label htmlFor="image">📸 Image: </label>
            <input{...register('image', { required: false })} />
            <label htmlFor="visitDate">📅 Date Visited: </label>
            <input type="date" {...register('visitDate', { required: true })} />
            <button disabled={loading}>🌎 Add Travel Log Entry 🌎</button>
        </form>
    );
}

export default Form;