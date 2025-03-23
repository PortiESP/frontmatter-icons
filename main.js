const { Plugin } = require("obsidian");

class Main extends Plugin {
    onload() {
        // Listen for the metadataCache to change
        main.registerEvent(main.app.metadataCache.on("changed", (file, _, cache) => {

            // Get the file explorer
            const explorer = main.app.workspace.getLeavesOfType("file-explorer")[0];
            const files = explorer.view.fileItems
            const fileData = files[file.path]

            // Get the icon from the frontmatter and the file
            const icon = cache.frontmatter?.icon

            // Get the file element and the icon element
            const $file = fileData.innerEl
            const $icon = document.createElement("span");
            $icon.textContent = icon + " ";  // Add a space after the icon
            $icon.classList.add("plugin-icon");  // Used to find the icon later

            // Remove the old icon
            $file.querySelector(".plugin-icon")?.remove();

            // Add the new icon
            if (icon) $file.prepend($icon);
        }));
    }
}

module.exports = Main;