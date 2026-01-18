// variables de données
let mots = [
    "COUCOU",
    "ANTICONSTITUTIONNELLEMENT",
    "BOUILLOTTERAIT",
    "ACCOMPAGNATEUR",
    "ADDITIONNERONS",
    "ANGLICISATIONS",
    "PARE-CHOC",
    "AUJOURD'HUI",
    "AU REVOIR",
    "APHRODISIAQUES",
    "VROMBISSEMENTS"
];
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", "'", " "];

// variables d'emplacements
const zoneBouton1 = document.getElementById('zoneBouton1');
const zoneBouton2 = document.getElementById('zoneBouton2');
const zoneMot = document.getElementById('zoneMot');
const zoneBtnReco = document.getElementById('zoneBtnReco');
const btnReco = document.getElementById('btnReco');
const zoneIcone = document.getElementById('zoneIcone');
const tablePourCacher = document.getElementById('tablePourCacher');
const imgPendu = document.getElementById('imgPendu');

// variables utiles
let mot;
let empsLettre;
let erreur = 0;

// flags
let manqueUneLettre;
let gagne;
let estPerdu;

// Le jeu
// initialisation
creerBoutons();
choisirUnMot(mots);
initIcone();
afficherEmpLettre(mot);
boutons = document.querySelectorAll('button');
empsLettre = document.querySelectorAll('.empLettre');
// grande fonction principale
ecouterLesBoutonsLettres();

console.log(mot, boutons, empsLettre);

// fonctions
// fonctions d'initialisation
function nombreAleatoire(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function creerBoutons() {
    for (let i = 0; i < 13; i++) {
        let button = document.createElement('button');
        button.id = alphabet[i];
        button.textContent = alphabet[i];
        button.classList.add('boutonLettre');
        zoneBouton1.appendChild(button);
    }
    for (let i = 13; i < alphabet.length; i++) {
        let button = document.createElement('button');
        if (alphabet[i] === "'" || alphabet[i] === '-' || alphabet[i] === ' ') {
            if (alphabet[i] === "'") {
                button.id = "apos";
            }
            if (alphabet[i] === '-') {
                button.id = 'tiret';
            }
            if (alphabet[i] === ' ') {
                button.id = 'espace';
            }
        } else {
            button.id = alphabet[i]
        }
        button.textContent = alphabet[i] === ' ' ? 'espace' : alphabet[i];
        button.classList.add('boutonLettre');
        zoneBouton2.appendChild(button);
    }
}
function choisirUnMot(liste) {
    mot = liste[nombreAleatoire(liste.length)];
}
function afficherEmpLettre(motAAfficher) {
    for (let i = 0; i < motAAfficher.length; i++) {
        let lettre = document.createElement('div');
        if (motAAfficher[i] === "'" || motAAfficher[i] === '-' || motAAfficher[i] === ' ') {
            if (motAAfficher[i] === "'") {
                lettre.classList.add('apos');
            }
            if (motAAfficher[i] === '-') {
                lettre.classList.add('tiret');
            }
            if (motAAfficher[i] === ' ') {
                lettre.classList.add('espace');
            }
        } else {
            lettre.classList.add(motAAfficher[i]);
        }
        lettre.classList.add('empLettre');
        zoneMot.appendChild(lettre);
    }
}
function initIcone() {
    zoneIcone.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        let icone = document.createElement('i');
        icone.id = `icone${i + 1}`;
        icone.classList.add('fa-solid');
        icone.classList.add('fa-skull');
        icone.classList.add('clair');
        zoneIcone.appendChild(icone);
    }
}

