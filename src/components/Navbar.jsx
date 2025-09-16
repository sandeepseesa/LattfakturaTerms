import React, { useState, useEffect, useRef } from 'react'
import './Navbar.css'

const Navbar = ({ lang, setLang }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalPos, setModalPos] = useState({ top: 0, left: 0 });
    const [track, setTrack] = useState(null);

    const [hamMenu, setHamMenu] = useState(false);
    const [hamMenuPos, setHamMenuPos] = useState({ top: 0, left: 0 });
    const [hamTrack, setHamTrack] = useState(null);

    const langRef = useRef(null);
    const hamRef = useRef(null);

    const updatePosition = (el, setPos) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setPos({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
        });
    };

    const handleClick = (e) => {
        setTrack(e.currentTarget);
        updatePosition(e.currentTarget, setModalPos);
        setIsOpen(!isOpen);
    }

    const updateModalPosition = (el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setModalPos({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
        })
    }

    useEffect(() => {

        const handleResize = () => {
            if (track) updateModalPosition(track);

            if (hamTrack) updatePosition(hamTrack, setHamMenuPos);

            if (window.innerWidth > 1024 && hamMenu) {
                setHamMenu(false);
                setHamTrack(null);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [track, hamTrack, hamMenu])


    const handleHamMenu = (e) => {
        setHamTrack(e.currentTarget);
        updatePosition(e.currentTarget, setHamMenuPos);

        setHamMenu(!hamMenu);
    }

    useEffect(() => {
        const onPointerDown = (e) => {
            const target = e.target;

            if (isOpen) {
                const clickedInsideModal = langRef.current && langRef.current.contains(target);
                const clickedOnTrigger = track && track.contains && track.contains(target);
                if (!clickedInsideModal && !clickedOnTrigger) {
                    setIsOpen(false);
                    setTrack(null);
                }
            }

            if (hamMenu) {
                const clickedInsideHam = hamRef.current && hamRef.current.contains(target);
                const clickedOnHamTrigger = hamTrack && hamTrack.contains && hamTrack.contains(target);
                if (!clickedInsideHam && !clickedOnHamTrigger) {
                    setHamMenu(false);
                    setHamTrack(null);
                }
            }
        };

        document.addEventListener('mousedown', onPointerDown);
        document.addEventListener('touchstart', onPointerDown);

        return () => {
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('touchstart', onPointerDown);
        };
    }, [isOpen, track, hamMenu, hamTrack]);

    return (
        <>
            <nav className="navbar">
                <div>
                    <img src="/logo.png" alt="Fakturera" className="logo" />
                    <div className="ham-menu" onClick={handleHamMenu}>
                        <svg xmlns="/hamburger-menu.svg" width="30" height="30" viewBox="0 0 24 24" fill="white" >
                            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
                        </svg>
                    </div>
                </div>

                <div className="nav-links">
                    <p>{lang == "English" ? "Home" : "Hem"}</p>
                    <p>{lang == "English" ? "Order" : "Beställ"}</p>
                    <p>{lang == "English" ? "Our Customers" : "Våra Kunder"}</p>
                    <p>{lang == "English" ? "About us" : "Om oss"}</p>
                    <p>{lang == "English" ? "Contact Us" : "Kontakta oss"}</p>
                    <div className='icon-button' onClick={handleClick}><div>{lang}</div>
                        <img src={lang == "English" ? "/GB-english.png" : "/swe_image.png"} className="lang-icon" /></div>
                </div>
            </nav>
            {hamMenu && (<div ref={hamRef}
                style={{ position: 'absolute', zIndex: 30, padding: '1vh 3vw', backgroundColor: 'white', top: hamMenuPos.top, left: hamMenuPos.left, borderRadius: '1vw' }}>
                <p>{lang == "English" ? "Home" : "Hem"}</p>
                <p>{lang == "English" ? "Order" : "Beställ"}</p>
                <p>{lang == "English" ? "Our Customers" : "Våra Kunder"}</p>
                <p>{lang == "English" ? "About us" : "Om oss"}</p>
                <p>{lang == "English" ? "Contact Us" : "Kontakta oss"}</p>
            </div>)
            }
            {isOpen && (<div ref={langRef}
                style={{
                    position: 'absolute', backgroundColor: 'white', color: 'black', top: modalPos.top, left: modalPos.left, padding: '0px 6px',  borderRadius: '7px', marginTop:'1vh'}}>
                <div className="icon-button" onClick={() => {setLang("Svenska"); setIsOpen(false)}}>
                    <p style={{margin:'1vw 0'}}>Svenska</p>
                    <img src="/swe_image.png" className="lang-icon" />
                </div>
                <div className="icb" onClick={() => {setLang("English"); setIsOpen(false)}}>
                    <p>English</p>
                    <img src="/GB-english.png" className="lang-icon" />
                </div>
            </div>)}
        </>
    )
}

export default Navbar