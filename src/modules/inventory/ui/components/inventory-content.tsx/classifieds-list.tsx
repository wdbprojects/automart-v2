import { ClassifiedWithImages } from "@/config/types";
import { ClassifiedCard } from "./classified-card";

interface ClassifiedsListProps {
  classifieds: ClassifiedWithImages[];
}

export const ClassifiedsList = (props: ClassifiedsListProps) => {
  const { classifieds } = props;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 px-4">
      {classifieds.map((classified) => {
        return <ClassifiedCard key={classified.id} classified={classified} />;
      })}
    </div>
  );
};
