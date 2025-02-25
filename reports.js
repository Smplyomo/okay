document.addEventListener("DOMContentLoaded", function () {
    const reportList = document.getElementById("report-list");
    const reportTypeSelect = document.getElementById("report-type");
    const generateReportBtn = document.getElementById("generate-report");
    const exportCsvBtn = document.getElementById("export-csv");
    const exportPdfBtn = document.getElementById("export-pdf");

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    function generateReport() {
        let reportType = reportTypeSelect.value;
        let filteredReports = reports.filter(report => report.type === reportType);

        reportList.innerHTML = "";
        filteredReports.forEach(report => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${report.date}</td>
                <td>${report.visitors}</td>
                <td>${report.checkedIn}</td>
                <td>${report.checkedOut}</td>
                <td>${report.assetsIssued}</td>
                <td>${report.assetsReturned}</td>
            `;
            reportList.appendChild(row);
        });
    }

    // Export as CSV
    function exportCSV() {
        let csvContent = "data:text/csv;charset=utf-8,Date,Visitors,Checked-in,Checked-out,Assets Issued,Assets Returned\n";
        reports.forEach(report => {
            csvContent += `${report.date},${report.visitors},${report.checkedIn},${report.checkedOut},${report.assetsIssued},${report.assetsReturned}\n`;
        });

        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Export as PDF (Basic)
    function exportPDF() {
        let pdfContent = "Report Data\n\n";
        reports.forEach(report => {
            pdfContent += `D
