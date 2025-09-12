"use client";
import { Pause, Play, RotateCcwIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export function DemoVideoSection({
  videoUrl = "/vid.mp4",
  poster = "/poster.png",
  descrip = true,
}: {
  videoUrl?: string;
  poster?: string;
  descrip?: boolean;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onPause);
    };
  }, []);

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <section className="bg-black/95 text-white py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center my-10 lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            See how easy integration is — live demo
          </h2>
          {descrip && (
            <p className="mt-4 text-lg text-gray-300">
              Watch a short demo showing how college staff generate an API key,
              upload files to the dashboard, and embed the EchoEd chatbot on the
              website.
            </p>
          )}
          {descrip && (
            <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start gap-4">
              <Link
                href={"/dashboard"}
                className="inline-flex cursor-target items-center gap-3 px-6 py-3 rounded-2xl bg-white text-black font-semibold shadow"
              >
                Full integration docs →
              </Link>
            </div>
          )}
        </div>

        <div className="mt-12">
          <div className="mx-auto max-w-5xl">
            <div className="relative rounded-2xl  shadow-blue-100 overflow-hidden shadow-lg border border-white/6 bg-gradient-to-b from-neutral-900/60 to-black">
              <video
                ref={videoRef}
                poster={poster}
                src={videoUrl}
                preload="metadata"
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[720px] object-cover bg-black"
              />

              <div className="p-4 bg-gradient-to-t from-black/70 to-transparent flex justify-between items-center">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold">
                      Demo: EchoEd quick integration
                    </div>
                    <div className="text-xs text-gray-400">
                      Duration: 1m 42s • Hosted on Cloudinary
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center mt-4">
                  <button
                    onClick={handleTogglePlay}
                    className="px-4 py-2 rounded bg-black cursor-target text-white font-medium shadow transition-all duration-200 hover:bg-gray-900 hover:shadow-lg hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-400 flex items-center justify-center"
                  >
                    {isPlaying ? <Pause /> : <Play />}
                  </button>
                  <button
                    onClick={handleRestart}
                    className="px-4 py-2 rounded bg-black cursor-target text-white font-medium shadow transition-all duration-200 hover:bg-gray-900 hover:shadow-lg hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-400 flex items-center justify-center"
                  >
                    <RotateCcwIcon />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center lg:justify-start">
              <div className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-200 border border-white/6">
                Demo • Easy integration
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
