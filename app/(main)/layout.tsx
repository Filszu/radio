import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
    newSongModal: React.ReactNode;
}) {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center md:pt-1 w-full">
                <Header />

                <div className="h-10"></div>

                {children}
            </main>

            <Toaster />
            <Footer />
        </>
    );
}
