import React, { createContext } from "react";
import { useContext } from "react";
import Youtube from "../api/youtube";

const YoutubeApiContext = createContext<any>(null);

const youtube = new Youtube();

type Props = {
  children: React.ReactNode;
};

export function YoutubeApiProvider({ children }: Props) {
  return (
    <YoutubeApiContext.Provider value={{ youtube: youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
