import { addDays, addYears,isEqual, startOfDay  } from 'date-fns';
import { PrismaClient, Subscription } from '@prisma/client';

export function getExpiryDate(duration:string) {
  const currentDate = new Date();
  let expiryDate:Date;

  if (duration.toUpperCase() === 'MONTHLY') {
    expiryDate = addDays(currentDate, 30);
  } else if (duration.toUpperCase() === 'YEARLY') {
    expiryDate = addYears(currentDate, 1);
  } else {
    throw new Error('Invalid duration');
  }

  return expiryDate;
}


const prisma = new PrismaClient();

async function checkSubscription() {
  const today = startOfDay(new Date()); 

  try {
    const expiredSubscriptions = await prisma.subscription.findMany({
      where: {
        subscribed: true,
        expires: {
          lte: today
        }
      }
    });

    for (const subscription of expiredSubscriptions) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          subscribed: false,
          expires: null 
        }
      });

      console.log(`Updated subscription for user ${subscription.userId}`);
    }

    console.log(`Checked and updated ${expiredSubscriptions.length} subscriptions`);
  } catch (error) {
    console.error('Error checking subscriptions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// To run the function
checkSubscription();

