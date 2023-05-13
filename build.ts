import esbuild from 'esbuild';
import ts from 'typescript';
import chokidar from 'chokidar';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import external from './external.json';
const { log } = console;

function debounce<F extends (...args: any[]) => void>(func: F, wait: number) {
  let timeout: number;
  return function executedFunction(...args: Parameters<F>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait) as any;
  };
};

const time = (date = new Date) => {
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; // the hour '0' should be '12'
  let strTime = `${h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s} ${ampm}`;
  return strTime;
}


const build = async (): Promise<void> => {
  const from = 'app/app.ts';
  const to = 'dist/app.js';

  try {
    const bundle = await esbuild.build({
      entryPoints: [from],
      bundle: true,
      write: false,
      external: [...external as string[]],
      format: 'cjs',
      // other ESBuild options...
    });
    
    const stringCode = bundle.outputFiles[0].text;
    const result = ts.transpileModule(stringCode, { compilerOptions: { module: ts.ModuleKind.CommonJS }});
    
    if (!existsSync('dist')) mkdirSync('dist');
    writeFileSync(to, result.outputText);
    
    log(`\n✅ [${time()}]: Build successful! from: "${from}" to: "${to}" \n`);
  } catch (error: any) {
    log(`\n❌ [${time()}]: Build failed!`)
    if (error?.errors[0]?.location) {
      const { file, line, column } = error.errors[0].location;
      log(`ERROR at [${file}:${line}:${column}]: "${error.errors[0].text}"`);
    } else {
      log('An error occurred during the build:\n\n', error);
    }
  }
}



// Set up Chokidar to watch your source files
const watcher = chokidar.watch('app/**/*', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});



// On change, build the code
const debounceBuild = debounce(build, 300);
['add', 'change', 'unlink', 'ready']
  .forEach(event => watcher.on(event, debounceBuild));
