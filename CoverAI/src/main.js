const API_KEY = import.meta.env.VITE_API_KEY;

const generateBtn =
document.getElementById("generate-btn");

const outputText =
document.getElementById("output-text");

generateBtn.addEventListener(
    "click",
    generateCoverLetter
);

async function generateCoverLetter(){

    const name =document.getElementById("name").value;

    const role =document.getElementById("job").value;

    const skills =document.getElementById("skill").value;

    const company =document.getElementById("company").value;

    if(!name ||!role ||!skills ||!company){

        outputText.innerText =
        "Please fill all fields ⚠️";

        return;
    }
    const outputText=document.getElementById("output-text");
    outputText.innerText = "Generating Cover Letter... ⏳";

    const prompt = `
Write a professional ATS-friendly cover letter.

Candidate Name: ${name}

Job Role: ${role}

Company Name: ${company}

Skills: ${skills}

Instructions:
- Professional tone
- Proper paragraphs
- Strong introduction
- Strong conclusion
- Keep concise
`;

    try{

        // API FETCH

        const response = await fetch(

            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,

            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    contents:[
                        {
                            parts:[
                                {
                                    text:prompt
                                }
                            ]
                        }
                    ]

                })
            }
        );

        const data =
        await response.json();

        console.log(data);

        if(data.error){

            outputText.innerText =
            data.error.message;

            return;
        }
        const result =
        data.candidates[0]
        .content.parts[0].text;
        outputText.innerText =
        result;

    }catch(error){

        console.log(error);

        outputText.innerText =
        "Something went wrong ❌";
    }
}
let copyBtn=document.getElementById("copy-btn")

copyBtn.addEventListener("click", async ()=>{

    const text = outputText.innerText;

    if(!text) return;

    await navigator.clipboard.writeText(text);

    copyBtn.innerText = "Copied ✅";

    setTimeout(()=>{

        copyBtn.innerText =
        "Copy to Clipboard";

    },2000);
});