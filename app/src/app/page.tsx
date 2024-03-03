export default async function Home() {
  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center items-center gap-2">
        <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-6xl md:text-8xl font-extrabold text-transparent">42Stats</h1>
        <h2 className="text-base md:text-2xl font-light md:font-thin">Statistics for 42 students</h2>
      </div>
    </main>
  );
}
