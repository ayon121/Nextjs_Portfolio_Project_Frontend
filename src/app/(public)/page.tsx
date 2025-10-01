import Navbar from "@/components/modules/Shared/Navbar";


export default async function Home() {
  return (
    <div>
      <div className="min-h-screen w-full bg-white relative">
        {/* Noise Texture (Darker Dots) Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />

        <Navbar></Navbar>
      </div>
    </div>
  );
}
