import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import IndexPage from "../pages/public/index";
import Loading from "../pages/loading";

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
    // Lazy load 404 page for catch-all route
    const LazyNotFound = lazy(() => import("../pages/errors/404"));
    this.routes.push({
      path: "*",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyNotFound />
        </Suspense>
      ),
    });
    return createBrowserRouter(this.routes);
  }
}

const appRouter = new AppRouter();

const router = appRouter
  .route("/", IndexPage)
  .lazy("/dashboard", () => import("../pages/dashboard/index"))
  .lazy("/auth/login", () => import("../pages/auth/Login"))
  .lazy("/auth/register", () => import("../pages/auth/Register"))
  .lazy("/404", () => import("../pages/errors/404"))
  .lazy("/401", () => import("../pages/errors/401"))
  .lazy("/403", () => import("../pages/errors/403"))
  .lazy("/500", () => import("../pages/errors/500"))
  .lazy("/maintenance", () => import("../pages/errors/maintenance"))
  .build();

export default function Router() {
  return <RouterProvider router={router} />;
}
