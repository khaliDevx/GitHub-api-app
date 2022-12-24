// Vars

let repo_name = document.querySelector('#repo-name');
let issuesList = document.querySelector('#issues-list');


// Functions

function getRepoName() {
    let url = document.location.search;

    let repoName = url.split('=')[1];
    repo_name.innerHTML = repoName
    if (repoName) {
        getIssues(repoName);
    }
}

function getIssues(repoName) {
    let apiUrl = "https://api.github.com/repos/" + repoName + "/issues";
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayIssues(data))
        .catch(err => alert('Something went Wrong!!'))
}

function displayIssues(issues) {
    issues.forEach(issue => {
        issuesList.innerHTML += `
            <a href='${issue.html_url}' target="_blank" class="repo text-light text-decoration-none w-100 my-2 p-3 bg-gradient bg-dark d-flex justify-content-between rounded">
                <span>${issue.title}</span>
            </a>
        `
    })
}

getRepoName();
