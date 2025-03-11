import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill without SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function ReactQuillDemo() {
  const [text, setText] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
  );

  const handleChange = (value: string) => {
    setText(value);
  };

  return <ReactQuill value={text} onChange={handleChange} />;
}
