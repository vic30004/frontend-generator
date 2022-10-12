const helper = require("./helperFunctions");

test("workspaceGen works as expected", () => {
  const config = {
    name: "name",
    type: "type",
    scope: "scope",
    application: "application",
  };

  const res = helper.workspaceGen(config);

  const expected = `npx create-nx-workspace@latest name \\
    --appName=application
    --preset=type
    --npmScope=scope
    --nx-cloud=false
    --linter=eslint
    --style=scss && \\
    cd name/ && \\\n
`;

  expect(res).toBe(expected);
});

test("packages gen works as expected", () => {
  const config = {
    packages: ["package1", "package2"],
  };

  const res = helper.packagesGen(config);

  const expected = `npm i package1 --force && \\\nnpm i package2 --force && \\\n`;

  expect(res).toBe(expected);
});

test("dependencies gen works as expected", () => {
  const config = {
    dependencies: ["dep1", "dep2"],
  };

  const res = helper.dependenciesGen(config);

  const expected = `npx nx g dep1:ng-add --no-interactive && \\\nnpx nx g dep2:ng-add --no-interactive && \\\n`;

  expect(res).toBe(expected);
});

test("app dir gen works as expected", () => {
  const config = {
    entities: [
      {
        model: "model",
        modelPlural: "modelPlural",
      },
    ],
  };
  const module = "module";

  const res = helper.appDirGen(config, module);

  const expected = `nx g slice modelPlural \\
    --project module \\
    --directory modelPlural \\
    --no-interactive \\
    --facade && \\\n`;

  expect(res).toBe(expected);
});

test("lib gen works as expected", () => {
  const config = {
    libs: ["lib1", "lib2"],
  };

  const suffix = "suffix";

  const res = helper.libGen(config, suffix);

  const expected = `nx g lib lib1 suffix && \\\nnx g lib lib2 suffix && \\\n`;

  expect(res).toBe(expected);
});

test("angular state gen works as expected", () => {
  const config = {
    entities: [
      {
        model: "model",
        modelPlural: "modelPlural",
      },
    ],
  };
  const module = "module";

  const res = helper.angularStateGen(config, module);

  const expected = `nx g @nrwl/angular:ngrx modelPlural \\
    --module=libs/module/src/lib/module.module.ts \\
    --directory modelPlural \\
    --no-interactive \\
    --facade && \\\n`;

  expect(res).toBe(expected);
});

test("expect services gen to work as expected", () => {
  const config = {
    entities: [
      {
        model: "model",
        modelPlural: "modelPlural",
      },
    ],
  };
  const module = "module";

  const res = helper.servicesGen(config, module);

  const expected = `nx g s services/modelPlural/modelPlural --project=module && \\\n`;

  expect(res).toBe(expected);
});

test("container gen works as expected", () => {
  const entity = {
    model: "model",
    modelPlural: "modelPlural",
  };
  const suffix = "suffix";

  const res = helper.containerComponenetGen(entity, suffix);

  const expected = `nx g c modelPlural suffix && \\\n`;

  expect(res).toBe(expected);
});
