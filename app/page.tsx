import Phone from "@/components/Phone";
export default function page() {
  return (
    <main className=" w-screen overflow-hidden bg-black">
      <div className="w-screen h-screen overflow-hidden">
        <Phone />
      </div>
      <div className="w-screen h-screen"></div>
    </main>
  );
}
