const fs = require("fs");
const yaml = require("js-yaml");
const helper = require("./helperFunctions");

let config;

try {
  let fileContents = fs.readFileSync("./config.yaml", "utf-8");
  config = yaml.load(fileContents);
  console.log(config.detatched.home.modelPlural);
} catch (e) {
  console.log(e);
}

const generate = (commands) =>
  commands.reduce((code, command) => {
    code += command.func(command.params);
    return code;
  }, "");

const generateHTMLFile = (text) => {
  fs.appendFile("result.html", text, (err) => {
    if (err) throw err;
    console.log("File created!");
  });
};

const commands = [
  { func: helper.workspaceGen, params: { config } },
  { func: helper.packagesGen, params: { config } },
  { func: helper.dependenciesGen, params: { config } },
  { func: helper.libGen, params: { config, suffix: config.suffixes.lib } },
  { func: helper.appDirGen, params: { config, module: "core-state" } },
  {
    func: helper.componentLayerGen,
    params: { config, suffix: config.suffixes.components },
  },
  ,
  {
    func: helper.containerComponenetGen,
    params: {
      entity: config.detatched.home,
      suffix: config.suffixes.components,
    },
  },
  { func: helper.jsonServerGen, params: {} },
  { func: helper.startScriptGen, params: {} },
];

const bodyText = `
<div>
<h2>CLI Ludicrous Mode</h2>
<pre>
<code class="language-bash">${generate(commands)}</code>  
</pre>
</div>

`;
generateHTMLFile(bodyText);
