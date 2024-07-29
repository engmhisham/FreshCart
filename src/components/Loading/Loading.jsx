import React from "react";
import { Rings } from "react-loader-spinner";
export default function Loading() {
  return (
    <div className="container d-flex justify-content-center py-5 my-5 ">
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
