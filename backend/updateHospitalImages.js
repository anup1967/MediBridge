require("dotenv").config();

const mongoose = require("mongoose");
const Hospital = require("./models/Hospital");

const images = {
  "AIMS Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819625/aims.jpg",

  "Apollo Hospitals Navi Mumbai":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819626/Apollo.jpg",

  "Bethany Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819632/bethany.png",

  "Bombay Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819628/bombay.jpg",

  "Breach Candy Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819627/Breach.avif",

  "Cardinal Gracias Memorial Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819630/cardinal.avif",

  "Currae Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819629/currae.jpg",

  "DY Patil Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819632/D.Y.Patil.jpg",

  "Fortis Hiranandani Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819633/fortis-hiranandani.webp",

  "Fortis Hospital Kalyan":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819635/fortis-kalyan.png",

  "Global Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819636/global.jpg",

  "P. D. Hinduja Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819782/P.D._Hinduja.png",

  "Horizon Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819637/horizon.png",

  "IASIS Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819638/iasis.webp",

  "Jaslok Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819641/Jaslok.jpg",

  "Jupiter Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819639/Jupiter.webp",

  "Kaushalya Medical Foundation Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819678/kaushalya.jpg",

  "Kokilaben Dhirubhai Ambani Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819642/kokilaben.jpg",

  "Lilavati Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819750/Lilavati.jpg",

  "MGM Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819750/Mgm.webp",

  "Platinum Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819783/Platinum.webp",

  "Reliance Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819785/Reliance.webp",

  "Riddhivinayak Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819788/riddhi.png",

  "Saarthi Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819788/sarthi.jpg",

  "SevenHills Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819803/sevenhills.png",

  "Shreedevi Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784820430/shree.png",

  "Terna Speciality Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819791/terna.jpg",

  "Vertex Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819793/Vertex.jpg",

  "Wockhardt Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819624/Wockhardt.webp",

  "Zen Multi Speciality Hospital":
    "https://res.cloudinary.com/yjdtftxk/image/upload/v1784819624/Zen.png",
};

async function updateImages() {
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: "medibridge",
  });

  for (const [name, image] of Object.entries(images)) {
    const result = await Hospital.updateOne(
      { name },
      { $set: { image } }
    );

    console.log(`${name} -> ${result.modifiedCount ? "Updated" : "Not Found"}`);
  }

  console.log("✅ All hospital images updated.");

  await mongoose.disconnect();
}

updateImages().catch(console.error);