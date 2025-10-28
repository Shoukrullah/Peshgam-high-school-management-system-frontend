import { BsBug } from "react-icons/bs";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import Heading from "../components/Heading";

function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <div className="error-page">
        <div className="error-page_first-container">
          <Heading>
            {isRouteErrorResponse(error)
              ? "This Page does not exist"
              : "Unexpected Error happened"}
          </Heading>
          <BsBug />
        </div>
        <a className="link" href="/">
          Go back to Home page
        </a>
      </div>
    </>
  );
}

export default ErrorPage;
