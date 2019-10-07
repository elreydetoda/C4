const core = require('@actions/core');
const github = require('@actions/github');

async function handleNewIssue() {
    const token = core.getInput('repo-token');
    const octokit = new github.GitHub(token);
    const context = github.context;

    if (context.payload.issue == undefined) {
        throw Error(`This action should be run against issue events.
                    See https://help.github.com/en/articles/events-that-trigger-workflows#issues-event-issues`);
    }

    const issue = context.payload.issue;
    console.log(context.payload.repository.owner);
    console.log(context.payload.repository.name);

    if (!(issue.title.startsWith("[NFS]") && hasNfsLabel(issue.labels))) {
        console.log("The issue is not a new NFS submission.");
        return;
    }

    title = issue.title.slice(5);
    color = "000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

    // Create a label with a valid description
    await octokit.issues.createLabel({
        owner: context.payload.repository.owner,
        repo: context.payload.repository.name,
        color: color,
        name: title,
        description: `specific to ${title} c2 framework`,
    });

    // Create the issue for the video
    await octokit.issues.create({
        owner: context.payload.repository.owner,
        repo: context.payload.repository.name,
        title: "[VIDEO] ".concat(title),
        labels: ["video", "NFS", "enhancement", title],
        body: "Test issue body for now",
    });

}

function hasNfsLabel(labelArray) {
    return labelArray.filter(label => { return label.name == 'NFS' }).length > 0
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