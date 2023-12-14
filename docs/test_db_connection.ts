import {PrismaClient} from '@prisma/client'

// Init of services/libs in backend
// Generally static
const prisma = new PrismaClient()

// UserHelper.ts
async function createUser(userData: any) {
    // Validate userData
    if (!userData) {
        throw new Error("INVALID_DATA");
    }

    // Create User in db
    return prisma.user.create({
        data: userData,
    });
}


async function main() {
    const user = await createUser({
        public_name: 'Alice',
        email: 'alice@prisma.io',
        password: "supersecretpassword",
    });

    console.log(user)
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })