import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import IndexPage from "../pages/public/index";
import Loading from "../pages/loading";
import NotFound from "../pages/errors/404";
import Unauthorized from "../pages/errors/401";
import Forbidden from "../pages/errors/403";
import InternalServerError from "../pages/errors/500";
import Maintenance from "../pages/errors/maintenance";

class AppRouter {
  private routes: any[] = [];

  route(path: string, Component: React.ComponentType) {
    this.routes.push({ path, element: <Component /> });
    return this;
  }

  lazy(
    path: string,
    importFn: () => Promise<{ default: React.ComponentType }>
  ) {
    const LazyComponent = lazy(importFn);
    this.routes.push({
      path,
      element: (
        <Suspense fallback={<Loading />}>
          <LazyComponent />
        </Suspense>
      ),
    });
    return this;
  }

  build() {
    this.routes.push({
      path: "*",
      element: <NotFound />
    });
    return createBrowserRouter(this.routes);
  }
}

const appRouter = new AppRouter();

const router = appRouter
  .route("/", IndexPage)
  .lazy("/dashboard", () => import("../pages/dashboard/index"))
  .route("/404", NotFound)
  .route("/401", Unauthorized)
  .route("/403", Forbidden)
  .route("/500", InternalServerError)
  .route("/maintenance", Maintenance)
  .build();

export default function Router() {
  return <RouterProvider router={router} />;
}
