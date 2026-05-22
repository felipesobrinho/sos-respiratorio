import fs from 'fs';
import path from 'path';

console.log("Listing ALL files under /app/applet recursively...");

function listAll(dir: string, depth = 0) {
  if (depth > 4) return;
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          if (!['node_modules', '.git', 'dist'].includes(file)) {
            listAll(fullPath, depth + 1);
          }
        } else {
          console.log(`File: ${fullPath} (${(stat.size / 1024).toFixed(1)} KB)`);
        }
      } catch (e) {}
    }
  } catch (e) {}
}

listAll('/app/applet');
console.log("End of list.");
