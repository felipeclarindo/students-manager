import { NavBar } from "@/components/NavBar";

export default function HomePage() {
  return (
    <>
      <NavBar active="Home" />

      <main className="flex justify-center">
        <div className="bg-gray-200 m-4 p-4 rounded min-w-1/3">
          <h2>Home</h2>
        </div>
      </main>
    </>
  );
}
