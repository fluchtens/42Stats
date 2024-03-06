import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HomeCard = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="w-full h-auto flex-1 rounded-lg bg-secondary border p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm font-normal text-zinc-400">{desc}</p>
    </div>
  );
};

const FaqQuestion = ({
  value,
  question,
  answer,
}: {
  value: string;
  question: string;
  answer: string;
}) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-base font-semibold text-left text-slate-200">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-sm font-normal text-zinc-400">{answer}</AccordionContent>
    </AccordionItem>
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
            desc="Discover the competitive edge with student leaderboards, showcasing rankings based on levels."
          />
          <HomeCard
            title="Always up to date"
            desc="Our site retrieves data directly from api.intra.42.fr and updates it once a day in our database."
          />
        </div>
        <div className="w-full mt-6 md:mt-16 flex-col flex gap-1">
          <h1 className="text-2xl font-semibold">FAQ</h1>
          <Accordion type="single" collapsible className="w-full">
            <FaqQuestion
              value="1"
              question="What is the aim of this project?"
              answer="I did this project to improve my web development skills and learn the Next.js framework. It was inspired by the 42evaluators.com website."
            />
            <FaqQuestion
              value="2"
              question="How often is the data updated?"
              answer="The data is updated once a day in our database."
            />
            <FaqQuestion
              value="3"
              question="Why save data?"
              answer="The api of 42 has a rate limit, we are limited to a maximum number of requests per minute. So we can't afford to retrieve data directly from the API for every user request."
            />
            <FaqQuestion
              value="4"
              question="Where is the data stored?"
              answer="The website and database are hosted by OVH in Strasbourg, France."
            />
          </Accordion>
        </div>
      </div>
    </main>
  );
}
