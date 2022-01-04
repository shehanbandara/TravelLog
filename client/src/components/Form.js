import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <label htmlFor="title">📍 Location: </label>
            <input {...register('title', { required: true })} />
            <label htmlFor="comments">💭 Comments: </label>
            <textarea rows={3} {...register('comments', { required: false })} />
            <label htmlFor="image">📸 Image: </label>
            <input{...register('image', { required: false })} />
            <label htmlFor="visitDate">📅 Date Visited: </label>
            <input type="date" {...register('visitDate', { required: true })} />
            <button>🌎 Add Travel Log Entry 🌎</button>
        </form>
    );
}

export default Form;