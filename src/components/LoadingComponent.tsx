import Spinner from "./Spinner";

function LoadingComponent() {
    return (
        <div className="loadingContainer">
            <Spinner height={40} width={40}  />
        </div>
    )
}

export default LoadingComponent
