import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFoundPage from "./pages/NotFoundPage";
import VideosPage from "./pages/VideosPage";
import VideoDetailPage from "./pages/VideoDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <VideosPage />,
      },
      {
        path: "videos", //
        element: <VideosPage />,
      },
      {
        path: "/videos/:keyword",
        element: <VideosPage />,
      },
      {
        path: "/videos/watch/:videoId",
        element: <VideoDetailPage />,
      },
    ],
  },
]);
