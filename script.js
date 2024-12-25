const terminalContainer = document.getElementById('terminalContainer');
const GUIContainer = document.getElementById('GUIContainer');
const dirStructure = document.getElementById('dirStructure');
const contents = document.getElementById('contents');
const currentLocation = document.getElementById('currentLocation');
const locationContents = document.getElementById('locationContents');
const container = document.getElementById('container');

const GUIContainer_terminalContainer_resizer = document.getElementById('GUIContainer_terminalContainer_resizer');
const dirStructure_contents_resizer = document.getElementById('dirStructure_contents_resizer');
const currentLocation_locationContents_resizer = document.getElementById('currentLocation_locationContents_resizer');


let isResizing_GCtC = false;
let isResizing_dSc = false;
let isResizing_cLlC = false;

GUIContainer_terminalContainer_resizer.addEventListener('mousedown', () => {
    isResizing_GCtC = true;
});

dirStructure_contents_resizer.addEventListener('mousedown', () => {
    isResizing_dSc = true;
});

currentLocation_locationContents_resizer.addEventListener('mousedown', () => {
    isResizing_cLlC = true;
});

document.addEventListener('mousemove', (event) => {
    if (isResizing_GCtC) {
        const newHeight = event.clientY;
        const containerHeight = window.innerHeight;
        const newHeight2 = containerHeight-newHeight-5;
        if (newHeight-5 < containerHeight-200 && newHeight2 < 400) { // Minimum width
            GUIContainer.style.height = `${newHeight-5}px`;
            terminalContainer.style.height = `${newHeight2}px`;
        }
    }
    if (isResizing_dSc) {
        const newWidth = event.clientX;
        const containerWidth = window.innerWidth;
        const newWidth2 = containerWidth-newWidth-5;
        if (newWidth-5 > 50 && newWidth2 > 300) { // Minimum width
            console.log('staisfied');
            dirStructure.style.width = `${newWidth-5}px`;
            contents.style.width = `${newWidth2}px`;
        }
    }
});

document.addEventListener('mouseup', () => {
    isResizing_GCtC = false;
    isResizing_dSc = false;
    isResizing_cLlC = false;
});

function generateFileTree(data, parentPath = "") {
  let treeHTML = "<ul>";
  for (let i = 0; i < data.length - 1; i++) {
      let item = data[i];
      let itemPath = parentPath ? `${parentPath}/${item.split("/").pop()}` : item;
      let fileName = item.split("/").pop();
      let icon = "🗀"; // Default icon for directories

      if (item in current_data) {
          // Directory: Assign a folder icon
          icon = "🗀";
          treeHTML += `<li class="directory" data-path="${itemPath}">
                          <span>${icon} ${fileName}</span>
                          ${generateFileTree(current_data[item], itemPath)}
                      </li>`;
      } else {
          // File: Assign icons based on file extension
          if (fileName.endsWith(".txt")) {
              icon = "🗎"; // Text file icon
          } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
              icon = "📷"; // Image file icon
          }

          treeHTML += `<li class="file" data-path="${itemPath}">
                          <span>${icon} ${fileName}</span>
                      </li>`;
      }
  }
  treeHTML += "</ul>";
  return treeHTML;
}

function renderFileTree() {
  const dirStructure = document.getElementById("dirStructure");
  dirStructure.innerHTML = generateFileTree(current_data["/bhavy_garg"], "/bhavy_garg");
}

  function handleFileClicks() {
    document
      .getElementById("dirStructure")
      .addEventListener("click", (e) => {
        const target = e.target.closest("li");
        if (target) {
          const path = target.dataset.path;

          if (target.classList.contains("directory")) {
            // Toggle visibility of nested content
            const nestedList = target.querySelector("ul");
            if (nestedList) {
              nestedList.style.display =
                nestedList.style.display === "none" ? "block" : "none";
            }

            // Update current location
            const currentLocation =
              document.getElementById("currentLocation");
            currentLocation.textContent = path.split("/").at(-1)+" ["+path+"]";
            const locationContents = document.getElementById("locationContents");
            locationContents.innerHTML = "Select a file to view its content.";
          } else if (target.classList.contains("file")) {
            // Display file content in locationContents
            const fileName = path.split("/").pop();
            const parentPath = path.slice(0, path.lastIndexOf("/"));
            const fileContent =
              current_data[parentPath][
                current_data[parentPath].length - 1
              ][fileName];

            const locationContents =
              document.getElementById("locationContents");
            locationContents.innerHTML =
              fileContent || "File is empty.";

            // Update current location
            const currentLocation =
              document.getElementById("currentLocation");
            currentLocation.textContent = path.split("/").at(-1)+" ["+path+"]";
          }
        }
      });
  }

  window.onload = function () {
    renderFileTree();
    handleFileClicks();
  };
