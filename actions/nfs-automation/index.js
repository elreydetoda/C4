import { getInput } from '@actions/core';
import { GitHub, context as _context } from '@actions/github';

async function handleNewIssue() {
    const token = getInput('repo-token');
    const octokit = new GitHub(token);
    const context = _context;

    console.log(context);
}

handleNewIssue()
    .then(
        () => {
            console.log("Success");
        },
        err => {
            console.log("Errored");
        }
    )
    .then(
        () => {
            process.exit();
        });