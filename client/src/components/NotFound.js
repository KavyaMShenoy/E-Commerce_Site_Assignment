function NotFound() {
    return (
        <div id="not-found-page">
            <div className="text-center bg-danger text-light">
                <h1 className="pt-2 pb-3">404 Not Found</h1>
            </div>

            <div className="d-flex justify-content-center align-items-center text-danger" style={{ height: '60vh', fontSize: "Larger" }}>Sorry, the page you are searching for is not found.</div>
        </div>
    )
}

export default NotFound;