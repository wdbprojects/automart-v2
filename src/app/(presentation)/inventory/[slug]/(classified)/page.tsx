import { routes } from "@/config/routes";
import { PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import SingleClassified from "@/modules/inventory/ui/components/single-clasiffied";
import SingleClassifiedMain from "@/modules/inventory/ui/single-classified-main";
import { ClassifiedStatus } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

const ClassifiedPage = async (props: PageProps) => {
  const params = await props?.params;

  const slug = decodeURIComponent(params?.slug as string);
  if (!slug) return notFound();

  const classified = await prisma.classified.findUnique({
    where: {
      slug: slug,
    },
    include: { make: true, images: { take: 1 } },
  });
  if (!classified) return notFound();
  if (classified.status === ClassifiedStatus.SOLD) {
    redirect(routes.notAvailable(classified.slug));
  }

  return <SingleClassifiedMain {...classified} />;
};

export default ClassifiedPage;
