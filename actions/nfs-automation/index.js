import { getInput } from '@actions/core';
import { GitHub, context as _context } from '@actions/github';

async function handleNewIssue() {
    const token = getInput('repo-token');
    const octokit = new GitHub(token);
    const context = _context;

    if (context.payload.issue == undefined) {
        throw Error(`This action should be run against issue events.
                    See https://help.github.com/en/articles/events-that-trigger-workflows#issues-event-issues`);
    }

    const issue = context.payload.issue;
    console.log(issue.labels);

    if (!issue.title.startsWith("[NFS]") || !issue.labels.contains("NFS")) {
        console.log("The issue is not a new NFS submission.");
        return;
    }

    title = issue.title.slice(5);
    var color = "000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

    // Create a label with a valid description
    await octokit.issues.createLabel({
        ...context.payload.repository.owner,
        ...context.payload.repository.name,
        ...color,
        name: title,
        description: `specific to ${title} c2 framework`,
    });

    // Create the issue for the video
    await octokit.issues.create({
        ...context.payload.repository.owner,
        ...context.payload.repository.name,
        title: "[VIDEO] ".concat(title),
        labels: ["video", "NFS", "enhancement", title],
        body: "Test issue body for now",
    });

}

handleNewIssue()
    .then(
        () => {
            console.log("Success");
        },
        err => {
            console.log(`Errored: ${err}`);
        }
    )
    .then(
        () => {
            process.exit();
        });