//fonction principale
function ecouterLesBoutonsLettres() {
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].addEventListener('click', () => {
            console.log(`J'ai cliqué sur la lettre ${boutons[i].id}`);
            verifierEtAfficherLettre(boutons[i].id);
            verifierSiGagne();
            verifierSiPerdu();
            afficherBtnReco();
            console.log(erreur, manqueUneLettre, empsLettre.length, gagne, estPerdu);
        })
    }
}
// fonctions imbriquées dans la fonction principale
function verifierEtAfficherLettre(lettre) {
    if (lettre === 'apos' || lettre === 'tiret' || lettre === 'espace') {
        if (lettre === 'apos') {
            if (mot.includes("'")) {
                let lettreAAfficher = document.querySelectorAll(`.apos`);
                lettreAAfficher.forEach((e) => e.innerHTML = `'`);
                mettreEnVert(lettre);
            } else {
                mettreEnRouge(lettre);
                erreur++;
                afficherPendu(erreur);
                foncerIconeCrane();
            }
        }
        if (lettre === 'tiret') {
            if (mot.includes("-")) {
                let lettreAAfficher = document.querySelectorAll(`.tiret`);
                lettreAAfficher.forEach((e) => e.innerHTML = `-`);
                mettreEnVert(lettre);
            } else {
                mettreEnRouge(lettre);
                erreur++;
                afficherPendu(erreur);
                foncerIconeCrane();
            }
        }
        if (lettre === 'espace') {
            if (mot.includes(" ")) {
                let lettreAAfficher = document.querySelectorAll(`.espace`);
                lettreAAfficher.forEach((e) => e.innerHTML = `⌀`);
                mettreEnVert(lettre);
            } else {
                mettreEnRouge(lettre);
                erreur++;
                afficherPendu(erreur);
                foncerIconeCrane();
            }
        }


    } else {
        if (mot.includes(lettre)) {
            let lettreAAfficher = document.querySelectorAll(`.${lettre}`);
            lettreAAfficher.forEach((e) => e.innerHTML = `${lettre}`);
            mettreEnVert(lettre);
            /* effacerLettre(lettre); */
        } else {
            mettreEnRouge(lettre);
            erreur++;
            afficherPendu(erreur);
            foncerIconeCrane();
            /* effacerLettre(lettre); */
        }
    }
}
function foncerIconeCrane() {
    let icone = document.getElementById(`icone${erreur}`);
    icone.classList.replace('clair', 'fonce');
}
function mettreEnVert(id) {
    let btn = document.getElementById(id);
    btn.disabled = true;
    btn.classList.add('green');
}
function mettreEnRouge(id) {
    let btn = document.getElementById(id);
    btn.disabled = true;
    btn.classList.add('red');
}
/* function effacerLettre(id){
    let btn = document.getElementById(id);
    btn.disabled = true;
    btn.classList.add('effacer');
} */
function afficherPendu(faute) {
    let caseAMontrer = document.getElementById(`c${faute}`);
    caseAMontrer.classList.add('caseAMontrer');
}
function verifierSiGagne() {
    empsLettre = document.querySelectorAll('.empLettre');
    manqueUneLettre = false;
    for (let i = 0; i < mot.length; i++) {
        manqueUneLettre = empsLettre[i].innerHTML == '' ? true : manqueUneLettre;
    }
    gagne = manqueUneLettre === false ? true : false;
    if (gagne === true) {
        boutons.forEach((e) => e.disabled = true);
        let imgVictoire = document.getElementById('imgVictoire');
        imgVictoire.classList.remove('hidden');
        tablePourCacher.classList.add('hidden');
        imgPendu.classList.add('hidden');
        let icones = document.querySelectorAll('i');
        icones.forEach((i) => i.classList.replace('clair', 'fonce'));
        icones.forEach((i) => i.classList.add('fa-bounce'));
        icones.forEach((i) => i.classList.add('greenIcone'));
    }
}
function verifierSiPerdu() {
    estPerdu = erreur >= 9 ? true : false;
    if (estPerdu === true) {
        boutons.forEach((e) => e.disabled = true);
        let icones = document.querySelectorAll('i');
        icones.forEach((i) => i.classList.replace('fonce', 'redIcone'));
        icones.forEach((i) => i.classList.add('fa-fade'));
    }
}
// ecouter le btnReco
function afficherBtnReco() {
    if (gagne || estPerdu) {
        zoneBtnReco.classList.remove('hidden');
        btnReco.classList.add(gagne ? 'btn-success' : 'btn-warning')
        btnReco.classList.remove(estPerdu ? 'btn-success' : 'btn-warning')
        ecouterBtnReco();
    }
}
// fonctions imbriquées
function ecouterBtnReco() {
    btnReco.addEventListener('click', () => {
        console.log('g clickey');
        zoneBtnReco.classList.add('hidden');
        reinitZones();
        reinitFlags();
        reinitBtn();
        reinitCase();
        initIcone();
        choisirUnMot(mots);
        afficherEmpLettre(mot);
    })
}
function reinitZones() {
    zoneMot.innerHTML = '';
}
function reinitFlags() {
    gagne = false;
    estPerdu = false;
    manqueUneLettre = false;
    erreur = 0;
}
function reinitBtn() {
    let boutons = document.querySelectorAll('button');
    boutons.forEach((b) => b.disabled = false);
    boutons.forEach((b) => b.classList.remove('green'));
    boutons.forEach((b) => b.classList.remove('red'));
    boutons.forEach((b) => b.classList.remove('effacer'));
}
function reinitCase() {
    let cases = document.querySelectorAll('td');
    cases.forEach((c) => c.classList.remove('caseAMontrer'));
    let imgVictoire = document.getElementById('imgVictoire');
    imgVictoire.classList.add('hidden');
    tablePourCacher.classList.remove('hidden');
    imgPendu.classList.remove('hidden');
}
