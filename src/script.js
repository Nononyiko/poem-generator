document.getElementById('poemForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const theme = document.getElementById('theme').value.trim();
    const poemDiv = document.getElementById('poem');
    poemDiv.innerHTML = "Generating your poem...";

    const apiUrl = "https://api.shecodes.io/ai/v1/generate";
    const apiKey = "6f60fd1ebaeb36d3f6o4ab0088t35e2b";
    const context = "Write a short poem about the following theme.";

    try {
        const response = await fetch(`${apiUrl}?prompt=${encodeURIComponent(theme)}&context=${encodeURIComponent(context)}&key=${apiKey}`);
        const data = await response.json();

        if (data && data.answer) {
            typeWriter(poemDiv, data.answer.replace(/\n/g, "<br>"));
        } else {
            poemDiv.innerHTML = `
                <h2>No poem generated</h2>
                <p>Please try another theme.</p>
            `;
        }
    } catch (error) {
        poemDiv.innerHTML = `
            <h2>Error generating poem</h2>
            <p>Please try again later.</p>
        `;
    }
});


function typeWriter(element, html, speed = 30) {
    element.innerHTML = "";
    let i = 0;
    let tag = false;
    let temp = "";

    function type() {
        if (i < html.length) {
            if (html[i] === "<") tag = true;
            if (tag) temp += html[i];
            else element.innerHTML += html[i];

            if (html[i] === ">") {
                tag = false;
                element.innerHTML += temp;
                temp = "";
            }
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}