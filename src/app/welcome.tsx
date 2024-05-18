import Introduction from "~/app/Introduction";

export default function WelcomePage() {
    return (
        <div className="relative flex items-center justify-center h-screen flex-col">
            <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url("/WI.jpg")' }}></div>
            <div className="relative z-10">
                <Introduction></Introduction>
            </div>
        </div>
    );
}