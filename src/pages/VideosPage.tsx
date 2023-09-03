import React from "react";
import { useParams } from "react-router-dom";

export default function VideosPage() {
  const { keyword } = useParams();

  return (
    <div>
      VideosPage
      <br />
      {keyword ? keyword : "Hot Trend"}
    </div>
  );
}
