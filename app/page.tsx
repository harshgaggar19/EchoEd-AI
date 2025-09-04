import { Ripple } from "../components/magicui/ripple";
export default function page() {
  return (
    <main className="p-2 w-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center h-[88vh] ">
        <span className="md:text-9xl text-7xl font-bold">EchoEdu AI</span>
        {/* <TextGenerateEffect words={words} className="" /> */}{" "}
        <Ripple mainCircleOpacity={0.2} />
        <p>Echoing Information, Multilinigually..</p>
      </div>
    
    </main>
  );
}