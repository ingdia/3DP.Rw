import { Navbar } from '../components/Navbar'; // Adjust import path if needed
import { Footer } from '../components/Footer';
 // Adjust import path if needed

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}