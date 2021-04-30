const fs = require('fs');

module.exports = {
    // Credit to Victor Powell on StackOverflow
    getFilesRecursive: (dir) => {
        function walk(d) {
            let results = [];
            let list = fs.readdirSync(d);
            list.forEach(function(file) {
                file = d + '/' + file;
                let stat = fs.statSync(file);
                if (stat && stat.isDirectory()) { 
                    /* Recurse into a subdirectory */
                    results = results.concat(walk(file));
                } else { 
                    /* Is a file */
                    results.push(file);
                }
            });
            return results;
        }

        return walk(dir);
    }
}