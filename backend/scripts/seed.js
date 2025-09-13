require('dotenv').config();
const { connectMongo } = require('../src/db/mongo');
const Plan = require('../src/models/Plan');

(async () => {
  try {
    await connectMongo();
    await Plan.deleteMany({});
    await Plan.insertMany([
      { name: 'Bronze', productType: 'Fibernet', tier: 1, monthlyPrice: 299, monthlyQuotaGB: 100 },
      { name: 'Silver', productType: 'Fibernet', tier: 2, monthlyPrice: 499, monthlyQuotaGB: 300 },
      { name: 'Gold', productType: 'Fibernet', tier: 3, monthlyPrice: 799, monthlyQuotaGB: 700 }
    ]);
    console.log('Seeded plans');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
