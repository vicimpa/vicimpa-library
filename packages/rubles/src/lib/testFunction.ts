export type TTestItem<T extends (...args: []) => any> = [
  arguments: Parameters<T>,
  result?: any
];

export const testFunction = async <T extends (...args: any[]) => any>(func: T, tests: TTestItem<T>[], showTest = true) => {

  {
    const runs: [string, string, string][] = await Promise.all(
      tests.map(async ([args, result], i) => {
        const output = await Promise.resolve()
          .then(() => JSON.stringify(func(...args)))
          .catch((e) => `${e}`);

        return [
          result !== undefined && showTest ? (
            output === JSON.stringify(result) ? 'Passed' : 'Fail'
          ) : '',
          `${func.name}(${args.map(e => JSON.stringify(e)).join(', ')})`,
          `// ${output}`
        ] as [string, string, string];
      }));

    const maxs = [0, 0, 0].map((max, i) => {
      for (const r of runs) {
        if (r[i].length > max)
          max = r[i].length;
      }
      return max;
    });
    console.log('=> Run test', func.name + '()');
    console.log(
      runs.map((run, i) => {
        return `${(
          run.map((row, i) => {
            return row + (' '.repeat(maxs[i] - row.length));
          }).filter(e => e).join('\t')
        )}`;
      }).join('\n')
    );
  }
  console.log(' ');
};