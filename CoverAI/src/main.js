const generateBtn = document.getElementById("generate-btn");
const outputText = document.getElementById("output-text");

generateBtn.addEventListener("click", generateCoverLetter);

async function generateCoverLetter() {

    const name = document.getElementById("name").value;
    const role = document.getElementById("job").value;
    const skills = document.getElementById("skill").value;
    const company = document.getElementById("company").value;

    if (!name || !role || !skills || !company) {
        outputText.innerText = "Please fill all fields ⚠️";
        return;
    }

    outputText.innerText = "Generating Cover Letter... ⏳";

    const prompt = `Write a professional ATS-friendly cover letter. Candidate Name: ${name} Job Role: ${role} Company Name: ${company} Skills: ${skills}

Instructions:
- Professional tone
- Proper paragraphs
- Strong introduction
- Strong conclusion
- Keep concise
`;

    try {

        // 🔥 CALL BACKEND (NOT GEMINI DIRECTLY)
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();

        if (data.error) {
            outputText.innerText = data.error;
            return;
        }

        outputText.innerText = data.result;

    } catch (error) {
        console.log(error);
        outputText.innerText = "Something went wrong ❌";
    }
}

// COPY BUTTON
let copyBtn = document.getElementById("copy-btn");

copyBtn.addEventListener("click", async () => {
    const text = outputText.innerText;

    if (!text) return;

    await navigator.clipboard.writeText(text);

    copyBtn.innerText = "Copied ✅";

    setTimeout(() => {
        copyBtn.innerText = "Copy to Clipboard";
    }, 2000);
});