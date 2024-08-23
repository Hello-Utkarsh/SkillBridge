import AppBar from "@/app/components/AppBar";
import Image from "next/image";
import GitVisualizer from "./components/GitCourseContent/GitVisualizer";

export default function Home() {
  return (
    <div className='px-12 py-12 w-full'>
      <GitVisualizer />
    </div>
  );
}
