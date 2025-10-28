import Spinner from "./Spinner";

function Loading() {
    return (
        <div className="loadingContainer">
            <Spinner height={40} width={40}  />
        </div>
    )
}

export default Loading
