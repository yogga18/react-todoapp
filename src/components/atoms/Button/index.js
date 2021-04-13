import React from 'react';
import './button.scss';

const Button = ({onClick, title, loading}) => {
    if (loading === true) {
        return <button className="btn-grad disable">Wait a Minute...</button>
    }
    return (
        <button className="btn-grad" onClick={onClick}>{title}</button>
    )
}

export default Button;