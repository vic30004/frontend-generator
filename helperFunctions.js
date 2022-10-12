const workspaceGen = (
  config
) => `npx create-nx-workspace@latest ${config.name} \\
    --appName=${config.application}
    --preset=${config.type}
    --npmScope=${config.scope}
    --nx-cloud=false
    --linter=eslint
    --style=scss && \\
    cd ${config.name}/ && \\\n
`;

const packagesGen = (config) =>
  config.packages.reduce((code, dependency) => {
    return (code += `npm i ${dependency} --force && \\\n`);
  },"");

module.exports = {
  workspaceGen,
  packagesGen,
};
