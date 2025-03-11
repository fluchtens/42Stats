import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import config from "@/config.json";

const HomeCard = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="p-6 w-full h-auto flex-1 rounded-lg bg-card border">
      <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
      <p className="text-sm font-normal text-muted-foreground">{desc}</p>
    </div>
  );
};

const FaqQuestion = ({ value, question, answer }: { value: string; question: string; answer: string }) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-base font-semibold text-foreground text-left">{question}</AccordionTrigger>
      <AccordionContent className="text-sm font-normal text-muted-foreground text-left">{answer}</AccordionContent>
    </AccordionItem>
  );
};

export function HomePage() {
  return (
    <div className="md:my-14 max-w-screen-lg m-auto flex-col flex justify-center items-center gap-6 md:gap-16">
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-6xl md:text-8xl font-extrabold text-transparent">42Stats</h1>
        <h2 className="text-base md:text-2xl font-light md:font-extralight text-foreground">Statistics for 42 students</h2>
      </div>
      <div className="flex-col md:flex-row flex gap-4">
        <HomeCard title="Statistics" desc="Explore in-depth statistics encompassing all 42 campuses." />
        <HomeCard title="Leaderboard" desc="Discover the competitive edge with student leaderboards, showcasing rankings based on levels." />
        <HomeCard title="Always up to date" desc="Our site retrieves data directly from api.intra.42.fr and updates it once a day." />
      </div>
      <div className="w-full flex-col flex gap-1">
        <h1 className="text-2xl font-semibold text-foreground">FAQ</h1>
        <Accordion type="single" collapsible className="w-full">
          {config.faq.map((question, index) => (
            <FaqQuestion key={index} value={index.toString()} question={question.question} answer={question.answer} />
          ))}
        </Accordion>
      </div>
    </div>
  );
}
