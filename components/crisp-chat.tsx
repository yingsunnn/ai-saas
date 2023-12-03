"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("ba9c2b58-f4f4-4aa7-8719-6e1353eb0928");
  }, []);

  return null;
};
