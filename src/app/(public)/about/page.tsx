import AboutWebsitePage from "@/components/modules/Pages/About";
import Navbar from "@/components/modules/Shared/Navbar";


const Aboutpage = () => {
    return (
        <div>
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
            <AboutWebsitePage></AboutWebsitePage>
        </div>
    );
};

export default Aboutpage;