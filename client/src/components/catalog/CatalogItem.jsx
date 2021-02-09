export const CatalogItem = ({title ,text, price,phone, author}) => {
    return (
        <div className="col s4 m4">
            <div className="card">
                <div className="card-image">
                    <img src="http://www.galerieallen.com/cspdocs/artwork/images/daniel_turner_galerie_allen_1632.jpg"/>
                    <span className="card-title">{price} рублей</span>
                </div>
                <div className="card-content">
                    <h4>{title}</h4>
                    <p>{text}</p>
                    <h6>Телефон</h6>
                    {phone}
                </div>
            </div>
        </div>
    )
}