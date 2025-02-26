document.addEventListener("DOMContentLoaded", function () {
    const assetForm = document.getElementById("asset-form");
    const assignAssetForm = document.getElementById("assign-asset-form");
    const assetList = document.getElementById("asset-list");
    const assetSelect = document.getElementById("asset-select");

    let assets = JSON.parse(localStorage.getItem("assets")) || [];

    function updateAssetTable() {
        assetList.innerHTML = "";
        assetSelect.innerHTML = '<option value="">Select Asset</option>';

        assets.forEach((asset, index) => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${asset.name}</td>
                <td>${asset.category}</td>
                <td>${asset.status}</td>
                <td>${asset.assignedTo || "Unassigned"}</td>
                <td>
                    ${asset.status === "Available" ? `<button onclick="assignAsset(${index})">Assign</button>` : ""}
                    ${asset.status === "Assigned" ? `<button onclick="returnAsset(${index})">Return</button>` : ""}
                </td>
            `;

            assetList.appendChild(row);

            if (asset.status === "Available") {
                let option = document.createElement("option");
                option.value = index;
                option.textContent = asset.name;
                assetSelect.appendChild(option);
            }
        });

        localStorage.setItem("assets", JSON.stringify(assets));
    }

    // Register New Asset
    assetForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let newAsset = {
            name: document.getElementById("asset-name").value,
            category: document.getElementById("asset-category").value,
            status: "Available",
            assignedTo: null
        };

        assets.push(newAsset);
        updateAssetTable();
        assetForm.reset();
    });

    // Assign Asset
    assignAssetForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let selectedIndex = assetSelect.value;
        let assignedTo = document.getElementById("assign-to").value;

        if (selectedIndex !== "") {
            assets[selectedIndex].status = "Assigned";
            assets[selectedIndex].assignedTo = assignedTo;
            updateAssetTable();
        }
    });

    // Return Asset
    window.returnAsset = function (index) {
        assets[index].status = "Available";
        assets[index].assignedTo = null;
        updateAssetTable();
    };

    // Initial Table Load
    updateAssetTable();
});
