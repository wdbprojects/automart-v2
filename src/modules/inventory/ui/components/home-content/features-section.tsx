import { imagesSources } from "@/config/constants";
import { imgixLoader } from "@/lib/imgix-loader";

const FeaturesSection = () => {
  return (
    <div className="bg-background py-16 h-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-8xl sm:text-center">
          <h2 className="text-base md:text-2xl font-semibold text-foreground leading-7">
            We've got what you need
          </h2>
          <h2 className="mt-4 uppercase text-4xl font-bold tracking-tight text-muted-foreground sm:text-5xl">
            No car? No problem
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our exclusive collection offers unmatched luxury and speed for the
            ultimate driving experience
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16 ">
        <div
          className="mx-auto max-w-7xl h-[300px] bg-cover xl:rounded-t-xl bg-no-repeat bg-bottom  shadow-2xl"
          style={{
            backgroundImage: `url(${imgixLoader({
              src: imagesSources.featureSection,
              width: 1280,
              quality: 100,
            })})`,
          }}
        />
        <div aria-hidden="true" className="relative hidden xl:block">
          <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white to-transparent pt-[3%]" />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
