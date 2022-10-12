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
