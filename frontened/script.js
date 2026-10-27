// ======================================
// BUSINESSHUB AUTHENTICATION
// ======================================

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";


// ======================================
// ELEMENTS
// ======================================

const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");

const createAccountLink =
    document.getElementById("createAccountLink");

const backToLogin =
    document.getElementById("backToLogin");


// ======================================
// SHOW SIGN UP
// ======================================

createAccountLink.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        loginForm.style.display = "none";
        signupForm.style.display = "block";

    }
);


// ======================================
// SHOW LOGIN
// ======================================

backToLogin.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        signupForm.style.display = "none";
        loginForm.style.display = "block";

    }
);


// ======================================
// LOGIN
// ======================================

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("email")
                .value
                .trim();

        const password =
            document.getElementById("password")
                .value;


        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("Login successful!");

            window.location.href =
                "dashboard.html";


        } catch (error) {

            console.error(error);

            if (
                error.code ===
                "auth/invalid-credential"
            ) {

                alert(
                    "Incorrect email or password."
                );

            } else if (
                error.code ===
                "auth/invalid-email"
            ) {

                alert(
                    "Please enter a valid email address."
                );

            } else {

                alert(
                    "Login failed. Please try again."
                );

            }

        }

    }
);


// ======================================
// SIGN UP
// ======================================

signupForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const ownerName =
            document.getElementById("signupName")
                .value
                .trim();

        const businessName =
            document.getElementById("signupBusiness")
                .value
                .trim();

        const email =
            document.getElementById("signupEmail")
                .value
                .trim();

        const password =
            document.getElementById("signupPassword")
                .value;

        const confirmPassword =
            document.getElementById(
                "signupConfirmPassword"
            ).value;


        // ==================================
        // CHECK PASSWORD
        // ==================================

        if (password !== confirmPassword) {

            alert(
                "Passwords do not match."
            );

            return;

        }


        try {

            // ==================================
            // CREATE FIREBASE AUTH ACCOUNT
            // ==================================

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user =
                userCredential.user;


            // ==================================
            // SAVE BUSINESS PROFILE
            // ==================================

            await setDoc(
                doc(
                    db,
                    "businesses",
                    user.uid
                ),
                {

                    ownerName:
                        ownerName,

                    businessName:
                        businessName,

                    email:
                        email,

                    uid:
                        user.uid,

                    createdAt:
                        new Date().toISOString()

                }
            );


            console.log(
                "Business profile saved:",
                user.uid
            );


            alert(
                "Business account created successfully!"
            );


            // ==================================
            // GO TO DASHBOARD
            // ==================================

            window.location.href =
                "dashboard.html";


        } catch (error) {

            console.error(
                "Signup error:",
                error
            );


            if (
                error.code ===
                "auth/email-already-in-use"
            ) {

                alert(
                    "This email is already registered."
                );

            } else if (
                error.code ===
                "auth/invalid-email"
            ) {

                alert(
                    "Please enter a valid email address."
                );

            } else if (
                error.code ===
                "auth/weak-password"
            ) {

                alert(
                    "Password is too weak. Please use a stronger password."
                );

            } else {

                alert(
                    "Account creation failed. Please try again."
                );

            }

        }

    }
);