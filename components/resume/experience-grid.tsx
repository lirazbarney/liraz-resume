type ExperienceGridProps = {
  type: "experience" | "education" | "militaryService";
  title: string;
  items: {
    title: string;
    place: string;
    period: string;
    description: string;
  }[];
};

export default function ExperienceGrid({
  type,
  title,
  items,
}: ExperienceGridProps) {
  return (
    <section id={type} className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold mb-12 text-center">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                <p className="text-blue-400">{item.place}</p>
              </div>
              <span className="text-gray-400 text-sm mt-2 md:mt-0">
                {item.period}
              </span>
            </div>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
