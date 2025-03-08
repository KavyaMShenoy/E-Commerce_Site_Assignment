import { Link } from 'react-router-dom';

import "../css/Header.css";

function HeaderComponent({ cartLength }) {

    return (
        <>
            <header style={{ backgroundColor: "lightseagreen" }} className="d-flex p-4 text-light">
                <h1>Shopit</h1>

                <div className="icon-container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                    <Link to="/cart">
                        <span className="mx-3" style={{ position: 'relative' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                            {(cartLength > 0) &&
                                (<span className="badge" id="lblCartCount">{cartLength}</span>)}
                        </span>
                    </Link>

                    <Link to="/home">
                        <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src="data:image/png;base64,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" alt="Home Icon" />
                    </Link>
                </div>

            </header>
        </>
    )
}

export default HeaderComponent;