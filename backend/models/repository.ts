import { model, Schema, Types } from "mongoose";

export const DOCUMENT_NAME = "Repository";
export const COLLECTION_NAME = "repositories";

// Commits {
//   sha: 'fbde6734bc535b60986cad1f81dcfcc5df9e4ff2',
//   node_id: 'C_kwDONbmcDNoAKGZiZGU2NzM0YmM1MzViNjA5ODZjYWQxZjgxZGNmY2M1ZGY5ZTRmZjI',
//   commit: {
//     author: {
//       name: 'Anbarasu',
//       email: 'anbarasun123@gmail.com',
//       date: '2024-12-10T13:06:45Z'
//     },
//     committer: {
//       name: 'GitHub',
//       email: 'noreply@github.com',
//       date: '2024-12-10T13:06:45Z'
//     },
//     message: 'Merge pull request #10013 from nocodb/nc-fix-button-sync\n' +
//       '\n' +
//       'fix: metas sync',
//     tree: {
//       sha: '2059a424a31d498795e1b4bab19faf03dcd4b263',
//       url: 'https://api.github.com/repos/sred-organization-test/nocodb/git/trees/2059a424a31d498795e1b4bab19faf03dcd4b263'
//     },
//     url: 'https://api.github.com/repos/sred-organization-test/nocodb/git/commits/fbde6734bc535b60986cad1f81dcfcc5df9e4ff2',
//     comment_count: 0,
//     verification: {
//       verified: true,
//       reason: 'valid',
//       signature: '-----BEGIN PGP SIGNATURE-----\n' +
//         '\n' +
//         'wsFcBAABCAAQBQJnWDzlCRC1aQ7uu5UhlAAAlUAQAIJCkpKAKgyDr4jU+XfX1/DX\n' +
//         'R6d0p0Wcqx8YM18Q9IfNot7DFEeMlQW5BJ/DS2mvSY7ZqNxArT64IqrNVtMDgHKr\n' +
//         'ZKv0JTStxorAz/TOBxf6Xjf8kvUViW9NJt/ZaolbuIUadSJ2ItquEAipoa8mU4HJ\n' +
//         'flbLU1/FKfAdloSjoXopNzAFI5rV1ZxWhhGFdUiN7lhgC5Iq8OZnismMTwsjrU+9\n' +
//         'wRenLUnXrdjx52simbUuzkW2hnAsMLnk74FQgufi35NdxoxIocPwfLCgnaJtnmwj\n' +
//         'pDTIyei5ugixNJ88fqWzfl3224kk+AfDEM6gg0Q6jsem//S0lmYhVCbZnyHHA+7G\n' +
//         'PdrLgM0La5QAwsw14BZwPA2I65rChpYZhZjyuKVQf3ZCZaU2X5Re+OeKLOa/Vt6L\n' +
//         'MfaDlrR9b1/zK7iIULjwUghTf4/aGl5wy/CjRx2kpeK8PKp5MWj7Bn8bAS6owqeM\n' +
//         'aKlPC5HNoWmzNBlaHbcBtvrrlkgdVwJyzZhqD6lcCoXAHjj0ytEpQwZjODIObWBs\n' +
//         '/GZnWnjgMfX9mPdjoRDBScn0y+VXTo9O3f26Vx7eFLpZ//ETqfj5udMjdvwE0559\n' +
//         'fzYL6Jz2XegLUFVlkbSUuXM9kyBjwOioD24uFDGvHTX+7U8g7+x0zHB9x0xgcIGx\n' +
//         'GAPzrvH8zmNAFQMD+U5a\n' +
//         '=bd87\n' +
//         '-----END PGP SIGNATURE-----\n',
//       payload: 'tree 2059a424a31d498795e1b4bab19faf03dcd4b263\n' +
//         'parent 2f165bbe8924cb03bce3c4eb1b8985d750ef9e3b\n' +
//         'parent 5e64c5f0ee0d15e8b42e3c69aedc33feb7305cfc\n' +
//         'author Anbarasu <anbarasun123@gmail.com> 1733836005 +0530\n' +
//         'committer GitHub <noreply@github.com> 1733836005 +0530\n' +
//         '\n' +
//         'Merge pull request #10013 from nocodb/nc-fix-button-sync\n' +
//         '\n' +
//         'fix: metas sync ',
//       verified_at: '2024-12-10T13:06:50Z'
//     }
//   },
//   url: 'https://api.github.com/repos/sred-organization-test/nocodb/commits/fbde6734bc535b60986cad1f81dcfcc5df9e4ff2',
//   html_url: 'https://github.com/sred-organization-test/nocodb/commit/fbde6734bc535b60986cad1f81dcfcc5df9e4ff2',
//   comments_url: 'https://api.github.com/repos/sred-organization-test/nocodb/commits/fbde6734bc535b60986cad1f81dcfcc5df9e4ff2/comments',
//   author: {
//     login: 'DarkPhoenix2704',
//     id: 64391274,
//     node_id: 'MDQ6VXNlcjY0MzkxMjc0',
//     avatar_url: 'https://avatars.githubusercontent.com/u/64391274?v=4',
//     gravatar_id: '',
//     url: 'https://api.github.com/users/DarkPhoenix2704',
//     html_url: 'https://github.com/DarkPhoenix2704',
//     followers_url: 'https://api.github.com/users/DarkPhoenix2704/followers',
//     following_url: 'https://api.github.com/users/DarkPhoenix2704/following{/other_user}',
//     gists_url: 'https://api.github.com/users/DarkPhoenix2704/gists{/gist_id}',
//     starred_url: 'https://api.github.com/users/DarkPhoenix2704/starred{/owner}{/repo}',
//     subscriptions_url: 'https://api.github.com/users/DarkPhoenix2704/subscriptions',
//     organizations_url: 'https://api.github.com/users/DarkPhoenix2704/orgs',
//     repos_url: 'https://api.github.com/users/DarkPhoenix2704/repos',
//     events_url: 'https://api.github.com/users/DarkPhoenix2704/events{/privacy}',
//     received_events_url: 'https://api.github.com/users/DarkPhoenix2704/received_events',
//     type: 'User',
//     user_view_type: 'public',
//     site_admin: false
//   },
//   committer: {
//     login: 'web-flow',
//     id: 19864447,
//     node_id: 'MDQ6VXNlcjE5ODY0NDQ3',
//     avatar_url: 'https://avatars.githubusercontent.com/u/19864447?v=4',
//     gravatar_id: '',
//     url: 'https://api.github.com/users/web-flow',
//     html_url: 'https://github.com/web-flow',
//     followers_url: 'https://api.github.com/users/web-flow/followers',
//     following_url: 'https://api.github.com/users/web-flow/following{/other_user}',
//     gists_url: 'https://api.github.com/users/web-flow/gists{/gist_id}',
//     starred_url: 'https://api.github.com/users/web-flow/starred{/owner}{/repo}',
//     subscriptions_url: 'https://api.github.com/users/web-flow/subscriptions',
//     organizations_url: 'https://api.github.com/users/web-flow/orgs',
//     repos_url: 'https://api.github.com/users/web-flow/repos',
//     events_url: 'https://api.github.com/users/web-flow/events{/privacy}',
//     received_events_url: 'https://api.github.com/users/web-flow/received_events',
//     type: 'User',
//     user_view_type: 'public',
//     site_admin: false
//   },
// }

export default interface IRepository {
  _id?: Types.ObjectId;
  id: Number;
  node_id: string;
  name: string;
  full_name: string;
  private: false;
  owner_id: Number;
  owner_login: string;
  description: string;
  url: string;
  user: string;
  default_branch: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IRepository>(
  {
    id: {
      type: Number,
      sparse: true,
    },
    user: {
      type: String,
      required: true,
    },
    node_id: {
      type: Schema.Types.String,
      required: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    private: {
      type: Boolean,
      default: false,
    },
    default_branch: {
      type: String,
      required: false,
    },
    owner_id: {
      type: Number,
      required: false,
    },
    owner_login: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      default: () => Date.now(),
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      default: () => Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

schema.index({ id: 1, owner: 1 }, { unique: true });

export const RepositoryModel = model<IRepository>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
