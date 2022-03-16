/* ======== START ::: CALLING FUNCTION USING COMMAND LINE ======== */
const yargs = require("yargs");
const contacts = require("./contacts");

// menambahkan contact
yargs
    .command({
        command: "add",
        describe: "Menambahkan contact baru",
        builder: {
            nama: {
                describe: "Nama lengkap",
                demandOption: true,
                type: "string",
            },
            email: {
                describe: "email",
                demandOption: false,
                type: "string",
            },
            noHP: {
                describe: "Nomor Handphone",
                demandOption: true,
                type: "string",
            },
        },
        handler(argv) {
            const contact = {
                nama: argv.nama,
                email: argv.email,
                noHP: argv.noHP,
            };
            contacts.simpanContact(contact.nama, contact.email, contact.noHP);
        },
    })
    .demandCommand();

// menampilkan daftar semua nama, noHP contact
yargs.command({
    command: "list",
    describe: "Menampilkan semua nama dan no hp contact",
    handler() {
        contacts.listContact();
    },
});

// menampilkan detail sebuah kontak
yargs.command({
    command: "detail",
    describe: "Menampilkan detail sebuah contact berdasarkan nama",
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandCommand: true,
            type: "string",
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    },
});

// menghapus kontak berdasarkan nama
yargs.command({
    command: "delete",
    describe: "Menghapus sebuah kontak berdasarkan nama",
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandCommand: true,
            type: "string",
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();
/* ======== END ::: CALLING FUNCTION USING COMMAND LINE ======== */

/* ======== START ::: CALLING FUNCTION USING ASYNC AWAIT ======== */
// const { tulisPertanyaan, simpanContact } = require("./contacts");

// const main = async () => {
//     const nama = await tulisPertanyaan("Masukkan nama anda : ");
//     const email = await tulisPertanyaan("Masukkan email anda : ");
//     const noHP = await tulisPertanyaan("Masukkan No HP anda : ");

//     simpanContact(nama, email, noHP);
// };

// main();
/* ======== END ::: CALLING FUNCTION USING ASYNC AWAIT ======== */

/* ======== START ::: CALLING FUNCTION USING CALLBACK ======== */
// rl.question("Masukkan nama anda : ", (nama) => {
//     rl.question("Masukkan no HP anda : ", (noHP) => {
//         const newContact = { nama, noHP };
//         const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
//         const contacts = JSON.parse(fileBuffer);

//         contacts.push(newContact);

//         fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
//         console.log("Terimakasih sudah Memasukkan data");
//         rl.close();
//     });
// });
/* ======== END ::: CALLING FUNCTION USING CALLBACK ======== */
