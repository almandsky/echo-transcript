import axios from 'axios';
import workTemplates from '../workgpt/workTemplates';

const HUMAN_PREFIX = 'Human:';
const AI_PREFIX = 'AI:';

const AI_ENDPOINT = '/completions';
const GROQ_AI_ENDPOINT = '/completions_groq';




export const generateChatGroq = async ({
    auth,
    model,
    currentWorkContext = '',
    newPrompt,
    additionalPrompt = '',
    temperature,
    callback = null
}) => {

    try {
        const prompt = currentWorkContext
        ? currentWorkContext + '\n\n' + newPrompt + additionalPrompt
        : newPrompt + additionalPrompt;

    const messages = [{
        role: 'assistant',
        content: prompt
    }]
    const response = await axios.post(GROQ_AI_ENDPOINT, {
        // model: 'mixtral-8x7b-32768',
        // model: 'llama2-70b-4096',
        model: 'gemma-7b-it',
        messages,
        temperature,
        max_tokens: 500,
        // top_p: 1,
        // frequency_penalty: 0.2,
        // presence_penalty: 0.2,
        // stop: [`${HUMAN_PREFIX}`, `${AI_PREFIX}`]
    }, {
        headers: {
          'Authorization': `Bearer ${auth.getAccessToken()}` 
        }
    });

    const answerText = response.data;

    if (callback) {
        await callback(answerText);
    }

    return answerText;
    } catch (err) {
        console.error(err.message);
        return `Failed API Call with error ${err.message}`;
    }
}


export const generateChat = async ({
    auth,
    model,
    currentWorkContext = '',
    newPrompt,
    additionalPrompt = '',
    temperature,
    callback = null
}) => {

    try {
        const prompt = currentWorkContext
        ? currentWorkContext + '\n\n' + newPrompt + additionalPrompt
        : newPrompt + additionalPrompt;

    const response = await axios.post(AI_ENDPOINT, {
        model,
        prompt,
        temperature,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0.2,
        stop: [`${HUMAN_PREFIX}`, `${AI_PREFIX}`]
    }, {
        headers: {
          'Authorization': `Bearer ${auth.getAccessToken()}` 
        }
    });

    const answerText = response.data;

    if (callback) {
        await callback(answerText);
    }

    return answerText;
    } catch (err) {
        console.error(err.message);
        return `Failed API Call with error ${err.message}`;
    }
}


export const intentDetection = async ({ auth, model, currentWorkContext, newPrompt, callback }) => {
    const additionalPrompt = `


------------------------------------------

Based on the above context and chat history, what is the workflow user want to do?

Please detect the user intent for me.  

workflow = one of the value of ['${Object.keys(workTemplates).join(`', '`)}'].

Reply in this format:

\`workflow=<workflow name>\`


    `;

    const response = await generateChat({
        auth,
        model,
        currentWorkContext,
        newPrompt,
        additionalPrompt,
        temperature: 0.1,
        callback,
    });

    return response;
}

export const progressTracker = async ({ auth, model, currentWorkContext, newPrompt, callback }) => {
    const additionalPrompt = `


------------------------------------------

Based on the above context and chat history, what is the current status of the cases?

Please list all the case status group by Owner and Case Status.  

Reply in this format:

\`
Open case count for Sky=<How many cases that the status is not 'Closed'>
CLosed case count for Sky=<How many cases that the status is 'Closed'>

Owner         \tStatus         \tCount
<Case Owner>  \t<Case status>  \t<Count>
\`


    `;

    const response = await generateChat({
        auth,
        model,
        currentWorkContext,
        newPrompt,
        additionalPrompt,
        temperature: 0.1,
        callback,
    });

    return response;
}

export const reportIntendSummary = async ({ auth, model, currentWorkContext, newPrompt, reportData, callback }) => {

    const additionalPrompt = `

------------------------------------------

Based on the above context and chat history, what is the purpose of reports that user want?

-------------------------------
    
Here is the report data:
                            
${JSON.stringify(reportData, null, 4)}

-------------------------------

Please help to provide a short summary title for the report.  and give a insights of the data only.

Please also suggest the most impactful suggested action user can take.

Reply in this format:

\`
<Report Title>


<Report Insights>

<Suggested Actions>
\`

    `;

    const response = await generateChat({
        auth,
        model,
        currentWorkContext,
        newPrompt,
        additionalPrompt,
        temperature: 0.1,
        callback,
    });

    return response;
}
