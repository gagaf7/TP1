document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const main = document.querySelector('main');

    // Création d'un conteneur pour les messages d'erreur
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.style.marginBottom = '1em';
    form.prepend(errorDiv);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        errorDiv.textContent = '';

        // Récupération des champs
        const login = form.login.value.trim();
        const password = form.password.value;
        const confirmPassword = form.confirm_password.value;
        const nom = form.nom.value.trim();
        const prenom = form.prenom.value.trim();
        const adresse = form.adresse.value.trim();
        const email = form.email.value.trim();
        const telephone = form.telephone.value.trim();
        const dateNaissance = form.date_naissance.value;

        // Vérification des champs vides
        if (!login || !password || !confirmPassword || !nom || !prenom || !adresse || !email || !telephone || !dateNaissance) {
            errorDiv.textContent = 'Veuillez remplir tous les champs.';
            return;
        }

        // Vérification de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorDiv.textContent = 'Veuillez saisir une adresse email valide.';
            return;
        }

        // Vérification des mots de passe
        if (password !== confirmPassword) {
            errorDiv.textContent = 'Les mots de passe ne correspondent pas.';
            return;
        }

        // Vérification du téléphone (doit être une suite de chiffres)
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(telephone)) {
            errorDiv.textContent = 'Le numéro de téléphone doit contenir uniquement des chiffres.';
            return;
        }

        // Si tout est correct, afficher la page récapitulative
        form.style.display = 'none';
        const recap = document.createElement('div');
        recap.innerHTML = `
            <h2>Inscription réussie !</h2>
            <p>Login : ${login}</p>
            <p>Nom : ${nom}</p>
            <p>Prénom : ${prenom}</p>
            <p>Adresse : ${adresse}</p>
            <p>Email : ${email}</p>
            <p>Téléphone : ${telephone}</p>
            <p>Date de naissance : ${dateNaissance}</p>
        `;
        main.appendChild(recap);
    });
});

const box = document.querySelector('.box');
let posX = 0;
let posY = 0;
let directionX = 1;
let directionY = 1;
const speed = 2; // Adjust the speed as needed

function moveBox() {
    const boxRect = box.getBoundingClientRect();
    const containerRect = document.documentElement.getBoundingClientRect();

    if (boxRect.right >= containerRect.right || boxRect.left <= containerRect.left) {
        directionX *= -1;
    }
    if (boxRect.bottom >= containerRect.bottom || boxRect.top <= containerRect.top) {
        directionY *= -1;
    }

    posX += directionX * speed;
    posY += directionY * speed;

    box.style.left = `${posX}px`;
    box.style.top = `${posY}px`;
    box.style.transform = `rotateX(-30deg) rotateY(${(Date.now() / 1000) * 90}deg)`;
    requestAnimationFrame(moveBox);
}

moveBox();