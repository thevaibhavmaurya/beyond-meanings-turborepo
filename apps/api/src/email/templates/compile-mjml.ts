import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import * as mjml2html from 'mjml';
import { extname, join } from 'path';

const templatesDir = __dirname;
console.log(`Processing MJML templates in: ${templatesDir}`);

if (!existsSync(templatesDir)) {
  console.error(`Templates directory does not exist: ${templatesDir}`);
  process.exit(1);
}

let mjmlFiles: string[] = [];
try {
  mjmlFiles = readdirSync(templatesDir).filter(
    (file) => extname(file).toLowerCase() === '.mjml',
  );
  console.log(`Found ${mjmlFiles.length} MJML files to process`);
} catch (error) {
  console.error('Unable to read the templates directory:', error);
  process.exit(1);
}

if (mjmlFiles.length === 0) {
  console.warn('No MJML files found to process');
}

mjmlFiles.forEach((filename) => {
  const readPath = join(templatesDir, filename);
  const hbsFilename = filename.replace('.mjml', '.hbs');
  const writePath = join(templatesDir, hbsFilename);

  console.log(`Processing ${filename} -> ${hbsFilename}`);

  let mjmlContent = '';
  try {
    mjmlContent = readFileSync(readPath, 'utf8');
  } catch (error) {
    console.error(`Failed to read ${filename}:`, error);
    return;
  }

  try {
    const result = mjml2html(mjmlContent);

    if (result.errors && result.errors.length > 0) {
      console.warn(`Warnings while processing ${filename}:`, result.errors);
    }

    // Write HTML to HBS file
    writeFileSync(writePath, result.html);
    console.log(`Successfully generated ${hbsFilename}`);
  } catch (error) {
    console.error(`Failed to convert ${filename} to HTML:`, error);
  }
});

console.log('MJML compilation completed');
