// ⏱️ Cron job: auto fail pending payments after 5 min
    cron.schedule('* * * * *', async () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const result = await paymentsCollection.updateMany(
        { status: 'pending', createdAt: { $lte: fiveMinutesAgo } },
        { $set: { status: 'failed', reason: 'Timeout 5 min', updatedAt: new Date() } }
      );
      if (result.modifiedCount > 0) {
        console.log(`⏱️ ${result.modifiedCount} payment(s) auto-failed due to timeout`);
      }
    });
