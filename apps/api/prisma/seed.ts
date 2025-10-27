import { prisma } from "../src/db/client";

const movies = [
  { title: "The Matrix", year: 1999, genre: "Sci-Fi", rating: 8.7, thumbnail: "https://media.istockphoto.com/id/1125877063/de/foto/gemischte-rassen-frau-singt-und-spielt-gitarre.jpg?s=612x612&w=0&k=20&c=ZK40SJceWcX-fsVxo5Rytwu_xpHfha7i5QNVDCkh0qY="},
  { title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8, thumbnail: "https://media.istockphoto.com/id/1319479588/de/foto/die-musiker-spielten-rockmusik-auf-der-b%C3%BChne-es-gab-ein-publikum-voller-zuschauer-die-das.jpg?s=612x612&w=0&k=20&c=BIOhImGFZ28yh8mCiQ1Shkz7SplsGLEnsYQejrN_Y1w="},
  { title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, thumbnail: "https://media.istockphoto.com/id/165968666/de/vektor/bunte-musik-band.jpg?s=612x612&w=0&k=20&c=jF98va3SJReYGW2KXNCj4SbiGcP2Yjklmqa24oi_xkA="},
  { title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, thumbnail: "https://media.istockphoto.com/id/1401474031/de/foto/junge-dj-die-ein-online-musikset-f%C3%BCr-ihre-zuh%C3%B6rer-macht.jpg?s=612x612&w=0&k=20&c=qW6ZNYvV80DEGn2DZw9EzTD13f4JS1NVMFlIoSXUEiI="},
  { title: "Parasite", year: 2019, genre: "Thriller", rating: 8.6, thumbnail: ""},
  { title: "Whiplash", year: 2014, genre: "Drama", rating: 8.5, thumbnail: ""},
  { title: "The Godfather", year: 1972, genre: "Crime", rating: 9.2, thumbnail: ""},
  { title: "Spirited Away", year: 2001, genre: "Animation", rating: 8.6, thumbnail: ""},
  { title: "Mad Max: Fury Road", year: 2015, genre: "Action", rating: 8.1, thumbnail: ""},
  { title: "Get Out", year: 2017, genre: "Horror", rating: 7.8, thumbnail: ""},
  { title: "La La Land", year: 2016, genre: "Musical", rating: 8.0, thumbnail: ""},
  { title: "The Social Network", year: 2010, genre: "Drama", rating: 7.8, thumbnail: ""}
];

async function main() {
  await prisma.movie.deleteMany();
  for (const m of movies) {
    await prisma.movie.create({ data: m });
  }
  console.log(`Seeded ${movies.length} movies.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
