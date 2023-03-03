import axios from 'axios';
import workTemplates from './workTemplates';

const HUMAN_PREFIX = 'Human:';
const AI_PREFIX = 'AI:';

const AI_ENDPOINT = '/completions';



export const generateChat = async ({ model, currentWorkContext, newPrompt }) => {
    const response = await axios.post(AI_ENDPOINT, {
        "model": model,
        "prompt": currentWorkContext + '\n\n' + newPrompt,
        "temperature": 0.1,
        "max_tokens": 500,
        "top_p": 1,
        "frequency_penalty": 0.2,
        "presence_penalty": 0.2,
        "stop": [`${HUMAN_PREFIX}`, `${AI_PREFIX}`]
    });

    const answerText = response.data;

    return answerText;
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
    const response = await axios.post(AI_ENDPOINT, {
        "model": model,
        "prompt": currentWorkContext + '\n\n' + newPrompt + additionalPrompt,
        "temperature": 0.1,
        "max_tokens": 500,
        "top_p": 1,
        "frequency_penalty": 0.2,
        "presence_penalty": 0.2,
        "stop": [`${HUMAN_PREFIX}`, `${AI_PREFIX}`]
    });

    const answerText = response.data;

    if (callback) {
        await callback(answerText);
    }

    return answerText;
}