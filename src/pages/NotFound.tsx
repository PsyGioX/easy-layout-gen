import { Link } from "react-router-dom";
import Header from "../components/Header";

const NotFound = () => (
  <div className="flex min-h-screen flex-col bg-sand-50">
    <Header />
    <main className="flex flex-1 items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-sm text-sand-700">404</p>
        <h2 className="mt-2 text-3xl font-medium text-charcoal-950">This page doesn&rsquo;t exist</h2>
        <p className="mt-2 text-charcoal-600">The layout you&rsquo;re looking for isn&rsquo;t here.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-charcoal-950 px-5 py-2.5 text-sm font-medium text-sand-50 transition-all-200 hover:bg-charcoal-800"
        >
          Browse templates
        </Link>
      </div>
    </main>
  </div>
);

export default NotFound;
