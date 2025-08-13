import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const movies = [
    { title: "The Matrix", year: 1999, genre: "Sci-Fi", rating: 8.7 },
    { title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8 },
    { title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0 },
    { title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6 },
    { title: "Parasite", year: 2019, genre: "Thriller", rating: 8.6 },
    { title: "Whiplash", year: 2014, genre: "Drama", rating: 8.5 },
    { title: "The Godfather", year: 1972, genre: "Crime", rating: 9.2 },
    { title: "Spirited Away", year: 2001, genre: "Animation", rating: 8.6 },
    { title: "Mad Max: Fury Road", year: 2015, genre: "Action", rating: 8.1 },
    { title: "Get Out", year: 2017, genre: "Horror", rating: 7.8 },
    { title: "La La Land", year: 2016, genre: "Musical", rating: 8.0 },
    { title: "The Social Network", year: 2010, genre: "Drama", rating: 7.8 }
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
