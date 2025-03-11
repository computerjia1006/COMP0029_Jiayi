const fs = require('fs');
const path = require('path');

// Directory to search
const directory = './src';

// Function to recursively search files and update them
function updateFiles(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            updateFiles(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Remove theme prop
            const updatedContent = content.replace(/theme={theme}/g, '');

            // Remove shouldForwardProp theme
            const cleanedContent = updatedContent.replace(/shouldForwardProp: \(prop\) => prop !== 'theme' &&/g, 'shouldForwardProp: (prop) =>');

            if (content !== cleanedContent) {
                fs.writeFileSync(fullPath, cleanedContent, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
}

// Start the update process
updateFiles(directory);
console.log('Batch update completed!');
