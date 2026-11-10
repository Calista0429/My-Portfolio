"use client";

import { useLocaleText } from "@/components/locale-text";

const NotFound = () => {
  const { notFound } = useLocaleText();
  return <div>{notFound.title}</div>;
};

export default NotFound;
