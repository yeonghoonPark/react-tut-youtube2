import React from "react";
import { useQuery } from "react-query";
import { useYoutubeApi } from "../context/YoutubeContextApi";

type Props = {
  id: string;
  name: string;
};

export default function ChannelInfo({ id, name }: Props) {
  const { youtube } = useYoutubeApi();
  const { data: thumbnailUrl } = useQuery(
    ["channel", id], //
    () => youtube.getChannelThumbnailUrl(id),
    { staleTime: 1000 * 60 * 5 },
  );

  return (
    <div className='flex my-4 mb-8 items-center'>
      {thumbnailUrl && (
        <img className='w-10 h-10 rounded-full' src={thumbnailUrl} alt={name} />
      )}
      <p className='text-lg font-medium ml-2'>{name}</p>
    </div>
  );
}
