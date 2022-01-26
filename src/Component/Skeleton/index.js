import './skeleton.scss'

const Skeleton = () => {
    return (
            <div className="card-skeleton">
                <div className="card-skeleton-img skeleton-animate"></div>
                <div className="card-skeleton-content skeleton-animate">
                    <div className="content"></div>
                    <div className="content"></div>
                    <div className="content"></div>
                </div>
            </div>
    )
}

export default Skeleton