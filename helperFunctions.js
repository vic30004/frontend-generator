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
  }, "");

const dependenciesGen = (config) =>
  config.dependencies.reduce((code, dependecy) => {
    return (code += `npx nx g ${dependecy}:ng-add --no-interactive && \\\n`);
  }, "");

const appDirGen = (config, module) =>
  config.entities.reduce((code, entity) => {
    return (code += `nx g slice ${entity.modelPlural} \\
    --project ${module} \\
    --directory ${entity.modelPlural} \\
    --no-interactive \\
    --facade && \\\n`);
  }, "");

const libGen = (config, suffix) =>
  config.libs.reduce((code, lib) => {
    return (code += `nx g lib ${lib} ${suffix} && \\\n`);
  }, "");

const angularStateGen = (config, module) =>
  config.entities.reduce((code, entity) => {
    return (code += `nx g @nrwl/angular:ngrx ${entity.modelPlural} \\
    --module=libs/${module}/src/lib/${module}.module.ts \\
    --directory ${entity.modelPlural} \\
    --no-interactive \\
    --facade && \\\n`);
  }, "");

const servicesGen = (config, module) =>
  config.entities.reduce((code, entity) => {
    return (code += `nx g s services/${entity.modelPlural}/${entity.modelPlural} --project=${module} && \\\n`);
  }, "");

const containerComponenetGen = (entity, suffix) =>
  `nx g c ${entity.modelPlural} ${suffix} && \\\n`

module.exports = {
  workspaceGen,
  packagesGen,
  dependenciesGen,
  appDirGen,
  libGen,
  angularStateGen,
  servicesGen,
  containerComponenetGen,
};
