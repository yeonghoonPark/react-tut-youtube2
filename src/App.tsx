import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { YoutubeApiProvider } from "./context/YoutubeContextApi";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <Header />
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </>
  );
}
