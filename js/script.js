// Setup vars

let userFormEl = document.querySelector('#user-form');
let userInputEl = document.querySelector('#username');
let languages = document.querySelector('.languages');
let searchTerm = document.querySelector('#search-term');
let reposList = document.querySelector('#repos-list');
let alertEl = document.querySelector('#alert');

// Events

userFormEl.addEventListener('submit', formSubmitHandler);
languages.addEventListener('click', langsClickHandler);


// Functions

function langsClickHandler(e) {
    let lang = e.target.getAttribute('data-lng');

    fetchLangRepos(lang);
}

function fetchLangRepos(lang){
    let apiUrl = "https://api.github.com/search/repositories?q=" + lang;
    searchTerm.innerHTML = `<span class="h5 fw-bold">Search by language: ${lang}</span>`
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayUserRepos(data.items, lang))
        .catch(err => alert('Something went Wrong!'))
}

function formSubmitHandler(e) {
    e.preventDefault();
    let user = userInputEl.value.trim()
    if (user) {
        fetchUserRepos(user);
    } else {
        alertEl.innerHTML = 'please enter a github username!';
    }
}


function fetchUserRepos(user) {
    let apiUrl = "https://api.github.com/users/" + user + "/repos";
    searchTerm.innerHTML = `<span class="h5 fw-bold">Search by username: ${user}</span>`
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayUserRepos(data))
        .catch(err => searchTerm.innerHTML = `<span class="h4 text-danger fw-bold"> Username ${user} not Found!</span>`)
}


function displayUserRepos(repos) {
    reposList.innerHTML = ""
    repos.forEach(repo => {
        reposList.innerHTML += `
            <a href="./repo.html?repo=${repo.owner.login}/${repo.name}" class="repo text-light text-decoration-none w-100 my-2 p-3 bg-gradient bg-dark d-flex justify-content-between rounded">
                <span>${repo.owner.login} / ${repo.name}</span>
                <span>${repo.open_issues_count > 0 ? repo.open_issues_count + '  Issue  <i class="fa fa-xmark text-danger"> </i>' : 'No Issues <i class="fa fa-check text-success"></i>'}</span>
            </a>
        `
    })
}
