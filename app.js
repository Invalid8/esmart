const itemRow = document.querySelector(".service-type");
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
const main = document.querySelector("main");
const navBar = document.querySelector(".navigation-bar");
const searchBtn = document.querySelector(".search-btn");
const openUserApp = false;

let ifLoggedIn = false;
let signLogBox;

let errorMsg;
let list;

fetch("https://fakestoreapi.com/products?limit=15")
    .then((res) => res.json())
    .then((products) => {
        products.map((product) => {
            const productItem = `
        <article class="serve-type-modal">
        <div class="imgContainer">
            <img src=${product.image} alt="">
        </div>
            <div class="info">
            <div class="name-price">
                    <h3 class="name">${product.title.substring(0, 14)}...</h3>
                    <div class="price">$${product.price}</div>
                </div>
                <p class="item-info">
                ${product.description.substring(0, 20)}....
                </p>
                <button class="btn addToCart">Add to cart</button>
                </div>
                </article>
        `;
            itemRow.innerHTML += productItem;
        });

        const addToCart = itemRow.querySelector(".addToCart");

        addToCart.addEventListener("click", () => {
            if (ifLoggedIn) {
                console.log("added");
            } else {
                addLoginSignUp();
            }
        });
        animations();
    });

menuBtn.addEventListener("click", () => {
    links.classList.toggle("show-links");
});

main.addEventListener("click", () => {
    links.classList.remove("show-links");
});

const loginBtn = links.querySelector(".login-btn");
const signupBtn = links.querySelector(".signup-btn");

let switchForm = false;

loginBtn.addEventListener("click", () => {
    switchForm = true;
    addLoginSignUp();
});

signupBtn.addEventListener("click", () => {
    switchForm = false;
    addLoginSignUp();
});

function addLoginSignUp() {
    if (signLogBox) {
        return;
    }

    signLogBox = document.createElement("div");
    signLogBox.classList.add("login-signup-box");

    signLogBox.innerHTML = signLogModal();

    main.append(signLogBox);

    const closeBox_btn = signLogBox.querySelector(".close-modal");
    const signupBox = signLogBox.querySelector(".sign-upBox");
    const loginBtn = signLogBox.querySelector(".login-btn");
    const signupBtn = signLogBox.querySelector(".signup-btn");
    const signinForm = signLogBox.querySelector(".sign-up");
    const error = signLogBox.querySelector(".error-msg");

    const loginForm = signLogBox.querySelector(".login");

    if (switchForm) {
        signupBox.classList.add("move-sign-up");
    } else {
        signupBox.classList.remove("move-sign-up");
    }

    closeBox_btn.addEventListener("click", () => {
        signLogBox.remove();
        signLogBox = null;
    });

    loginBtn.addEventListener("click", () => {
        signupBox.classList.add("move-sign-up");
    });

    signupBtn.addEventListener("click", () => {
        signupBox.classList.remove("move-sign-up");
    });

    const password1 = signinForm.querySelector("#password");
    const password2 = signinForm.querySelector("#confirm-password");
    const signEmail = signinForm.querySelector("#email");
    const username = signinForm.querySelector("#name");

    const password = loginForm.querySelector("#password");
    const logEmail = loginForm.querySelector("#email");

    const logError = signLogBox.querySelector(".log-error-msg");

    password1.addEventListener("click", defaultForm);
    password2.addEventListener("click", defaultForm);

    password.addEventListener("click", defaultForm);
    signEmail.addEventListener("click", defaultForm);
    logEmail.addEventListener("click", defaultForm);

    function defaultForm() {
        error.textContent = "";
        logError.textContent = "";
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/userData/")
            .then((res) => {
                if (!res.ok) {
                    throw Error("Worng email or password");
                }
                return res.json();
            })
            .then((data) => {
                return data.filter((pass) => {
                    if (
                        pass.email === logEmail.value &&
                        pass.password === password.value
                    ) {
                        return (window.location.href = "/");
                    } else {
                        return (logError.textContent =
                            "Worng email or password");
                    }
                });
            })
            .catch((err) => {
                errorMsg = err;
            });
    });

    signinForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (password1.value !== password2.value) {
            error.textContent = "passwords do not match";
        } else {
            const blog = {
                username: username.value,
                password: password1.value,
                email: signEmail.value,
                products_in_cart: [],
            };
            console.log(blog);
        }
    });

    function signLogModal() {
        return `
            <div class="closeContainer">
                <button class="close-modal"><i class="fa fa-close"></i></button>
            </div>

            <div class="subConatiner">
            <div class="sign-upBox">
                <h2>Sign up</h2>
                <div class="under"></div>
                <p class="error-msg"></p>
                <form action="#" method="post" class="sign-up">
                    <label for="userName">Name</label>
                    <input type="text" name="name" id="name" placeholder="John Doe" required>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="eg@example.com" required>
                    <label for="password">password</label>
                    <input type="password" name="password" id="password" required>
                    <label for="comfirm-password">comfirm password</label>
                    <input type="password" name="comfirm-password" id="confirm-password" required>
                    <input type="submit" value="Sign up">
                </form>
                <p class="other">
                    Already have an account?
                    <button class="login-btn">login</button>
                </p>
            </div>

                <div class="loginBox">
                    <p class="log-error-msg"></p>
                    <h2>Login</h2>
                    <div class="under"></div>
                    <form action="#" method="get" class = "login">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" required>
                        <label for="password">password</label>
                        <input type="password" name="password" id="password" required>
                        <input type="submit" value="login">
                        <p class="forgot-txt"><a href="#" class="forgotten-password">forgotten password?</a></p>
                    </form>
                    <p class="other">Create an account <button class="btn signup-btn">sign up</button></p>
                </div>

            </div>

        `;
    }
}

const scrollTos = links.querySelectorAll(".scroll-to");
const navBarHeight = navBar.getBoundingClientRect().height;

scrollTos.forEach((scroll) => {
    scroll.addEventListener("click", (e) => {
        e.preventDefault();
        let id = scroll.getAttribute("href");

        let element = document.querySelector(`${id}`);
        let elementHeight = element.getBoundingClientRect().top;
        let position = window.scrollY;

        if (position > navBarHeight) {
            elementHeight += navBarHeight;
        }

        window.scrollTo({
            top: elementHeight,
            left: 0,
        });
    });
});

let position = window.scrollY;

window.addEventListener("scroll", () => {
    animations();
});

//animations

function animations() {
    const ourInfo = main.querySelector(".our-info");
    const infoModals = ourInfo.querySelectorAll(".info-modal");

    const ourInfoPosition = ourInfo.getBoundingClientRect().top;
    const serve_type_modals = itemRow.querySelectorAll(".serve-type-modal");
    const itemRowHeight = itemRow.getBoundingClientRect().top;

    // const infoModalHeight = infoModal.getBoundingClientRect().top;

    if (
        position >
        infoModals[0].getBoundingClientRect().top - window.innerHeight / 2
    ) {
        infoModals.forEach((infoModal) => {
            infoModal.classList.add("show-info-modal");
        });
    } else {
        infoModals.forEach((infoModal) => {
            infoModal.classList.remove("show-info-modal");
        });
    }

    if (
        position >
        serve_type_modals[0].getBoundingClientRect().top -
            (window.innerHeight - window.innerHeight / 4)
    ) {
        serve_type_modals.forEach((serve_type_modal) => {
            serve_type_modal.classList.add("show-serve-modal");
        });
    } else {
        serve_type_modals.forEach((serve_type_modal) => {
            serve_type_modal.classList.remove("show-serve-modal");
        });
    }
}
