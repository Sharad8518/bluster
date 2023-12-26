import React from 'react';
import './WhatsAppButton.css'; // Create a CSS file for styling

const WhatsAppButton = () => {
    const redirectToWhatsApp = () => {
        const phoneNumber = '6265956741';
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="whatsapp-button" onClick={redirectToWhatsApp}>
            <i className="fa fa-whatsapp"></i>
        </div>
    );
};

export default WhatsAppButton;
