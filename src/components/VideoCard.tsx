import React from "react";

export default function VideoCard({ video }: any) {
  const { snippet } = video;

  return <div>{snippet.title}</div>;
}
