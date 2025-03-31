import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <section>
      <div className="container max-w-section">
        <h1>SignIn</h1>
        <form></form>
        <p className="text-sm">
          If you don't have account please{" "}
          <Link className="text-blue-500" to="/">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
