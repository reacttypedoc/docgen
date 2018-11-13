import inquirer from "inquirer";
import git from "nodegit";

export default async function(projectPath: string) {
    let repository: git.Repository;
    try {
        repository = await git.Repository.open(projectPath);
    } catch {
        let response = await inquirer.prompt<{createGitRepo: boolean}>([
            {
                default: true,
                message: `There is no git repository, create one?`,
                name: "createGitRepo",
                type: "confirm",
            }
        ]);

        if (response.createGitRepo) {
            repository = await git.Repository.init(projectPath, 0);
            repository.createCommitOnHead([], repository.defaultSignature(), repository.defaultSignature(), "Task: Create repoistory");
        } else {
            return;
        }
    }

    let remote: git.Remote;
    try {
        remote = await repository.getRemote("origin");
    } catch {
        let response = await inquirer.prompt<{createRemoteOrigin: boolean; remoteOriginName: string}>([
            {
                default: true,
                message: `There is no remote origin in this repository, create one?`,
                name: "createRemoteOrigin",
                type: "confirm",
            },
            {
                message: "Remote origin url",
                name: "remoteOriginName",
                type: "input",
                when: (x) => x.createRemoteOrigin
            }
        ]);

        if (response.createRemoteOrigin) {
            remote = git.Remote.create(repository, "origin", response.remoteOriginName);
        } else {
            return;
        }
    }

    let docsBranch: git.Reference;
    try {
        docsBranch = await repository.getBranch("docs");
    } catch {
        let response = await inquirer.prompt<{createDocBranch: boolean}>([
            {
                default: true,
                message: `There is no 'docs' branch, create one?`,
                name: "createDocBranch",
                type: "confirm",
            }
        ]);

        if (response.createDocBranch) {
            docsBranch = await repository.createBranch("docs", await repository.getMasterCommit());
        } else {
            return;
        }
    }

    return {
        docsBranch,
        remote,
        repository,
    };
}