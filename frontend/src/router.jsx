
import React from "react"
import Layout from "./components/misc/Layout";
import LoginPage from "./pages/Auth/Login.page";
import Landing from "./pages/Landing/Landing.page";
import NotFound from "./pages/Notfound/NotFound.page";
import CreatePostPage from "./pages/Post/CreatePost.page";
import ProtectedRoute from "./services/ProtectedRoute";
import useBoundStore from "./store/Store";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import { PostPage, postsLoader } from "./pages/Post/Post.page";
import { postDetailsLoader } from "./pages/Post/PostDetails.page";
import PostDetailsPage from "./pages/Post/PostDetails.page";
import PageLoader from "./components/misc/PageLoader";

export const Router = () => {
  const authCheck = useBoundStore((state) => {
    return state.user ? state.user : false;
  });

  /**
   * CLIENT-SIDE ROUTER
   *
   * [Public Pages]: Anyone can see these pages
   * / - Landing Page
   *
   * [Private Routes]: Must be authenticated to see
   * /login - Login Page
   * /posts - See All Posts
   * /posts/:id - See details of a specific post
   * /posts/create - Create a post
   *
   * /<unknown> - 404 Not Found
   */
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/loader" element={<PageLoader />} />
        <Route path="/login" element={<React.Suspense fallback={<PageLoader />}><LoginPage /></React.Suspense>} />
        <Route
          path="/posts/create"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <React.Suspense fallback={<PageLoader />}><CreatePostPage /></React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <React.Suspense fallback={<PageLoader />}>
                <PostPage />
                </React.Suspense>
              </ProtectedRoute>
          }
          loader={postsLoader}
        />
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostDetailsPage />
            </ProtectedRoute>
          }
          loader={postDetailsLoader}
        />
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return router;
};