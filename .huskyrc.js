// masterへのコミットも禁止
// lintで整形後にコミットする
const preventCommitToMaster = `branch=\`git symbolic-ref HEAD\`
npm run lint
git add .
if [ "$branch" = "refs/heads/master" ]; then
    echo "\\033[31mDirect commit to master is not allowed.\\033[0m"
    exit 1
fi`;

// masterへのpushを禁止
const preventPushToMaster = `branch=\`git symbolic-ref HEAD\`
if [ "$branch" = "refs/heads/master" ]; then
    echo "\\033[31mDirect push to master is not allowed.\\033[0m"
    exit 1
fi`;

module.exports = {
  hooks: {
    'pre-commit': preventCommitToMaster,
    'pre-push': preventPushToMaster,
  },
};