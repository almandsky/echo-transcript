import axios from 'axios';
import workTemplates from '../workgpt/workTemplates';

const HUMAN_PREFIX = 'Human:';
const AI_PREFIX = 'AI:';

const AI_ENDPOINT = '/completions';



export const generateChat = async ({
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


export const intentDetection = async ({ model, currentWorkContext, newPrompt, callback }) => {
    const additionalPrompt = `


------------------------------------------

Based on the above context and chat history, what is the workflow user want to do?

Please detect the user intent for me.  

workflow = one of the value of ['${Object.keys(workTemplates).join(`', '`)}'].

Reply in this format:

\`workflow=<workflow name>\`


    `;

    const response = await generateChat({
        model,
        currentWorkContext,
        newPrompt,
        additionalPrompt,
        temperature: 0.1,
        callback,
    });

    return response;
}

export const progressTracker = async ({ model, currentWorkContext, newPrompt, callback }) => {
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
        model,
        currentWorkContext,
        newPrompt,
        additionalPrompt,
        temperature: 0.1,
        callback,
    });

    return response;
}

export const reportIntendSummary = async ({ model, currentWorkContext, newPrompt, reportData, callback }) => {

    const additionalPrompt = `

------------------------------------------

Based on the above context and chat history, what is the purpose of reports that user want?

-------------------------------
    
Here is the report data:
                            
${JSON.stringify(reportData, null, 4)}

-------------------------------

Please help to provide a short summary title for the report.  and give a insights of the data only.

Please also suggest what action user can take.

Reply in this format:

\`
<Report Title>


<Report Insights>

<Suggested Actions>
\`

    `;

    const response = await generateChat({
        model,
        currentWorkContext,
        newPrompt,
        additionalPrompt,
        temperature: 0.1,
        callback,
    });

    return response;
}