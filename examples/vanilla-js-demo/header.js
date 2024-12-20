
export function createHeader() {
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.padding = "10px 20px";
    header.style.backgroundColor = "#f3f4f6";
    header.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
    header.style.position = "fixed";
    header.style.top = "0";
    header.style.left = "0";
    header.style.right = "0";
    header.style.zIndex = "1000";

    function createOption(icon, label, dropdownOptions) {
        const option = document.createElement("div");
        option.style.position = "relative";
        option.style.display = "flex";
        option.style.flexDirection = "column";
        option.style.alignItems = "center";
        option.style.margin = "0 10px";
        option.style.cursor = "pointer";

        const iconElement = document.createElement("div");
        iconElement.textContent = icon;
        iconElement.style.fontSize = "24px";

        const labelElement = document.createElement("span");
        labelElement.textContent = label;
        labelElement.style.fontSize = "12px";
        labelElement.style.color = "#4b5563";

        const dropdown = document.createElement("div");
        dropdown.style.position = "absolute";
        dropdown.style.top = "100%";
        dropdown.style.left = "0";
        dropdown.style.backgroundColor = "#ffffff";
        dropdown.style.border = "1px solid #d1d5db";
        dropdown.style.borderRadius = "10px";
        dropdown.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        dropdown.style.display = "none";
        dropdown.style.flexDirection = "column";
        dropdown.style.padding = "5px";
        dropdown.style.zIndex = "1000";
        dropdown.style.width = "max-content";
        dropdown.style.whiteSpace = "nowrap";

        dropdownOptions.forEach((optionName) => {
            const dropdownItem = document.createElement("div");
            dropdownItem.textContent = optionName;
            dropdownItem.style.padding = "8px 16px"; // Adjusted padding for better spacing
            dropdownItem.style.cursor = "pointer";
            dropdownItem.style.fontSize = "14px";
            dropdownItem.style.backgroundColor = "#ffffff"; // Default background color
            dropdownItem.style.transition = "background-color 0.3s"; // Smooth hover effect

            dropdownItem.addEventListener("click", () => {
                alert(optionName);
            });

            dropdownItem.addEventListener("mouseover", () => {
                dropdownItem.style.backgroundColor = "#f3f4f6"; // Highlight on hover
            });

            dropdownItem.addEventListener("mouseout", () => {
                dropdownItem.style.backgroundColor = "#ffffff"; // Revert on mouse out
            });

            dropdown.appendChild(dropdownItem);
        });

        option.appendChild(iconElement);
        option.appendChild(labelElement);
        option.appendChild(dropdown);

        option.addEventListener("mouseover", () => {
            dropdown.style.display = "flex";
        });

        option.addEventListener("mouseout", () => {
            dropdown.style.display = "none";
        });

        return option;
    }

    const leftSection = document.createElement("div");
    leftSection.style.display = "flex";

    const rightSection = document.createElement("div");
    rightSection.style.display = "flex";

    const leftOptions = [
        {
            icon: "📂",
            label: "Open",
            dropdownOptions: ["Option 1", "Option 2", "Option 3", "Option 4"],
        },
        {
            icon: "💾",
            label: "Save",
            dropdownOptions: ["Save As", "Save All", "Quick Save", "Backup Save"],
        },
        {
            icon: "✏️",
            label: "Edit",
            dropdownOptions: ["Undo", "Redo", "Cut", "Copy"],
        },
        {
            icon: "🗑️",
            label: "Delete",
            dropdownOptions: ["Delete File", "Delete Folder", "Clear All", "Restore"],
        },
    ];

    const rightOptions = [
        { icon: "🔍", label: "Search", dropdownOptions: [] },
        { icon: "⚙️", label: "Settings", dropdownOptions: [] },
        { icon: "🔔", label: "Notifications", dropdownOptions: [] },
        { icon: "📋", label: "Clipboard", dropdownOptions: [] },
    ];

    leftOptions.forEach((option) =>
        leftSection.appendChild(createOption(option.icon, option.label, option.dropdownOptions))
    );
    rightOptions.forEach((option) =>
        rightSection.appendChild(createOption(option.icon, option.label, option.dropdownOptions))
    );

    header.appendChild(leftSection);
    header.appendChild(rightSection);

    document.body.appendChild(header);
}