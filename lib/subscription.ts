import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSbuscription = await prismadb.userSbuscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripePriceId: true,
    },
  });

  if (!userSbuscription) {
    return false;
  }

  const isValid =
    userSbuscription.stripePriceId &&
    userSbuscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
