import { readFileSync, readdir, readdirSync, writeFileSync } from "fs";

import { join } from "path";

const [url, branch] = process.argv.slice(2);
const from = `${url.replace(/^git@github.com\:(.*)\.git$/, "$1")}`;
const base = join(from, 'tree', branch);

const re = /\<!\-\-\s*(start|end)_gen\s*\-\-\>/ig;
const source = readFileSync('./README.md', 'utf-8');

const projects = readdirSync('./packages/')
  .map(file => {
    file = join('./packages', file);
    var {
      name,
      repository = `github:${from}`,
      funding = "https://boosty.to/vic_dev",
      homepage = `https://github.com/${join(base, file)}`,
      description,
      version,
      ...other
    } = JSON.parse(
      readFileSync(join(file, 'package.json'), 'utf-8')
    );


    const json = JSON.stringify(
      {
        name,
        version,
        description,
        repository,
        funding,
        homepage,
        ...other
      },
      null,
      2
    );

    writeFileSync(join(file, 'package.json'), json);

    return {
      file,
      name,
      description
    };
  });

var start = 0, end = 0;

source.replace(re, (find, _, index) => {
  if (!start)
    start = index + find.length;
  else if (!end)
    end = index;
  return find;
});

// console.log(source.slice(start, end), projects);