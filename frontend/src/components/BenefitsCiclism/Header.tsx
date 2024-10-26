// src/components/Header.tsx
import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <nav>
                <ul>
                    <li><a href="#">Sobre</a></li>
                    <li><a href="#">Mapa</a></li>
                    <li><a href="#">Registrar</a></li>
                    <li><a href="#">Login</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
