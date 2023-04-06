import { lazy, Suspense } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = lazy(() => import("./pages/NewQuote"));
const QuoteDetail = lazy(() => import("./pages/QuoteDetail"));
const AllQuotes = lazy(() => import("./pages/AllQuotes"));
const Comments = lazy(() => import("./components/comments/Comments"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate replace to="quotes" />} />
          <Route path="quotes" element={<AllQuotes />} />
          <Route path="quotes/:quoteId" element={<QuoteDetail />}>
            <Route
              path=""
              element={
                <div className="centered">
                  <Link className="btn--flat" to={`comments`}>
                    Load Comments
                  </Link>
                </div>
              }
            />
            <Route path="comments" element={<Comments />} />
          </Route>
          <Route path="new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
