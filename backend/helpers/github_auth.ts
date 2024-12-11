import { response } from "express";
import config from "../config/config";
import axios from "axios";
import IOrganization, { OrganizationModel } from "../models/organization";
import IRepository, { RepositoryModel } from "../models/repository";
import { AnyBulkWriteOperation } from "mongoose";
import ICommit, { CommitModel } from "../models/commit";
import { IPullRequest } from "../models/pull-request";

export const getGithubAccessToken = async (code: string) => {
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      code: code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return response.data.access_token;
};

export const getGitHubUserData = async (accessToken: string) => {
  const response = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json", // GitHub API versioning
    },
  });

  return response.data;
};

// - organizations
// - organizations/repos
// - organizations/repos/commits
// - organizations/repos/pulls
// - organizations/repos/issues
// - organizations/repos/issues/changelogs
// - organizations/users

export const fetchGitHubData = async (username: string, token: string) => {
  try {
    const organizations = await fetchUserOrganizations(username, token);
    if (organizations) {
      for (const org of organizations) {
        const repos = await fetchOrganizationRepos(org.login, token, username);
        if (repos) {
          for (const repo of repos) {
            await fetchRepoCommits(
              token,
              repo.owner_login,
              repo.name,
              username
            );
            await fetchRepoPullRequest(
              token,
              repo.owner_login,
              repo.name,
              username
            );
          }
        }
      }
    }

    // Fetch Commits, Pull Requests, Issues for each repository
    // for (const repo of repositories) {
    //   const { name: repoName } = repo;

    //   // Fetch 1000 Pull Requests
    //   const pulls = await fetchSinglePage(
    //     `https://api.github.com/repos/${GITHUB_ORG}/${repoName}/pulls`,
    //     1000
    //   );
    //   if (pulls.length > 0) {
    //     await db.collection("pulls").insertMany(pulls);
    //   }

    //   // Fetch 500 Issues
    //   const issues = await fetchSinglePage(
    //     `https://api.github.com/repos/${GITHUB_ORG}/${repoName}/issues`,
    //     500
    //   );
    //   if (issues.length > 0) {
    //     await db.collection("issues").insertMany(issues);
    //   }
    // }

    console.log("Data successfully fetched and populated into MongoDB!");
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
};

const fetchUserOrganizations = async (username: string, token: string) => {
  // const org = await OrganizationModel.find({ user: username })
  //   .sort({
  //     id: 1,
  //   })
  //   .limit(1);

  let orgsUrl = `https://api.github.com/users/${username}/orgs`;

  // if (org.length > 0) {
  //   const lastOrg = org[0];
  //   orgsUrl = orgsUrl + `?since=${lastOrg.id}`;
  // }

  console.log("orgsUrl", orgsUrl);

  const orgsResponse = await axios.get(orgsUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (orgsResponse.status == 200) {
    const organizations: IOrganization[] = orgsResponse.data.map(
      (org: any): IOrganization => ({
        login: org.login,
        id: org.id,
        node_id: org.node_id,
        user: username,
        url: org.url,
        avatar_url: org.avatar_url,
        description: org.description,
      })
    );
    const bulkOperation: AnyBulkWriteOperation<IOrganization>[] =
      organizations.map(
        (org): AnyBulkWriteOperation<IOrganization> => ({
          replaceOne: {
            filter: { id: org.id, user: username },
            replacement: org,
            upsert: true,
            timestamps: true,
          },
        })
      );

    await OrganizationModel.bulkWrite(bulkOperation, { ordered: false });

    return organizations;
  }
};

const fetchOrganizationRepos = async (
  login: string,
  token: string,
  username: string
) => {
  const orgReposResponse = await axios.get(
    `https://api.github.com/orgs/${login}/repos`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );
  if (orgReposResponse.status == 200) {
    const repsitories: IRepository[] = orgReposResponse.data.map(
      (repo: any): IRepository => ({
        id: repo.id,
        node_id: repo.node_id,
        name: repo.name,
        full_name: repo.full_name,
        private: repo.private,
        owner_id: repo.owner.id,
        owner_login: repo.owner.login,
        description: repo.description,
        url: repo.url,
        user: username,
        default_branch: repo.default_branch,
      })
    );

    const bulkOperation: AnyBulkWriteOperation<IRepository>[] = repsitories.map(
      (repo): AnyBulkWriteOperation<IRepository> => ({
        replaceOne: {
          filter: { id: repo.id, owner_id: repo.owner_id },
          replacement: repo,
          upsert: true,
          timestamps: true,
        },
      })
    );

    await RepositoryModel.bulkWrite(bulkOperation, { ordered: false });

    return repsitories;
  }
};

const fetchRepoCommits = async (
  token: string,
  owner: string,
  reponame: string,
  userlogin: string,
  limit: number = 200
) => {
  const url = `https://api.github.com/repos/${owner}/${reponame}/commits?per_page=${limit}`;

  const orgReposResponse = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (orgReposResponse.status == 200) {
    const commits: ICommit[] = orgReposResponse.data.map(
      (commit: any): ICommit => ({
        sha: commit.sha,
        node_id: commit.node_id,
        committer_date: commit.commit.committer.date,
        committer_email: commit.commit.committer.email,
        committer_name: commit.commit.committer.name,
        committer_id: commit.committer.id,
        committer_login: commit.committer.login,
        author_date: commit.commit.author.date,
        author_email: commit.commit.author.email,
        author_name: commit.commit.author.name,
        author_id: commit.author.id,
        author_login: commit.author.login,
        url: commit.url,
        userlogin: userlogin,
        reponame: reponame,
        message: commit.commit.message,
      })
    );

    const bulkOperation: AnyBulkWriteOperation<ICommit>[] = commits.map(
      (commit): AnyBulkWriteOperation<ICommit> => ({
        replaceOne: {
          filter: { sha: commit.sha, reponame: commit.reponame },
          replacement: commit,
          upsert: true,
          timestamps: true,
        },
      })
    );

    await CommitModel.bulkWrite(bulkOperation, { ordered: false });

    return commits;
  }
};

const fetchRepoPullRequest = async (
  token: string,
  owner: string,
  repoName: string,
  userlogin: string,
  limit: number = 200
) => {
  const url = `https://api.github.com/repos/${owner}/${repoName}/pulls?per_page=${limit}`;

  console.log("url", url);

  const orgReposResponse = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (orgReposResponse.status == 200) {
    const pullRequests: IPullRequest[] = orgReposResponse.data.map(
      (pr: any): IPullRequest => ({
        ...pr,
      })
    );

    const bulkOperation: AnyBulkWriteOperation<IPullRequest>[] =
      pullRequests.map(
        (pullRequest): AnyBulkWriteOperation<IPullRequest> => ({
          replaceOne: {
            filter: { id: pullRequest.id, reponame: pullRequest.repo_name },
            replacement: pullRequest,
            upsert: true,
            timestamps: true,
          },
        })
      );

    await CommitModel.bulkWrite(bulkOperation, { ordered: false });

    return pullRequests;
  }
};
