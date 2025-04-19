"use client";

import { use } from "react";
import { ClassifiedWithImages, Favourites } from "@/config/types";
import { ClassifiedCard } from "./classified-card";

interface ClassifiedsListProps {
  classifieds: Promise<ClassifiedWithImages[]>;
  favourites: number[];
}

export const ClassifiedsList = (props: ClassifiedsListProps) => {
  const { classifieds, favourites } = props;
  const inventory = use(classifieds);

  return (
    <div className="grid xs:grid-cols-2 mdlg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 px-4 min-w-fit">
      {inventory.map((classified) => {
        return (
          <ClassifiedCard
            key={classified.id}
            classified={classified}
            favourites={favourites}
          />
        );
      })}
    </div>
  );
};
