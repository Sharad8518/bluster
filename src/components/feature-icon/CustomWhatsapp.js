import React, { useState } from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

const CustomFloatingWhatsApp = ({ phoneNumber }) => {
    const [showWhatsApp, setShowWhatsApp] = useState(false);

    const redirectToWhatsApp = () => {
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.open(whatsappUrl, '_blank');
        setShowWhatsApp(false); // Close the WhatsApp dialog after opening
    };

    return (
        <div onClick={() => redirectToWhatsApp}>
            <FloatingWhatsApp
                phoneNumber={phoneNumber}
                chatMessage="Hello, how can I help you?"
                onOpen={() => setShowWhatsApp(true)}
                onClose={() => setShowWhatsApp(false)}

            />
            {showWhatsApp && (
                <div className="backdrop" onClick={() => setShowWhatsApp(false)}>
                    {/* Additional UI elements */}
                </div>
            )}
        </div>
    );
};

export default CustomFloatingWhatsApp;
