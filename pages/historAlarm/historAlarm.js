import { $stopWuxRefresher } from '../../dist/wux/dist/index'

const app = getApp();

Page({
  data: {
    items: [{
      type: 'radio',
      label: '全部',
      value: 'updated',
      children: [   
      ],
      groups: ['001'],
    },
      {
        type: 'filter',
        label: '故障级别',
        value: 'filter',
        children: [{
          type: 'radio',
          label: '故障级别',
          value: 'language',
          children: [{
            label: '全部',
            value: 'javascript',
          },
          {
            label: '轻微',
            value: 'html',
          },
          {
            label: '一般',
            value: 'css',
          },
            {
              label: '严重',
              value: 'css',
            },
          ],
        }
        ],
        groups: ['004', '005', '006'],
      },
      {
        type: 'filter',
        label: '处理状态',
        value: 'filter',
        children: [{
          type: 'radio',
          label: '处理状态',
          value: 'language',
          children: [{
            label: '全部',
            value: 'javascript',
          },
          {
            label: '已处理',
            value: 'html',
          },
          {
            label: '未处理',
            value: 'css',
          },
          
          ],
        }
        ],
        groups: ['001', '002', '003'],
      },
      {
        type: 'filter',
        label: '装置单元',
        value: 'filter',
        children: [{
          type: 'radio',
          label: '装置单元',
          value: 'language',
          children: [{
            label: '全部',
            value: 'javascript',
          },
          {
            label: '常减压',
            value: 'html',
          },
          {
            label: '催化裂化',
            value: 'css',
          },
          {
            label: '延迟焦化',
            value: 'typescript',
          },
          {
            label: '蜡油加氢',
            value: 'test1',
          },
          {
            label: '渣油加氢',
            value: 'test2',
          },
          {
            label: '柴油加氢',
            value: 'test3',
          },
          {
            label: '煤油加氢',
            value: 'test4',
          },
          {
            label: '连续重置',
            value: 'test5',
          },
          {
            label: '汽油加氢',
            value: 'test6',
          },
          ],
        }
        ],
        groups: ['001', '002', '003'],
      },
    {
      type: 'filter',
      label: '设备名称',
      value: 'filter',
      children: [{
        type: 'radio',
        label: '装置单元',
        value: 'language',
        children: [{
          label: '全部',
          value: 'javascript',
        },
        {
          label: '常减压',
          value: 'html',
        },
        {
          label: '催化裂化',
          value: 'css',
        },
        {
          label: '延迟焦化',
          value: 'typescript',
        },
          {
            label: '蜡油加氢',
            value: 'test1',
          },
          {
            label: '渣油加氢',
            value: 'test2',
          },
          {
            label: '柴油加氢',
            value: 'test3',
          },
          {
            label: '煤油加氢',
            value: 'test4',
          },
          {
            label: '连续重置',
            value: 'test5',
          },
          {
            label: '汽油加氢',
            value: 'test6',
          },
        ],
      }
      ],
      groups: ['001', '002', '003'],
    },
    ],
  },
  onLoad() {
    this.getRepos()
  },
  onPulling() {
    console.log('onPulling')
  },
  onRefresh() {
    console.log('onRefresh')
    setTimeout(() => {
      // this.setData({
      //   items: [{
      //     title: new Date,
      //     content: '星球地球++',
      //   }, ...this.data.items],
      // })

      $stopWuxRefresher()
    }, 2000)
  },
  onChange(e) {
    const { checkedItems, items } = e.detail
    const params = {}

    console.log(checkedItems, items)

    checkedItems.forEach((n) => {
      if (n.checked) {
        if (n.value === 'updated') {
          const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
          params.sort = n.value
          params.order = selected
        } else if (n.value === 'stars') {
          params.sort = n.value
          params.order = n.sort === 1 ? 'asc' : 'desc'
        } else if (n.value === 'forks') {
          params.sort = n.value
        } else if (n.value === 'filter') {
          n.children.filter((n) => n.selected).forEach((n) => {
            if (n.value === 'language') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.language = selected
            } else if (n.value === 'query') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.query = selected
            }
          })
        }
      }
    })

    this.getRepos(params)
  },
  getRepos(params = {}) {
    const language = params.language || 'javascript'
    const query = params.query || 'react'
    const q = `${query}+language:${language}`
    const data = Object.assign({
      q,
    }, params)

    wx.showLoading()
    var res = { "data": { "total_count": 250177, "incomplete_results": false, "items": [{ "id": 19872456, "node_id": "MDEwOlJlcG9zaXRvcnkxOTg3MjQ1Ng==", "name": "故障设备2314-P209B", "full_name": "[设备故障]", "private": false, "owner": { "login": "ReactTraining", "id": 11823761, "node_id": "MDEyOk9yZ2FuaXphdGlvbjExODIzNzYx", "avatar_url": "https://avatars1.githubusercontent.com/u/11823761?v=4", "gravatar_id": "", "url": "https://api.github.com/users/ReactTraining", "html_url": "https://github.com/ReactTraining", "followers_url": "https://api.github.com/users/ReactTraining/followers", "following_url": "https://api.github.com/users/ReactTraining/following{/other_user}", "gists_url": "https://api.github.com/users/ReactTraining/gists{/gist_id}", "starred_url": "https://api.github.com/users/ReactTraining/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/ReactTraining/subscriptions", "organizations_url": "https://api.github.com/users/ReactTraining/orgs", "repos_url": "https://api.github.com/users/ReactTraining/repos", "events_url": "https://api.github.com/users/ReactTraining/events{/privacy}", "received_events_url": "https://api.github.com/users/ReactTraining/received_events", "type": "Organization", "site_admin": false }, "html_url": "https://github.com/ReactTraining/react-router", "description": "[设备故障]", "fork": false, "url": "https://api.github.com/repos/ReactTraining/react-router", "forks_url": "https://api.github.com/repos/ReactTraining/react-router/forks", "keys_url": "https://api.github.com/repos/ReactTraining/react-router/keys{/key_id}", "collaborators_url": "https://api.github.com/repos/ReactTraining/react-router/collaborators{/collaborator}", "teams_url": "https://api.github.com/repos/ReactTraining/react-router/teams", "hooks_url": "https://api.github.com/repos/ReactTraining/react-router/hooks", "issue_events_url": "https://api.github.com/repos/ReactTraining/react-router/issues/events{/number}", "events_url": "https://api.github.com/repos/ReactTraining/react-router/events", "assignees_url": "https://api.github.com/repos/ReactTraining/react-router/assignees{/user}", "branches_url": "https://api.github.com/repos/ReactTraining/react-router/branches{/branch}", "tags_url": "https://api.github.com/repos/ReactTraining/react-router/tags", "blobs_url": "https://api.github.com/repos/ReactTraining/react-router/git/blobs{/sha}", "git_tags_url": "https://api.github.com/repos/ReactTraining/react-router/git/tags{/sha}", "git_refs_url": "https://api.github.com/repos/ReactTraining/react-router/git/refs{/sha}", "trees_url": "https://api.github.com/repos/ReactTraining/react-router/git/trees{/sha}", "statuses_url": "https://api.github.com/repos/ReactTraining/react-router/statuses/{sha}", "languages_url": "https://api.github.com/repos/ReactTraining/react-router/languages", "stargazers_url": "https://api.github.com/repos/ReactTraining/react-router/stargazers", "contributors_url": "https://api.github.com/repos/ReactTraining/react-router/contributors", "subscribers_url": "https://api.github.com/repos/ReactTraining/react-router/subscribers", "subscription_url": "https://api.github.com/repos/ReactTraining/react-router/subscription", "commits_url": "https://api.github.com/repos/ReactTraining/react-router/commits{/sha}", "git_commits_url": "https://api.github.com/repos/ReactTraining/react-router/git/commits{/sha}", "comments_url": "https://api.github.com/repos/ReactTraining/react-router/comments{/number}", "issue_comment_url": "https://api.github.com/repos/ReactTraining/react-router/issues/comments{/number}", "contents_url": "https://api.github.com/repos/ReactTraining/react-router/contents/{+path}", "compare_url": "https://api.github.com/repos/ReactTraining/react-router/compare/{base}...{head}", "merges_url": "https://api.github.com/repos/ReactTraining/react-router/merges", "archive_url": "https://api.github.com/repos/ReactTraining/react-router/{archive_format}{/ref}", "downloads_url": "https://api.github.com/repos/ReactTraining/react-router/downloads", "issues_url": "https://api.github.com/repos/ReactTraining/react-router/issues{/number}", "pulls_url": "https://api.github.com/repos/ReactTraining/react-router/pulls{/number}", "milestones_url": "https://api.github.com/repos/ReactTraining/react-router/milestones{/number}", "notifications_url": "https://api.github.com/repos/ReactTraining/react-router/notifications{?since,all,participating}", "labels_url": "https://api.github.com/repos/ReactTraining/react-router/labels{/name}", "releases_url": "https://api.github.com/repos/ReactTraining/react-router/releases{/id}", "deployments_url": "https://api.github.com/repos/ReactTraining/react-router/deployments", "created_at": "2014-05-16T22:22:51Z", "updated_at": "2018-11-14T03:35:27Z", "pushed_at": "2018-11-13T21:11:51Z", "git_url": "git://github.com/ReactTraining/react-router.git", "ssh_url": "git@github.com:ReactTraining/react-router.git", "clone_url": "https://github.com/ReactTraining/react-router.git", "svn_url": "https://github.com/ReactTraining/react-router", "homepage": "https://reacttraining.com/react-router/", "size": 12309, "stargazers_count": 33456, "watchers_count": 33456, "language": "JavaScript", "has_issues": true, "has_projects": false, "has_downloads": true, "has_wiki": false, "has_pages": false, "forks_count": 7009, "mirror_url": null, "archived": false, "open_issues_count": 60, "license": { "key": "mit", "name": "MIT License", "spdx_id": "MIT", "url": "https://api.github.com/licenses/mit", "node_id": "MDc6TGljZW5zZTEz" }, "forks": 7009, "open_issues": 60, "watchers": 33456, "default_branch": "master", "score": 80.64836 }, { "id": 70107786, "node_id": "MDEwOlJlcG9zaXRvcnk3MDEwNzc4Ng==", "name": "故障设备2314-P209B", "full_name": "故障设备", "private": false, "owner": { "login": "zeit", "id": 14985020, "node_id": "MDEyOk9yZ2FuaXphdGlvbjE0OTg1MDIw", "avatar_url": "https://avatars0.githubusercontent.com/u/14985020?v=4", "gravatar_id": "", "url": "https://api.github.com/users/zeit", "html_url": "https://github.com/zeit", "followers_url": "https://api.github.com/users/zeit/followers", "following_url": "https://api.github.com/users/zeit/following{/other_user}", "gists_url": "https://api.github.com/users/zeit/gists{/gist_id}", "starred_url": "https://api.github.com/users/zeit/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/zeit/subscriptions", "organizations_url": "https://api.github.com/users/zeit/orgs", "repos_url": "https://api.github.com/users/zeit/repos", "events_url": "https://api.github.com/users/zeit/events{/privacy}", "received_events_url": "https://api.github.com/users/zeit/received_events", "type": "Organization", "site_admin": false }, "html_url": "https://github.com/zeit/next.js", "description": "[设备故障]", "fork": false, "url": "https://api.github.com/repos/zeit/next.js", "forks_url": "https://api.github.com/repos/zeit/next.js/forks", "keys_url": "https://api.github.com/repos/zeit/next.js/keys{/key_id}", "collaborators_url": "https://api.github.com/repos/zeit/next.js/collaborators{/collaborator}", "teams_url": "https://api.github.com/repos/zeit/next.js/teams", "hooks_url": "https://api.github.com/repos/zeit/next.js/hooks", "issue_events_url": "https://api.github.com/repos/zeit/next.js/issues/events{/number}", "events_url": "https://api.github.com/repos/zeit/next.js/events", "assignees_url": "https://api.github.com/repos/zeit/next.js/assignees{/user}", "branches_url": "https://api.github.com/repos/zeit/next.js/branches{/branch}", "tags_url": "https://api.github.com/repos/zeit/next.js/tags", "blobs_url": "https://api.github.com/repos/zeit/next.js/git/blobs{/sha}", "git_tags_url": "https://api.github.com/repos/zeit/next.js/git/tags{/sha}", "git_refs_url": "https://api.github.com/repos/zeit/next.js/git/refs{/sha}", "trees_url": "https://api.github.com/repos/zeit/next.js/git/trees{/sha}", "statuses_url": "https://api.github.com/repos/zeit/next.js/statuses/{sha}", "languages_url": "https://api.github.com/repos/zeit/next.js/languages", "stargazers_url": "https://api.github.com/repos/zeit/next.js/stargazers", "contributors_url": "https://api.github.com/repos/zeit/next.js/contributors", "subscribers_url": "https://api.github.com/repos/zeit/next.js/subscribers", "subscription_url": "https://api.github.com/repos/zeit/next.js/subscription", "commits_url": "https://api.github.com/repos/zeit/next.js/commits{/sha}", "git_commits_url": "https://api.github.com/repos/zeit/next.js/git/commits{/sha}", "comments_url": "https://api.github.com/repos/zeit/next.js/comments{/number}", "issue_comment_url": "https://api.github.com/repos/zeit/next.js/issues/comments{/number}", "contents_url": "https://api.github.com/repos/zeit/next.js/contents/{+path}", "compare_url": "https://api.github.com/repos/zeit/next.js/compare/{base}...{head}", "merges_url": "https://api.github.com/repos/zeit/next.js/merges", "archive_url": "https://api.github.com/repos/zeit/next.js/{archive_format}{/ref}", "downloads_url": "https://api.github.com/repos/zeit/next.js/downloads", "issues_url": "https://api.github.com/repos/zeit/next.js/issues{/number}", "pulls_url": "https://api.github.com/repos/zeit/next.js/pulls{/number}", "milestones_url": "https://api.github.com/repos/zeit/next.js/milestones{/number}", "notifications_url": "https://api.github.com/repos/zeit/next.js/notifications{?since,all,participating}", "labels_url": "https://api.github.com/repos/zeit/next.js/labels{/name}", "releases_url": "https://api.github.com/repos/zeit/next.js/releases{/id}", "deployments_url": "https://api.github.com/repos/zeit/next.js/deployments", "created_at": "2016-10-05T23:32:51Z", "updated_at": "2018-11-14T05:49:46Z", "pushed_at": "2018-11-14T03:30:24Z", "git_url": "git://github.com/zeit/next.js.git", "ssh_url": "git@github.com:zeit/next.js.git", "clone_url": "https://github.com/zeit/next.js.git", "svn_url": "https://github.com/zeit/next.js", "homepage": "https://nextjs.org", "size": 8023, "stargazers_count": 31405, "watchers_count": 31405, "language": "JavaScript", "has_issues": true, "has_projects": false, "has_downloads": true, "has_wiki": true, "has_pages": false, "forks_count": 3316, "mirror_url": null, "archived": false, "open_issues_count": 332, "license": null, "forks": 3316, "open_issues": 332, "watchers": 31405, "default_branch": "canary", "score": 76.315315 }, { "id": 38003903, "node_id": "MDEwOlJlcG9zaXRvcnkzODAwMzkwMw==", "name": "故障设备2314-P209B", "full_name": "故障设备2", "private": false, "owner": { "login": "davezuko", "id": 6439050, "node_id": "MDQ6VXNlcjY0MzkwNTA=", "avatar_url": "https://avatars3.githubusercontent.com/u/6439050?v=4", "gravatar_id": "", "url": "https://api.github.com/users/davezuko", "html_url": "https://github.com/davezuko", "followers_url": "https://api.github.com/users/davezuko/followers", "following_url": "https://api.github.com/users/davezuko/following{/other_user}", "gists_url": "https://api.github.com/users/davezuko/gists{/gist_id}", "starred_url": "https://api.github.com/users/davezuko/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/davezuko/subscriptions", "organizations_url": "https://api.github.com/users/davezuko/orgs", "repos_url": "https://api.github.com/users/davezuko/repos", "events_url": "https://api.github.com/users/davezuko/events{/privacy}", "received_events_url": "https://api.github.com/users/davezuko/received_events", "type": "User", "site_admin": false }, "html_url": "https://github.com/davezuko/react-redux-starter-kit", "description": "[设备故障].", "fork": false, "url": "https://api.github.com/repos/davezuko/react-redux-starter-kit", "forks_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/forks", "keys_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/keys{/key_id}", "collaborators_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/collaborators{/collaborator}", "teams_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/teams", "hooks_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/hooks", "issue_events_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/issues/events{/number}", "events_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/events", "assignees_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/assignees{/user}", "branches_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/branches{/branch}", "tags_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/tags", "blobs_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/git/blobs{/sha}", "git_tags_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/git/tags{/sha}", "git_refs_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/git/refs{/sha}", "trees_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/git/trees{/sha}", "statuses_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/statuses/{sha}", "languages_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/languages", "stargazers_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/stargazers", "contributors_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/contributors", "subscribers_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/subscribers", "subscription_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/subscription", "commits_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/commits{/sha}", "git_commits_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/git/commits{/sha}", "comments_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/comments{/number}", "issue_comment_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/issues/comments{/number}", "contents_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/contents/{+path}", "compare_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/compare/{base}...{head}", "merges_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/merges", "archive_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/{archive_format}{/ref}", "downloads_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/downloads", "issues_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/issues{/number}", "pulls_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/pulls{/number}", "milestones_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/milestones{/number}", "notifications_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/notifications{?since,all,participating}", "labels_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/labels{/name}", "releases_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/releases{/id}", "deployments_url": "https://api.github.com/repos/davezuko/react-redux-starter-kit/deployments", "created_at": "2015-06-24T18:38:28Z", "updated_at": "2018-11-14T01:55:37Z", "pushed_at": "2018-06-03T17:30:08Z", "git_url": "git://github.com/davezuko/react-redux-starter-kit.git", "ssh_url": "git@github.com:davezuko/react-redux-starter-kit.git", "clone_url": "https://github.com/davezuko/react-redux-starter-kit.git", "svn_url": "https://github.com/davezuko/react-redux-starter-kit", "homepage": "", "size": 1190, "stargazers_count": 10392, "watchers_count": 10392, "language": "JavaScript", "has_issues": true, "has_projects": true, "has_downloads": true, "has_wiki": true, "has_pages": false, "forks_count": 2401, "mirror_url": null, "archived": true, "open_issues_count": 130, "license": { "key": "mit", "name": "MIT License", "spdx_id": "MIT", "url": "https://api.github.com/licenses/mit", "node_id": "MDc6TGljZW5zZTEz" }, "forks": 2401, "open_issues": 130, "watchers": 10392, "default_branch": "master", "score": 73.7872 }, { "id": 45273566, "node_id": "MDEwOlJlcG9zaXRvcnk0NTI3MzU2Ng==", "name": "故障设备2314-P209B", "full_name": "故障设备2314", "private": false, "owner": { "login": "wesbos", "id": 176013, "node_id": "MDQ6VXNlcjE3NjAxMw==", "avatar_url": "https://avatars2.githubusercontent.com/u/176013?v=4", "gravatar_id": "", "url": "https://api.github.com/users/wesbos", "html_url": "https://github.com/wesbos", "followers_url": "https://api.github.com/users/wesbos/followers", "following_url": "https://api.github.com/users/wesbos/following{/other_user}", "gists_url": "https://api.github.com/users/wesbos/gists{/gist_id}", "starred_url": "https://api.github.com/users/wesbos/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/wesbos/subscriptions", "organizations_url": "https://api.github.com/users/wesbos/orgs", "repos_url": "https://api.github.com/users/wesbos/repos", "events_url": "https://api.github.com/users/wesbos/events{/privacy}", "received_events_url": "https://api.github.com/users/wesbos/received_events", "type": "User", "site_admin": false }, "html_url": "https://github.com/wesbos/React-For-Beginners-Starter-Files", "description": "[设备故障]", "fork": false, "url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files", "forks_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/forks", "keys_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/keys{/key_id}", "collaborators_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/collaborators{/collaborator}", "teams_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/teams", "hooks_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/hooks", "issue_events_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/issues/events{/number}", "events_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/events", "assignees_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/assignees{/user}", "branches_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/branches{/branch}", "tags_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/tags", "blobs_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/git/blobs{/sha}", "git_tags_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/git/tags{/sha}", "git_refs_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/git/refs{/sha}", "trees_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/git/trees{/sha}", "statuses_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/statuses/{sha}", "languages_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/languages", "stargazers_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/stargazers", "contributors_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/contributors", "subscribers_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/subscribers", "subscription_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/subscription", "commits_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/commits{/sha}", "git_commits_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/git/commits{/sha}", "comments_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/comments{/number}", "issue_comment_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/issues/comments{/number}", "contents_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/contents/{+path}", "compare_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/compare/{base}...{head}", "merges_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/merges", "archive_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/{archive_format}{/ref}", "downloads_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/downloads", "issues_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/issues{/number}", "pulls_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/pulls{/number}", "milestones_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/milestones{/number}", "notifications_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/notifications{?since,all,participating}", "labels_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/labels{/name}", "releases_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/releases{/id}", "deployments_url": "https://api.github.com/repos/wesbos/React-For-Beginners-Starter-Files/deployments", "created_at": "2015-10-30T19:55:52Z", "updated_at": "2018-11-13T20:12:16Z", "pushed_at": "2018-11-04T13:56:27Z", "git_url": "git://github.com/wesbos/React-For-Beginners-Starter-Files.git", "ssh_url": "git@github.com:wesbos/React-For-Beginners-Starter-Files.git", "clone_url": "https://github.com/wesbos/React-For-Beginners-Starter-Files.git", "svn_url": "https://github.com/wesbos/React-For-Beginners-Starter-Files", "homepage": " https://ReactForBeginners.com", "size": 760, "stargazers_count": 2023, "watchers_count": 2023, "language": "JavaScript", "has_issues": false, "has_projects": true, "has_downloads": true, "has_wiki": true, "has_pages": false, "forks_count": 1692, "mirror_url": null, "archived": false, "open_issues_count": 13, "license": null, "forks": 1692, "open_issues": 13, "watchers": 2023, "default_branch": "master", "score": 68.12967 }, { "id": 29028775, "node_id": "MDEwOlJlcG9zaXRvcnkyOTAyODc3NQ==", "name": "react-native", "full_name": "facebook/react-native", "private": false, "owner": { "login": "facebook", "id": 69631, "node_id": "MDEyOk9yZ2FuaXphdGlvbjY5NjMx", "avatar_url": "https://avatars3.githubusercontent.com/u/69631?v=4", "gravatar_id": "", "url": "https://api.github.com/users/facebook", "html_url": "https://github.com/facebook", "followers_url": "https://api.github.com/users/facebook/followers", "following_url": "https://api.github.com/users/facebook/following{/other_user}", "gists_url": "https://api.github.com/users/facebook/gists{/gist_id}", "starred_url": "https://api.github.com/users/facebook/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/facebook/subscriptions", "organizations_url": "https://api.github.com/users/facebook/orgs", "repos_url": "https://api.github.com/users/facebook/repos", "events_url": "https://api.github.com/users/facebook/events{/privacy}", "received_events_url": "https://api.github.com/users/facebook/received_events", "type": "Organization", "site_admin": false }, "html_url": "https://github.com/facebook/react-native", "description": "A framework for building native apps with React.", "fork": false, "url": "https://api.github.com/repos/facebook/react-native", "forks_url": "https://api.github.com/repos/facebook/react-native/forks", "keys_url": "https://api.github.com/repos/facebook/react-native/keys{/key_id}", "collaborators_url": "https://api.github.com/repos/facebook/react-native/collaborators{/collaborator}", "teams_url": "https://api.github.com/repos/facebook/react-native/teams", "hooks_url": "https://api.github.com/repos/facebook/react-native/hooks", "issue_events_url": "https://api.github.com/repos/facebook/react-native/issues/events{/number}", "events_url": "https://api.github.com/repos/facebook/react-native/events", "assignees_url": "https://api.github.com/repos/facebook/react-native/assignees{/user}", "branches_url": "https://api.github.com/repos/facebook/react-native/branches{/branch}", "tags_url": "https://api.github.com/repos/facebook/react-native/tags", "blobs_url": "https://api.github.com/repos/facebook/react-native/git/blobs{/sha}", "git_tags_url": "https://api.github.com/repos/facebook/react-native/git/tags{/sha}", "git_refs_url": "https://api.github.com/repos/facebook/react-native/git/refs{/sha}", "trees_url": "https://api.github.com/repos/facebook/react-native/git/trees{/sha}", "statuses_url": "https://api.github.com/repos/facebook/react-native/statuses/{sha}", "languages_url": "https://api.github.com/repos/facebook/react-native/languages", "stargazers_url": "https://api.github.com/repos/facebook/react-native/stargazers", "contributors_url": "https://api.github.com/repos/facebook/react-native/contributors", "subscribers_url": "https://api.github.com/repos/facebook/react-native/subscribers", "subscription_url": "https://api.github.com/repos/facebook/react-native/subscription", "commits_url": "https://api.github.com/repos/facebook/react-native/commits{/sha}", "git_commits_url": "https://api.github.com/repos/facebook/react-native/git/commits{/sha}", "comments_url": "https://api.github.com/repos/facebook/react-native/comments{/number}", "issue_comment_url": "https://api.github.com/repos/facebook/react-native/issues/comments{/number}", "contents_url": "https://api.github.com/repos/facebook/react-native/contents/{+path}", "compare_url": "https://api.github.com/repos/facebook/react-native/compare/{base}...{head}", "merges_url": "https://api.github.com/repos/facebook/react-native/merges", "archive_url": "https://api.github.com/repos/facebook/react-native/{archive_format}{/ref}", "downloads_url": "https://api.github.com/repos/facebook/react-native/downloads", "issues_url": "https://api.github.com/repos/facebook/react-native/issues{/number}", "pulls_url": "https://api.github.com/repos/facebook/react-native/pulls{/number}", "milestones_url": "https://api.github.com/repos/facebook/react-native/milestones{/number}", "notifications_url": "https://api.github.com/repos/facebook/react-native/notifications{?since,all,participating}", "labels_url": "https://api.github.com/repos/facebook/react-native/labels{/name}", "releases_url": "https://api.github.com/repos/facebook/react-native/releases{/id}", "deployments_url": "https://api.github.com/repos/facebook/react-native/deployments", "created_at": "2015-01-09T18:10:16Z", "updated_at": "2018-11-14T05:50:54Z", "pushed_at": "2018-11-14T04:11:55Z", "git_url": "git://github.com/facebook/react-native.git", "ssh_url": "git@github.com:facebook/react-native.git", "clone_url": "https://github.com/facebook/react-native.git", "svn_url": "https://github.com/facebook/react-native", "homepage": "https://facebook.github.io/react-native/", "size": 277719, "stargazers_count": 70900, "watchers_count": 70900, "language": "JavaScript", "has_issues": true, "has_projects": true, "has_downloads": true, "has_wiki": true, "has_pages": true, "forks_count": 15873, "mirror_url": null, "archived": false, "open_issues_count": 963, "license": { "key": "other", "name": "Other", "spdx_id": "NOASSERTION", "url": null, "node_id": "MDc6TGljZW5zZTA=" }, "forks": 15873, "open_issues": 963, "watchers": 70900, "default_branch": "master", "score": 65.938385 },{ "id": 34268496, "node_id": "MDEwOlJlcG9zaXRvcnkzNDI2ODQ5Ng==", "name": "react-native-swiper", "full_name": "leecade/react-native-swiper", "private": false, "owner": { "login": "leecade", "id": 533360, "node_id": "MDQ6VXNlcjUzMzM2MA==", "avatar_url": "https://avatars1.githubusercontent.com/u/533360?v=4", "gravatar_id": "", "url": "https://api.github.com/users/leecade", "html_url": "https://github.com/leecade", "followers_url": "https://api.github.com/users/leecade/followers", "following_url": "https://api.github.com/users/leecade/following{/other_user}", "gists_url": "https://api.github.com/users/leecade/gists{/gist_id}", "starred_url": "https://api.github.com/users/leecade/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/leecade/subscriptions", "organizations_url": "https://api.github.com/users/leecade/orgs", "repos_url": "https://api.github.com/users/leecade/repos", "events_url": "https://api.github.com/users/leecade/events{/privacy}", "received_events_url": "https://api.github.com/users/leecade/received_events", "type": "User", "site_admin": false }, "html_url": "https://github.com/leecade/react-native-swiper", "description": "The best Swiper component for React Native.", "fork": false, "url": "https://api.github.com/repos/leecade/react-native-swiper", "forks_url": "https://api.github.com/repos/leecade/react-native-swiper/forks", "keys_url": "https://api.github.com/repos/leecade/react-native-swiper/keys{/key_id}", "collaborators_url": "https://api.github.com/repos/leecade/react-native-swiper/collaborators{/collaborator}", "teams_url": "https://api.github.com/repos/leecade/react-native-swiper/teams", "hooks_url": "https://api.github.com/repos/leecade/react-native-swiper/hooks", "issue_events_url": "https://api.github.com/repos/leecade/react-native-swiper/issues/events{/number}", "events_url": "https://api.github.com/repos/leecade/react-native-swiper/events", "assignees_url": "https://api.github.com/repos/leecade/react-native-swiper/assignees{/user}", "branches_url": "https://api.github.com/repos/leecade/react-native-swiper/branches{/branch}", "tags_url": "https://api.github.com/repos/leecade/react-native-swiper/tags", "blobs_url": "https://api.github.com/repos/leecade/react-native-swiper/git/blobs{/sha}", "git_tags_url": "https://api.github.com/repos/leecade/react-native-swiper/git/tags{/sha}", "git_refs_url": "https://api.github.com/repos/leecade/react-native-swiper/git/refs{/sha}", "trees_url": "https://api.github.com/repos/leecade/react-native-swiper/git/trees{/sha}", "statuses_url": "https://api.github.com/repos/leecade/react-native-swiper/statuses/{sha}", "languages_url": "https://api.github.com/repos/leecade/react-native-swiper/languages", "stargazers_url": "https://api.github.com/repos/leecade/react-native-swiper/stargazers", "contributors_url": "https://api.github.com/repos/leecade/react-native-swiper/contributors", "subscribers_url": "https://api.github.com/repos/leecade/react-native-swiper/subscribers", "subscription_url": "https://api.github.com/repos/leecade/react-native-swiper/subscription", "commits_url": "https://api.github.com/repos/leecade/react-native-swiper/commits{/sha}", "git_commits_url": "https://api.github.com/repos/leecade/react-native-swiper/git/commits{/sha}", "comments_url": "https://api.github.com/repos/leecade/react-native-swiper/comments{/number}", "issue_comment_url": "https://api.github.com/repos/leecade/react-native-swiper/issues/comments{/number}", "contents_url": "https://api.github.com/repos/leecade/react-native-swiper/contents/{+path}", "compare_url": "https://api.github.com/repos/leecade/react-native-swiper/compare/{base}...{head}", "merges_url": "https://api.github.com/repos/leecade/react-native-swiper/merges", "archive_url": "https://api.github.com/repos/leecade/react-native-swiper/{archive_format}{/ref}", "downloads_url": "https://api.github.com/repos/leecade/react-native-swiper/downloads", "issues_url": "https://api.github.com/repos/leecade/react-native-swiper/issues{/number}", "pulls_url": "https://api.github.com/repos/leecade/react-native-swiper/pulls{/number}", "milestones_url": "https://api.github.com/repos/leecade/react-native-swiper/milestones{/number}", "notifications_url": "https://api.github.com/repos/leecade/react-native-swiper/notifications{?since,all,participating}", "labels_url": "https://api.github.com/repos/leecade/react-native-swiper/labels{/name}", "releases_url": "https://api.github.com/repos/leecade/react-native-swiper/releases{/id}", "deployments_url": "https://api.github.com/repos/leecade/react-native-swiper/deployments", "created_at": "2015-04-20T15:22:55Z", "updated_at": "2018-11-14T04:43:01Z", "pushed_at": "2018-10-27T00:30:56Z", "git_url": "git://github.com/leecade/react-native-swiper.git", "ssh_url": "git@github.com:leecade/react-native-swiper.git", "clone_url": "https://github.com/leecade/react-native-swiper.git", "svn_url": "https://github.com/leecade/react-native-swiper", "homepage": "", "size": 8164, "stargazers_count": 6995, "watchers_count": 6995, "language": "JavaScript", "has_issues": true, "has_projects": true, "has_downloads": true, "has_wiki": true, "has_pages": false, "forks_count": 1571, "mirror_url": null, "archived": false, "open_issues_count": 503, "license": { "key": "mit", "name": "MIT License", "spdx_id": "MIT", "url": "https://api.github.com/licenses/mit", "node_id": "MDc6TGljZW5zZTEz" }, "forks": 1571, "open_issues": 503, "watchers": 6995, "default_branch": "master", "score": 58.81771 }] }, "header": { "Date": "Wed, 14 Nov 2018 06:00:02 GMT", "Content-Type": "application/json; charset=utf-8", "Transfer-Encoding": "chunked", "Server": "GitHub.com", "Status": "200 OK", "X-RateLimit-Limit": "10", "X-RateLimit-Remaining": "9", "X-RateLimit-Reset": "1542175262", "Cache-Control": "no-cache", "X-GitHub-Media-Type": "github.v3; format=json", "Link": "<https://api.github.com/search/repositories?q=react%2Blanguage%3Ajavascript&page=2>; rel=\"next\", <https://api.github.com/search/repositories?q=react%2Blanguage%3Ajavascript&page=34>; rel=\"last\"", "Access-Control-Expose-Headers": "ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type", "Access-Control-Allow-Origin": "*", "Strict-Transport-Security": "max-age=31536000; includeSubdomains; preload", "X-Frame-Options": "deny", "X-Content-Type-Options": "nosniff", "X-XSS-Protection": "1; mode=block", "Referrer-Policy": "origin-when-cross-origin, strict-origin-when-cross-origin", "Content-Security-Policy": "default-src 'none'", "Content-Encoding": "gzip", "Vary": "Accept-Encoding", "X-GitHub-Request-Id": "EFF3:18B1:E08C7B:130673D:5BEBB9E1" }, "statusCode": 200, "errMsg": "request:ok" }
    // wx.request({
      // url: app.globalData.imgUrl,
      // data,
      // success: (res) => {
      //   console.log(res)

        wx.hideLoading()

        this.setData({
          repos: res.data.items.map((n) => Object.assign({}, n, {
            date: n.created_at.substr(0, 10) + "11:11:00",
          })),
        })
      // },
    // })
  },
  onOpen(e) {
    this.setData({
      pageStyle: 'height: 100%; overflow: hidden',
    })
  },
  onClose(e) {
    this.setData({
      pageStyle: '',
    })
  },
})