interface HomeCardProps {
  title: string;
  desc: string;
}

const HomeCard = ({ title, desc }: HomeCardProps) => {
  return (
    <div className="w-full h-auto flex-1 rounded-lg bg-secondary border border-slate-200 border-opacity-10 p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm font-normal text-zinc-400">{desc}</p>
    </div>
  );
};

export default async function Home() {
  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center items-center gap-2">
        <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-6xl md:text-8xl font-extrabold text-transparent">
          42Stats
        </h1>
        <h2 className="text-base md:text-2xl font-light md:font-thin">
          Statistics for 42 students
        </h2>
        <div className="mt-6 md:mt-16 flex-col md:flex-row flex gap-4">
          <HomeCard
            title="Statistics"
            desc="Explore in-depth statistics encompassing all 42 campuses."
          />
          <HomeCard
            title="Leaderboard"
            desc="Discover the competitive edge with our student leaderboard, showcasing rankings based on levels. Dive into the worldwide standings or narrow it down to specific campuses or pools to see who excels in the 42 community."
          />
          <HomeCard
            title="Always up to date"
            desc="Our site retrieves data directly from api.intra.42.fr and updates it once a day in our database."
          />
        </div>
      </div>
    </main>
  );
}
