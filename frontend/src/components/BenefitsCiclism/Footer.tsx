// src/components/Footer.tsx
import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-contact">
                    <p>CidadeAtiva</p>
                    <p>Email: contato@cidadeativa.com.br</p>
                    <p>Telefone: +55 12 3456-7890</p>
                </div>
                <div className="footer-social">
                    {/* Ícones de redes sociais */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
