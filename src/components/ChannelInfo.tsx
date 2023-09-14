import React from "react";
import { useQuery } from "react-query";
import { useYoutubeApi } from "../context/YoutubeContextApi";

type Props = {
  id: string;
  name: string;
};

export default function ChannelInfo({ id, name }: Props) {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: thumbnailUrl,
  } = useQuery(
    ["channel", id], //
    () => youtube.getChannelThumbnailUrl(id),
    { staleTime: 5 * 60 * 1000 },
  );

  return (
    <div>
      {thumbnailUrl && <img src={thumbnailUrl} alt={name} />}
      <p>{name}</p>
    </div>
  );
}
