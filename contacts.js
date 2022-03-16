const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

/* ======== START ::: FOR CALLING FUNCTION WITH ASYNC AND CALLBACK ======== */
// const readline = require("readline");

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
/* ======== END ::: FOR CALLING FUNCTION WITH ASYNC AND CALLBACK ======== */

// cek directory apakah exist
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, "[]", "utf-8");
}
/* ======== START ::: FOR CALLING FUNCTION WITH ASYNC ======== */
// const tulisPertanyaan = (pertanyaan) => {
//     return new Promise((resolve, reject) => {
//         rl.question(pertanyaan, (item) => {
//             resolve(item);
//         });
//     });
// };
/* ======== END ::: FOR CALLING FUNCTION WITH ASYNC ======== */

const loadContact = () => {
    const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(fileBuffer);
    return contacts;
};

const simpanContact = (nama, email, noHP) => {
    const newContact = { nama, email, noHP };
    const contacts = loadContact();

    // cek duplikat nama
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(
            chalk.red.inverse.bold(
                "Contact sudah terdaftar, gunakan nama lain!"
            )
        );
        return false;
    }

    // cek format email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold("Email tidak valid!"));
            return false;
        }
    }

    // cek no hp
    if (!validator.isMobilePhone(noHP, "id-ID")) {
        console.log(chalk.red.inverse.bold("Nomor HP tidak valid!"));
        return false;
    }

    contacts.push(newContact);

    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold("Terimakasih sudah Memasukkan data"));

    /* ======== START ::: FOR CALLING FUNCTION WITH ASYNC AND CALLBACK ======== */
    // rl.close();
    /* ======== END ::: FOR CALLING FUNCTION WITH ASYNC AND CALLBACK ======== */
};

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold("Daftar Kontak : "));
    contacts.forEach((contact, index) => {
        console.log(`${index + 1}. ${contact.nama} - ${contact.noHP}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();
    const selectedContact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    );

    if (!selectedContact) {
        console.log(chalk.red.inverse.bold(`${nama} ini tidak ditemukan!`));
        return false;
    }

    console.log(chalk.cyan.inverse.bold(selectedContact.nama));
    console.log(selectedContact.noHP);
    if (selectedContact.email) console.log(selectedContact.email);
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    if (contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${nama} ini tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`Data kontak ${nama} telah terhapus`));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };

/* ======== START ::: FOR CALLING FUNCTION WITH ASYNC AND CALLBACK ======== */
// module.exports = { tulisPertanyaan, simpanContact };
/* ======== END ::: FOR CALLING FUNCTION WITH ASYNC AND CALLBACK ======== */
