import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const p1 = await prisma.provider.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userid: "test_1",
      sitename: "KolkataSunPower",
      consumers: {
        create: {
          userid: "cons-1",
          name: "Site1",
          address: "Kolkata",
          district: "Kolkata",
          state: "West Bengal",
          country: "India",
          subscription: 1200,
          powergained: 100,
          coordinates: [22.5693, 88.3678],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-1",
          manufacturer: "SunTech",
          model: "ST-100",
          dimensions: [100, 50, 2],
          outputpower: 100,
          warranty: 10,
        },
      },
      address: "Kolkata",
      district: "Kolkata",
      state: "West Bengal",
      country: "India",
      income: 12000,
      coordinates: [22.5693, 88.3678],
      unitsavailable: 100,
    },
  });

  const p2 = await prisma.provider.upsert({
    where: { id: 2 },
    update: {},
    create: {
      userid: "test_3",
      sitename: "SydneyRenewableEnergy",
      consumers: {
        create: {
          userid: "cons-3",
          name: "Site3",
          address: "Sydney CBD",
          district: "Sydney",
          state: "New South Wales",
          country: "Australia",
          subscription: 1800,
          powergained: 150,
          coordinates: [-33.8919, 151.1913],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-3",
          manufacturer: "AussieSolar",
          model: "AS-250",
          dimensions: [160, 80, 2],
          outputpower: 250,
          warranty: 20,
        },
      },
      address: "Bondi Beach",
      district: "Sydney",
      state: "New South Wales",
      country: "Australia",
      income: 20000,
      coordinates: [-33.8919, 151.1913],
      unitsavailable: 120,
    },
  });
  const p3 = await prisma.provider.upsert({
    where: { id: 3 },
    update: {},
    create: {
      userid: "test_4",
      sitename: "LAEcoElectric",
      consumers: {
        create: {
          userid: "cons-4",
          name: "Site4",
          address: "Los Angeles",
          district: "California",
          state: "California",
          country: "United States",
          subscription: 2000,
          powergained: 180,
          coordinates: [34.0522, -118.2437],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-4",
          manufacturer: "SolarTech",
          model: "ST-150",
          dimensions: [140, 60, 2],
          outputpower: 150,
          warranty: 12,
        },
      },
      address: "Santa Monica",
      district: "Los Angeles",
      state: "California",
      country: "United States",
      income: 22000,
      coordinates: [34.0522, -118.2437], // Los Angeles coordinates from OpenStreetMap
      unitsavailable: 180,
    },
  });

  const p4 = await prisma.provider.upsert({
    where: { id: 4 },
    update: {},
    create: {
      userid: "test_5",
      sitename: "ParisGreenPower",
      consumers: {
        create: {
          userid: "cons-5",
          name: "Site5",
          address: "Paris City Center",
          district: "Paris",
          state: "Île-de-France",
          country: "France",
          subscription: 1700,
          powergained: 130,
          coordinates: [48.8566, 2.3522],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-5",
          manufacturer: "EuroSolar",
          model: "ES-180",
          dimensions: [130, 70, 2],
          outputpower: 180,
          warranty: 18,
        },
      },
      address: "Champs-Élysées",
      district: "Paris",
      state: "Île-de-France",
      country: "France",
      income: 19000,
      coordinates: [48.8566, 2.3522], // Paris coordinates from OpenStreetMap
      unitsavailable: 220,
    },
  });

  const p5 = await prisma.provider.upsert({
    where: { id: 5 },
    update: {},
    create: {
      userid: "test_6",
      sitename: "LondonSolarSolutions",
      consumers: {
        create: {
          userid: "cons-6",
          name: "Site6",
          address: "London Bridge",
          district: "London",
          state: "England",
          country: "United Kingdom",
          subscription: 1700,
          powergained: 130,
          coordinates: [51.5074, -0.1278],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-6",
          manufacturer: "UKSolar",
          model: "UK-180",
          dimensions: [130, 70, 2],
          outputpower: 180,
          warranty: 18,
        },
      },
      address: "Westminster",
      district: "London",
      state: "England",
      country: "United Kingdom",
      income: 19000,
      coordinates: [51.5074, -0.1278], // London coordinates from OpenStreetMap
      unitsavailable: 300,
    },
  });
  const p6 = await prisma.provider.upsert({
    where: { id: 6 },
    update: {},
    create: {
      userid: "test_7",
      sitename: "BerlinCleanEnergy",
      consumers: {
        create: {
          userid: "cons-7",
          name: "Site7",
          address: "Berlin Mitte",
          district: "Berlin",
          state: "Berlin",
          country: "Germany",
          subscription: 1900,
          powergained: 140,
          coordinates: [52.5162, 13.3875],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-7",
          manufacturer: "EuroSolar",
          model: "ES-170",
          dimensions: [140, 60, 2],
          outputpower: 170,
          warranty: 17,
        },
      },
      address: "Potsdamer Platz",
      district: "Berlin",
      state: "Berlin",
      country: "Germany",
      income: 20000,
      coordinates: [52.5162, 13.3875],
      unitsavailable: 500,
    },
  });

  const p7 = await prisma.provider.upsert({
    where: { id: 7 },
    update: {},
    create: {
      userid: "test_8",
      sitename: "TokyoSunrise",
      consumers: {
        create: {
          userid: "cons-8",
          name: "Site8",
          address: "Tokyo Station",
          district: "Tokyo",
          state: "Tokyo",
          country: "Japan",
          subscription: 1600,
          powergained: 110,
          coordinates: [35.702, 139.735],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-8",
          manufacturer: "JapanSolar",
          model: "JS-190",
          dimensions: [160, 70, 2],
          outputpower: 190,
          warranty: 19,
        },
      },
      address: "Shibuya",
      district: "Tokyo",
      state: "Tokyo",
      country: "Japan",
      income: 18000,
      coordinates: [35.702, 139.735],
      unitsavailable: 450,
    },
  });

  const p8 = await prisma.provider.upsert({
    where: { id: 8 },
    update: {},
    create: {
      userid: "test_9",
      sitename: "RioSustainableEnergy",
      consumers: {
        create: {
          userid: "cons-9",
          name: "Site9",
          address: "Rio de Janeiro",
          district: "Rio de Janeiro",
          state: "Rio de Janeiro",
          country: "Brazil",
          subscription: 2100,
          powergained: 160,
          coordinates: [-22.9078, -43.2085],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-9",
          manufacturer: "BrazilSolar",
          model: "BS-200",
          dimensions: [170, 80, 2],
          outputpower: 200,
          warranty: 20,
        },
      },
      address: "Copacabana",
      district: "Rio de Janeiro",
      state: "Rio de Janeiro",
      country: "Brazil",
      income: 22000,
      coordinates: [-22.9078, -43.2085],
      unitsavailable: 420,
    },
  });

  const p9 = await prisma.provider.upsert({
    where: { id: 9 },
    update: {},
    create: {
      userid: "test_10",
      sitename: "DubaiSolarOasis",
      consumers: {
        create: {
          userid: "cons-10",
          name: "Site10",
          address: "Dubai Marina",
          district: "Dubai",
          state: "Dubai",
          country: "United Arab Emirates",
          subscription: 1800,
          powergained: 150,
          coordinates: [25.2664, 55.2928],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-10",
          manufacturer: "DubaiSolar",
          model: "DS-220",
          dimensions: [180, 90, 2],
          outputpower: 220,
          warranty: 22,
        },
      },
      address: "Burj Khalifa",
      district: "Dubai",
      state: "Dubai",
      country: "United Arab Emirates",
      income: 20000,
      coordinates: [25.2664, 55.2928],
      unitsavailable: 300,
    },
  });

  console.log({ p5, p6, p7, p8, p9 });
  const p10 = await prisma.provider.upsert({
    where: { id: 10 },
    update: {},
    create: {
      userid: "test_11",
      sitename: "GizaSolarFarm",
      consumers: {
        create: {
          userid: "cons-11",
          name: "Site11",
          address: "Cairo Downtown",
          district: "Cairo",
          state: "Cairo",
          country: "Egypt",
          subscription: 1900,
          powergained: 140,
          coordinates: [29.9841, 31.2122],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-11",
          manufacturer: "EgyptSolar",
          model: "EG-170",
          dimensions: [150, 70, 2],
          outputpower: 170,
          warranty: 17,
        },
      },
      address: "Giza",
      district: "Giza",
      state: "Giza",
      country: "Egypt",
      income: 20000,
      coordinates: [29.9841, 31.2122],
      unitsavailable: 400,
    },
  });

  const p11 = await prisma.provider.upsert({
    where: { id: 11 },
    update: {},
    create: {
      userid: "test_12",
      sitename: "JohannesburgSunSource",
      consumers: {
        create: {
          userid: "cons-12",
          name: "Site12",
          address: "Johannesburg CBD",
          district: "Johannesburg",
          state: "Gauteng",
          country: "South Africa",
          subscription: 1800,
          powergained: 130,
          coordinates: [-26.205, 28.049722],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-12",
          manufacturer: "SA Solar",
          model: "SA-180",
          dimensions: [160, 70, 2],
          outputpower: 180,
          warranty: 18,
        },
      },
      address: "Sandton",
      district: "Johannesburg",
      state: "Gauteng",
      country: "South Africa",
      income: 19000,
      coordinates: [-26.205, 28.049722],
      unitsavailable: 260,
    },
  });
  const p12 = await prisma.provider.upsert({
    where: { id: 12 },
    update: {},
    create: {
      userid: "test_12",
      sitename: "DelhiRadiate",
      consumers: {
        create: {
          userid: "cons-12",
          name: "Site12",
          address: "Delhi",
          district: "Delhi",
          state: "Delhi",
          country: "India",
          subscription: 1200,
          powergained: 100,
          coordinates: [28.6141, 77.2138],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-12",
          manufacturer: "SunTech",
          model: "ST-100",
          dimensions: [100, 50, 2],
          outputpower: 100,
          warranty: 10,
        },
      },
      address: "Delhi",
      district: "Delhi",
      state: "Delhi",
      country: "India",
      income: 12000,
      coordinates: [28.6141, 77.2138],
      unitsavailable: 100,
    },
  });
  const p13 = await prisma.provider.upsert({
    where: { id: 13 },
    update: {},
    create: {
      userid: "test_13",
      sitename: "BangaloreSunShine",
      consumers: {
        create: {
          userid: "cons-13",
          name: "Site13",
          address: "Bengaluru",
          district: "Bengaluru",
          state: "Karnataka",
          country: "India",
          subscription: 1200,
          powergained: 600,
          coordinates: [12.9744, 77.5929],
        },
      },
      solarpanel: {
        create: {
          userid: "sol-13",
          manufacturer: "SunTech",
          model: "ST-100",
          dimensions: [100, 50, 2],
          outputpower: 100,
          warranty: 10,
        },
      },
      address: "Delhi",
      district: "Delhi",
      state: "Delhi",
      country: "India",
      income: 12000,
      coordinates: [12.9744, 77.5929],
      unitsavailable: 100,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
