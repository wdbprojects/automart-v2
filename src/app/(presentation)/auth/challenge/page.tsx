import { auth } from "../../../../auth";

const ChallengePage = async () => {
  const session = await auth();
  // console.log(session);

  return <div className="mt-16">Challenge Page</div>;
};

export default ChallengePage;
