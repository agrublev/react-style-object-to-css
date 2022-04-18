export const fixJsonStr = (str) => {
    str = str.replace(/(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '$1"$3":');
    let lines = str.split("\n");
    lines.forEach((line, index) => {
        let nextLine = lines[index + 1];
        if (nextLine) {
            let lineRef = line.trim();
            if (lineRef.endsWith(",")) {
                if (nextLine.includes("}")) {
                    lineRef = lineRef.replace(",", "");
                    lines[index] = lineRef;
                }
            }
        }
    });
    return lines.join("\n");
};
