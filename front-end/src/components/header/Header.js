export default function Header(props) {
    const exit = () => {
        const date = new Date(0);
        const cookie = [`token=""`, `expires=${date}`].join(",");
        document.cookie = cookie;
        window.location.pathname = "/login";
    };

    const reEnable = () => {
        window.location.pathname = "/dashboard";
    };

    const reEnableButton = () => {
        return (
            <div className="d-flex">
                <a className="navbar-brand" href="#" onClick={() => reEnable()}>Re-enable</a>
            </div>
        );
    };

    const exitButton = () => {
        return (
            <div className="d-flex">
                <a className="navbar-brand" href="#" onClick={() => exit()}>Exit</a>
            </div>
        );
    };

    return (
        <header>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Hi {props.user.username}!</a>
                    {window.location.pathname === "/dashboard" ? exitButton() : reEnableButton()}
                </div>
            </nav>
        </header>
    );
}