export default function Header() {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">User Name</a>
                <div className="d-flex">
                    <a className="navbar-brand" href="/login">Exit</a>
                </div>
            </div>
        </nav>
    );
}