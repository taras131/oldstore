export const UserItem = ({email, name}) => {
    return (
        <div className="col s3 m3">
            <div className="card">
                <div className="card-image">
                    <img
                        src="https://yt3.ggpht.com/a/AATXAJxDC-h9iiJiPj3eGeYcW0L20QKua-zSxocvGqncfw=s900-c-k-c0xffffffff-no-rj-mo"/>
                    <span className="card-title">{email}</span>
                    <a className="btn-floating halfway-fab waves-effect waves-light red">
                        <i className="material-icons">
                            +
                        </i>
                    </a>
                </div>
                <div className="card-content">
                    <span>{name}</span>
                    <p>I am a very simple card. I am good at containing small bits of information. I am convenient
                        because I require little markup to use effectively.</p>
                </div>
            </div>
        </div>
    )
}