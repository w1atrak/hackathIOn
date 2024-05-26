"use client";
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { useSharedState } from "./context";
import { useEffect } from "react";
import { type ApiResponse } from "~/types/types";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {  setUserId, setDatabase, database } = useSharedState();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(Number(userId));
	}
	  fetch("http://127.0.0.1:8080/data/", {
		  method: "GET",
		  headers: {
			  "Content-Type": "application/json",
		  },
	  }).then((response) => {
		  if (!response.ok) {
			  throw new Error("Network response was not ok");
		  }
		  return response.json();
	  }
	  ).then((data: ApiResponse) => {
		  setDatabase(data);
		  console.log(data)
	  }).catch((error) => {
		  console.error("Error fetching data:", error);
	  });
		
	  
  }, [setUserId, setDatabase]);

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
