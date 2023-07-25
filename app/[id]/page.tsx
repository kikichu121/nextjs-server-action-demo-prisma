import React from "react";

export default function DynamicRoute({ params }: { params: { id: string } }) {
  return <div>Dynamic{params.id}</div>;
}
