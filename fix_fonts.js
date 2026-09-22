const fs = require('fs');
const path = require('path');

// Files to process
const files = [
  'app/components/ComparisonSection.js',
  'app/components/TestimonialsSection.js',
  'app/components/FounderSection.js',
  'app/components/FAQSection.js',
  'app/components/NewsletterSection.js',
  'app/components/Footer.js',
  'app/components/LoadingScreen.js',
  'app/components/LifestyleSection.js',
  'app/components/DifferentiatorsSection.js',
  'app/components/DoctorsSection.js',
  'app/components/ProductsSection.js',
  'app/components/ReelsSection.js',
  'app/page.js',
];

const replacements = [
  // Font: Anton -> Fira Sans
  ["font-['Anton']", "font-['Fira_Sans'] font-extrabold"],
  // Old orange -> Burnt Orange
  ['#EF5A32', '#FF683F'],
  ['#ef5a32', '#FF683F'],
  ['#F4512A', '#FF683F'],
  ['#f4512a', '#FF683F'],
  // Old black -> Near Black
  ['#111111', '#141414'],
  // Old cream/white backgrounds -> Warm White
  ['#FBF7F1', '#F8F6F2'],
  ['#FBF4EE', '#F8F6F2'],
  // Orange deep
  ['#C8441F', '#D94D28'],
  ['#E03E17', '#D94D28'],
];

let totalChanges = 0;

for (const filePath of files) {
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
      totalChanges++;
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  } else {
    console.log(`No changes: ${filePath}`);
  }
}

console.log(`\nTotal replacement passes: ${totalChanges}`);
