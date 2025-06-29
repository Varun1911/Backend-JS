
async function getJokes()
{
    const endpoint = 'http://localhost:4000/api/jokes';

    try
    {
        const response = await fetch(endpoint);

        if (!response.ok)
        {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    }

    catch (error)
    {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', async () =>
{
    try
    {
        const jokes = await getJokes();
        addJokes(jokes)
    }

    catch (error)
    {
        console.log(error);
    }


    function addJokes(jokes)
    {
        let ul = document.querySelector('.jokes ul');
        console.log(ul)

        jokes.forEach(joke => 
        {
            let li = document.createElement('li');
            let titleNode = document.createTextNode(`${joke.title}`);
            let contentNode = document.createTextNode(`${joke.content}`);
            li.appendChild(titleNode);
            li.textContent += ' : ';
            li.appendChild(contentNode);
            ul.appendChild(li);
        }
        );
    }

})